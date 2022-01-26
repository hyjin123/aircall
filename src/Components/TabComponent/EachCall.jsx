import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import Popup from "./Popup.jsx";

export default function EachCall(props) {
  // state for pop up
  const [popUp, setPopUp] = useState(false);

  // destructure all props
  const {
    id,
    call_type,
    created_at,
    direction,
    duration,
    from,
    is_archived,
    to,
    via,
  } = props;

  // change the format from string to date data type
  const date = new Date(created_at);

  // array used to display month as a string and not a number
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // variables to store the date
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const day = date.getDay();
  // display the time in string, without the seconds and with AM/PM. The time is in local eastern time for now
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      <div className="call-date">
        <span>
          {month}, {day} {year}
        </span>
      </div>
      <div className="call archive-all">
        <FontAwesomeIcon icon={faPhoneAlt} size="lg" />
        <div className="call-info" onClick={() => setPopUp(true)}>
          <div className="call-from">{from}</div>
          {/* if call to information is null, display unknown */}
          {to === null && <div className="call-to">Unknown</div>}
          <div className="call-to">{to}</div>
        </div>
        <div className="call-time">{time}</div>
      </div>
      <Popup trigger={popUp} setTrigger={setPopUp} >
        <h3>my popup</h3>
      </Popup>
    </div>
  );
}
