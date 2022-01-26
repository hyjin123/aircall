import React from 'react';
import "../../css/tab.css";
import useApplicationData from "../../hooks/useApplicationData";
import EachCall from './EachCall.jsx';

export default function AllCalls() {
  const { allCalls, isArchived } = useApplicationData();

  // holds both archived (index 0) and unarchived calls (index 1), will only access archived calls here
  const organizedCalls = isArchived(allCalls);
  const archivedCalls = organizedCalls[0];
  console.log(archivedCalls);

  return (
    <div className="inbox-container">
      <div>
        <EachCall />
      </div>
    </div>
  );
}
