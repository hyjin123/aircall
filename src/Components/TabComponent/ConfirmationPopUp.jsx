import React from "react";
import "../../css/popup.css";

export default function ConfirmationPopup(props) {
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
          <button
            className="close-button2"
            onClick={() => props.setTrigger(false)}
          >
            Close
          </button>
          {/* if the call is un-archived, make the button archive */}
          {props.is_archived === false && <button className="archive-button" onClick={props.handleArchiveAll}>Archive All Calls</button>}
          {/* if the call is archived, make the button un-archive */}
          {props.is_archived === true && <button className="archive-button" onClick={props.handleUnArchiveAll}>Un-Archive All Calls</button>}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}