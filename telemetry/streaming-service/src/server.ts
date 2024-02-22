import net from "net";
import { WebSocket, WebSocketServer } from "ws";

interface VehicleData {
  battery_temperature: number;
  timestamp: number;
}

const TCP_PORT = 12000;
const WS_PORT = 8080;
const tcpServer = net.createServer();
const websocketServer = new WebSocketServer({ port: WS_PORT });

const SAFE_LOW = 20;
const SAFE_HIGH = 80;

const DATA_INTERVAL = 500;
const DANGER_ALLOWANCES = 3;
const DANGER_SPAN = 5000;

let dangerList : number[] = [];
let dangerIndex : number = 0;

tcpServer.on("connection", (socket) => {
  console.log("TCP client connected");

  socket.on("data", (msg) => {
    let msgReceived = msg.toString();

    console.log(`Received: ${msgReceived}`);


    if (msgReceived[msgReceived.length - 1] === msgReceived[msgReceived.length - 2]) {
      msgReceived = msgReceived.slice(0, -1);
      console.log(`Corrected to: ${msgReceived}`);
    }

    const jsonData: VehicleData = JSON.parse(msgReceived);

    if (jsonData.battery_temperature < SAFE_LOW || jsonData.battery_temperature > SAFE_HIGH) {
      dangerList.push(dangerIndex);
    }

    if (dangerList.length > 0) {

      if (dangerList.length == DANGER_ALLOWANCES) {
        console.log("ERROR occured at: " + jsonData.timestamp);
        console.log("Too many danger values observed within the last " + DANGER_SPAN + "ms");
        dangerIndex = DANGER_SPAN / DATA_INTERVAL;
      }

      if (dangerIndex >= DANGER_SPAN / DATA_INTERVAL) {
        dangerList.shift();
        if (dangerList.length > 0) {
          let newFirstDanger = dangerList[0];
          dangerList = dangerList.map((value) => {
            return value - newFirstDanger;
          });
          dangerIndex = dangerIndex - newFirstDanger;
        } else {
          dangerIndex = -1;
        }
      }

      dangerIndex += 1;
    }

    // Send JSON over WS to frontend clients
    websocketServer.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msgReceived);
      }
    });
  });

  socket.on("end", () => {
    console.log("Closing connection with the TCP client");
  });

  socket.on("error", (err) => {
    console.log("TCP client error: ", err);
  });
});

websocketServer.on("listening", () =>
  console.log(`Websocket server started on port ${WS_PORT}`)
);

websocketServer.on("connection", async (ws: WebSocket) => {
  console.log("Frontend websocket client connected");
  ws.on("error", console.error);
});

tcpServer.listen(TCP_PORT, () => {
  console.log(`TCP server listening on port ${TCP_PORT}`);
});
