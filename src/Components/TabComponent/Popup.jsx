import React from "react";
import "../../css/popup.css"

export default function Popup(props) {
  // if the trigger is "on", it will show the popup, if "off", it will show nothing
  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-button" onClick={() => props.setTrigger(false)}>x</button>
        {props.children}
      </div>
    </div>
  ) : "";
}
