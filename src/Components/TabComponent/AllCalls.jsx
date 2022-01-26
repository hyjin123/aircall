import React, {useState} from "react";
import "../../css/tab.css";
import useApplicationData from "../../hooks/useApplicationData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import EachCall from "./EachCall.jsx";

export default function AllCalls() {
  // this hook is used to force a re-render once a user archives or un-archives a call
  const [value, setValue] = useState(0);
  const { allCalls, isArchived } = useApplicationData(value);

  // holds both archived (index 0) and unarchived calls (index 1), will only access archived calls here
  const organizedCalls = isArchived(allCalls);
  const archivedCalls = organizedCalls[0];

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
      <div className="archive-all">
        <FontAwesomeIcon icon={faFolderOpen} className="archive-icon" />
        <span>Un-Archive all calls</span>
      </div>
      <div className="each-call-container">{archivedCallList}</div>
    </div>
  );
}
