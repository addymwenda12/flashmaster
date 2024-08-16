import React from "react";
import SideNav from "../components/SideNav";

function DailyChallengePage() {
  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-5">Daily Challenge</h1>
      </div>
    </div>
  );
}

export default DailyChallengePage;
