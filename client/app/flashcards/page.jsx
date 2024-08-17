import React from "react";
import SideNav from "../components/SideNav";
import FlashcardSets from "../components/FlashcardSets";
import Link from "next/link";

function FlashCardPage() {
  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1 p-6 bg-slate-200">
        <div className="flex justify-between my-2">
          <h1 className="text-2xl font-bold mb-5">My FlashCards</h1>
            <Link href="new-flashcard">
          <button className="bg-orange-600 px-3 rounded-lg">
            Add New Set
          </button>
          </Link>
        </div>
          <FlashcardSets />
      </div>
    </div>
  );
}

export default FlashCardPage;
