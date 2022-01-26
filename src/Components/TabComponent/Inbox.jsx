import React, { useEffect } from "react";
import "../../css/tab.css";
import useApplicationData from "../../hooks/useApplicationData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import EachCall from "./EachCall.jsx";

export default function Inbox() {
  const { allCalls, isArchived } = useApplicationData();

  // holds both archived (index 0) and unarchived calls (index 1), will access only unarchived calls in this component
  const organizedCalls = isArchived(allCalls);
  const unarchivedCalls = organizedCalls[1];
  console.log(unarchivedCalls);

  // map through the unarchived calls and render this array in JSX
  const unarchivedCallList = unarchivedCalls.map((call) => {
    return (
      <EachCall 
        key={call.id}
        id={call.id}
        call_type={call.call_type}
        created_at={call.created_at}
        direction={call.direction}
        duration={call.duration}
        from={call.from}
        is_archived={call.is_archived}
        to={call.to}
        via={call.via}
      />
    );
  });

  return (
    <div className="inbox-container">
      <div className="archive-all">
        <FontAwesomeIcon icon={faFolderOpen} className="archive-icon"/> 
        <span>Archive all calls</span>
      </div>
      <div className="each-call-container">
        {unarchivedCallList}
      </div>
    </div>
  );
}
