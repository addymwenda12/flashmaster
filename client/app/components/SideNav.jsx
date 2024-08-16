"use client";
import React, { useState } from "react";
import Link from "next/link";

function SideNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="md:hidden fixed top-24 left-0 p-4 text-white bg-gray-800 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`bg-white text-black shadow-lg border-r border-gray-600 fixed top-14 left-0 w-64 min-h-screen md:w-64 md:relative md:top-auto md:left-auto transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-40`}
      >
        <div className="flex-grow p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="flex items-center p-3 rounded-md hover:bg-gray-400"
              >
                <svg
                  className="w-6 h-6 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M3 6h18M3 14h18m-6 6h6M3 18h6"
                  />
                </svg>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/flashcards"
                className="flex items-center p-3 rounded-md hover:bg-gray-400"
              >
                <svg
                  className="w-6 h-6 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 3v18M18 3v18M6 12l6 6 6-6"
                  />
                </svg>
                <span>Flashcards</span>
              </Link>
            </li>
            <li>
              <Link
                href="/daily-challenge"
                className="flex items-center p-3 rounded-md hover:bg-gray-400"
              >
                <svg
                  className="w-6 h-6 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Daily Challenge</span>
              </Link>
            </li>
            <li>
              <Link
                href="/journey"
                className="flex items-center p-3 rounded-md hover:bg-gray-400"
              >
                <svg
                  className="w-6 h-6 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 2v20m-6-6h12M6 12h12M6 4h12"
                  />
                </svg>
                <span>Journey</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-4 border-t border-gray-700">
          <Link
            href="/profile"
            className="flex items-center p-3 rounded-md hover:bg-gray-400"
          >
            <svg
              className="w-6 h-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-2.118A10.94 10.94 0 0 0 21 11a10.94 10.94 0 0 0-2.405-3.882L19 5h-5m0 0L12 7m3-2l-3 2M6 11h5l1.405-2.118A10.94 10.94 0 0 1 6 11a10.94 10.94 0 0 1 2.405 3.882L11 17H6m0-6h5m-5 6H3m3 0H6M6 7h3"
              />
            </svg>
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SideNav;
