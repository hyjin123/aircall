import React, { useEffect } from "react";
import "../../css/tab.css";
import useApplicationData from "../../hooks/useApplicationData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

export default function Inbox() {
  const { allCalls, isArchived } = useApplicationData();

  console.log(allCalls);

  const organizedCalls = isArchived(allCalls);
  console.log(organizedCalls);

  return (
    <div className="inbox-container">
      <div className="archive-all">
        <FontAwesomeIcon icon={faBoxOpen} />
        Archive all calls
      </div>
      <div>Call #1</div>
    </div>
  );
}
