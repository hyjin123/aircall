import React from "react";
import "../../css/popup.css";

export default function Popup(props) {
  // if the trigger is "on/true", it will show the popup, if "off/false", it will show nothing
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button
          className="close-button"
          onClick={() => props.setTrigger(false)}
        >
          X
        </button>
        {props.children}
        <div className="popup-buttons">
          <button className="close-button2" onClick={() => props.setTrigger(false)}>Close</button>
          <button className="archive-button">Archive</button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
