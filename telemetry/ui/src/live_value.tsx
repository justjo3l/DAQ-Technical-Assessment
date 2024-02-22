import "./App.css";
import { ColorModeContext } from "./App";

import React, { useContext } from "react";

interface TemperatureProps {
  temp: number;
}

const DANGER_LOW = 20;
const DANGER_HIGH = 80;
const UNSAFE_LOW = 26;
const UNSAFE_HIGH = 74;

function LiveValue({ temp }: TemperatureProps) {
  let valueColour = "white";

  const { colorMode } = useContext(ColorModeContext);

  if (colorMode) {
    if (temp < DANGER_LOW || temp > DANGER_HIGH) valueColour = "red";
    else if (temp < UNSAFE_LOW || temp > UNSAFE_HIGH) valueColour = "yellow";
    else valueColour = "green";
  }

  return (
    <header className="live-value" style={{ color: valueColour }}>
      {`${temp.toPrecision(3)}`}
      <span className="unit">°C</span>
    </header>
  );
}

export default LiveValue;
