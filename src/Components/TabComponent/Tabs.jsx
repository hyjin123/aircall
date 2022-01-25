import React, { useState } from "react";
import "../../css/tabs.css";
import Inbox from "./Inbox.jsx";
import AllCalls from "./AllCalls.jsx";

export default function Tabs() {
  // manage active tabs (tab that is selected)
  const [activeTab, setActiveTab] = useState("tab1");

  // these 2 functions handles the tab switching
  const handleTab1 = () => {
    setActiveTab("tab1");
  };

  const handleTab2 = () => {
    setActiveTab("tab2");
  };

  return (
    <div className="Tabs">
      {/* Tab Naviation */}
      <ul className="tab-nav">
        <li
          className={activeTab === "tab1" ? "active" : ""}
          onClick={handleTab1}
        >
          Inbox
        </li>
        <li
          className={activeTab === "tab2" ? "active" : ""}
          onClick={handleTab2}
        >
          All Calls
        </li>
      </ul>
      <div className="content">
        {/* Content will be here */}
        {activeTab === "tab1" ? <Inbox /> : <AllCalls />}
      </div>
    </div>
  );
}
