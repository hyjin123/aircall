import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

export default function EachCall(props) {
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
  console.log(date);

  // array used to display month in words and not a number
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
  // display the time in string, without the seconds and with AM/PM
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      <div className="call-date">
        <p>
          {month}, {day} {year}
        </p>
      </div>
      <div className="call archive-all">
        <FontAwesomeIcon icon={faPhoneAlt} size="lg" />
        <div className="call-info">
          <div className="call-from">{from}</div>
          {/* if call to information is null, display unknown */}
          {to === null && <div className="call-to">Unknown</div>}
          <div className="call-to">{to}</div>
        </div>
        <div>{time}</div>
      </div>
    </div>
  );
}
