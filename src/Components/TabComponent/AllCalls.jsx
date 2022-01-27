import React, {useState} from "react";
import axios from "axios";
import "../../css/tab.css";
import useApplicationData from "../../hooks/useApplicationData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import EachCall from "./EachCall.jsx";
import ConfirmationPopup from "./ConfirmationPopUp.jsx";

export default function AllCalls() {
  // this hook is used to force a re-render once a user archives or un-archives a call
  const [value, setValue] = useState(0);
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);

  const { allCalls, isArchived } = useApplicationData(value);

  // holds both archived (index 0) and unarchived calls (index 1), will only access archived calls here
  const organizedCalls = isArchived(allCalls);
  const archivedCalls = organizedCalls[0];

  // function that handles un-archiving all calls
  const handleUnArchiveAll = () => {
    // loop through the archived calls and send an axios request for EACH call id to update them in the API backend
    for (const call of archivedCalls) {
      axios
        .post(`https://aircall-job.herokuapp.com/activities/${call.id}`, {
          is_archived: false
        })
        .then((res) => {
          // close the popup once un-archived
          setConfirmationPopUp(false);
          // force re-render once un-archived by adding +1 to the value state
          setValue((value) => value + 1);
        })
        .catch((err) => console.log(err));
    }
  };

  // map through the unarchived calls and render this array in JSX
  const archivedCallList = archivedCalls.map((call) => {
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
        <span>Un-Archive all calls</span>
      </div>
      <div className="each-call-container">{archivedCallList}</div>
      <ConfirmationPopup
        trigger={confirmationPopUp}
        setTrigger={setConfirmationPopUp}
        is_archived={true}
        handleUnArchiveAll={handleUnArchiveAll}
      >
        <div className="info-container">
          <h3>Are you sure you want to unarchive all calls?</h3>
        </div>
      </ConfirmationPopup>
    </div>
  );
}
