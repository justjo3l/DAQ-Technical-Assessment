import "./ColorSwitch.css";

import React, { useContext } from "react";

import { ColorModeContext } from "../App";

function ColorSwitch() {

  const { setColorMode } = useContext(ColorModeContext);

  const handleCheck = () => {
    const colorValue = document.getElementById("color-value") as HTMLInputElement;
    setColorMode(colorValue.checked);
  }

  return (
    <div id="color-switch-container">
      <h5>Color Mode</h5>
      <label className="switch" id="color-switch">
        <input type="checkbox" id="color-value" onClick={handleCheck}/>
        <span className="slider round">
        </span>
      </label>
    </div>
  );
}

export default ColorSwitch;