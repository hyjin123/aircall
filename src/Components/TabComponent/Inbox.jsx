import React, { useEffect, useState } from "react";
import "../../css/tab.css";
import useApplicationData from "../../hooks/useApplicationData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import EachCall from "./EachCall.jsx";
import ConfirmationPopup from "./ConfirmationPopUp.jsx";

export default function Inbox() {
  // this hook is used to force a re-render once a user archives or un-archives a call
  const [value, setValue] = useState(0);
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);

  const { allCalls, isArchived } = useApplicationData(value);

  // holds both archived (index 0) and unarchived calls (index 1), will access only unarchived calls in this component
  const organizedCalls = isArchived(allCalls);
  const unarchivedCalls = organizedCalls[1];

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
        value={value}
        setValue={setValue}
      />
    );
  });

  return (
    <div className="inbox-container">
      <div className="archive-all" onClick={() => setConfirmationPopUp(true)}>
        <FontAwesomeIcon icon={faFolderOpen} className="archive-icon" />
        <span>Archive all calls</span>
      </div>
      <div className="each-call-container">{unarchivedCallList}</div>
      <ConfirmationPopup
        trigger={confirmationPopUp}
        setTrigger={setConfirmationPopUp}
        is_archived={false}
      >
        <div className="info-container">
          <h3>Are you sure you want to archive all calls?</h3>
        </div>
      </ConfirmationPopup>
    </div>
  );
}
