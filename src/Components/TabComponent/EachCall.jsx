import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Popup from "./Popup.jsx";
import axios from "axios";

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

  // converts seconds to minutes and seconds
  const minutes = Math.floor(duration / 60);
  const convertedDuration = (minutes <= 1 ? minutes + " minute " : minutes + " minutes " ) + (duration % 60 ? duration % 60 + " seconds" : "00 second")

  // function that archives the selected call
  const handleArchive = () => {
    // make an axios post request to the API backend to update the selected call
    axios
      .post(`https://aircall-job.herokuapp.com/activities/${id}`, {
        is_archived: true,
      })
      .then((res) => {
        // close the popup once archived
        setPopUp(false);
        // force re-render once archived by adding +1 to the value state
        props.setValue((value) => value + 1);
      })
      .catch((err) => console.log(err));
  };

  // function that un-archives the selected call
  const handleUnArchive = () => {
    // make an axios post request to the API backend to update the selected call
    axios
      .post(`https://aircall-job.herokuapp.com/activities/${id}`, {
        is_archived: false,
      })
      .then((res) => {
        // close the popup once un-archived
        setPopUp(false);
        // force re-render once un-archived by adding +1 to the value state
        props.setValue((value) => value + 1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="call-date">
        <span>
          {month}, {day} {year}
        </span>
      </div>
      <div className="call archive-all" onClick={() => setPopUp(true)}>
        <FontAwesomeIcon icon={faPhoneAlt} size="lg" />
        <div className="call-info">
          {/* if the call is answered, number is green, if the call is missed, number is red */}
          <div className={`call-from ${call_type === "answered" ? "call-answered" : "call-missed"}`}>{from}</div>
          {/* if call to information is null, display unknown */}
          {call_type === "answered" && <div className="call-to">{`called ${to === null ? 'Unknown' : to}`}</div>}
          {call_type === "missed" && <div className="call-to">{`tried to call ${to === null ? 'Unknown' : to}`}</div>}
          {call_type === "voicemail" && <div className="call-to">{`left voicemail for ${to === null ? 'Unknown' : to}`}</div>}
        </div>
        <div className="call-time">
          <div>{time}</div>
          <FontAwesomeIcon icon={faInfoCircle} className="info-circle" />
        </div>
      </div>
      <Popup
        trigger={popUp}
        setTrigger={setPopUp}
        is_archived={is_archived}
        handleArchive={handleArchive}
        handleUnArchive={handleUnArchive}
      >
        <div className="info-container">
          <div className="date">
            {month}, {day} {year} - {time}
          </div>
          <div className="inner-info"><span>From:</span> {from}</div>
          {to !== null && <div className="inner-info"><span>To:</span> {to}</div>}
          {to === null && <div className="inner-info"><span>To:</span> Unknown</div>}
          <div className="inner-info"><span>via:</span> {via}</div>
          <div className="inner-info">
            {direction.toUpperCase()} Call - ({call_type})
          </div>
          <div className="inner-info">{convertedDuration}</div>
        </div>
      </Popup>
    </div>
  );
}
