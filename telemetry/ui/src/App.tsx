import { useState, useEffect, createContext } from "react";
import LiveValue from "./live_value";
import RedbackLogo from "./redback_logo.jpg";
import "./App.css";
import useWebSocket, { ReadyState } from "react-use-websocket";

import ColorSwitch from "./Components/ColorSwitch";

const WS_URL = "ws://localhost:8080";

interface VehicleData {
  battery_temperature: number;
  timestamp: number;
}

export const ColorModeContext = createContext({
  colorMode: false,
  setColorMode: (mode: boolean) => {},
});

function App() {
  const [temperature, setTemperature] = useState<number>(0);
  const {
    lastJsonMessage,
    readyState,
  }: { lastJsonMessage: VehicleData | null; readyState: ReadyState } =
    useWebSocket(WS_URL, {
      share: false,
      shouldReconnect: () => true,
    });

  const [colorMode, setColorMode] = useState(false);

  useEffect(() => {
    switch (readyState) {
      case ReadyState.OPEN:
        console.log("Connected to streaming service");
        break;
      case ReadyState.CLOSED:
        console.log("Disconnected from streaming service");
        break;
      default:
        break;
    }
  }, [readyState]);

  useEffect(() => {
    console.log("Received: ", lastJsonMessage);
    if (lastJsonMessage === null) {
      return;
    }
    setTemperature(lastJsonMessage["battery_temperature"]);
  }, [lastJsonMessage]);

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={RedbackLogo}
          className="redback-logo"
          alt="Redback Racing Logo"
        />
        <p className="value-title">Live Battery Temperature</p>
        <ColorModeContext.Provider value={{colorMode, setColorMode}}>
          <LiveValue temp={temperature} />
          <ColorSwitch />
        </ColorModeContext.Provider>
      </header>
    </div>
  );
}

export default App;
