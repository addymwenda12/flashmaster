import React from "react";
import SideNav from "../components/SideNav";
import Flashcard from "../components/Flashcard";

function FlashCardPage() {
  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1 p-6">
        <div className="flex justify-around">
          <h1 className="text-2xl font-bold mb-5">My FlashCards</h1>
          <button className="bg-orange-600 px-3 rounded-full">
            Add New Set
          </button>
        </div>
          <div className="p-6">
                <Flashcard question="What is React?" answer="A JavaScript library for building user interfaces." />
                <Flashcard question="What is Tailwind CSS?" answer="A utility-first CSS framework for creating custom designs." />
              </div>
      </div>
    </div>
  );
}

export default FlashCardPage;
