import React from "react";

const mockData = [
  { id: 1, title: "Spanish Vocabulary", cards: 50, lastUpdated: "2024-08-01" },
  { id: 2, title: "Math Formulas", cards: 30, lastUpdated: "2024-07-20" },
  { id: 3, title: "History Dates", cards: 20, lastUpdated: "2024-07-15" },
  { id: 4, title: "Science Concepts", cards: 45, lastUpdated: "2024-08-05" },
];

function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 font-medium-oblique">Flashcard Sets</h1>
      </header>
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockData.map((set) => (
            <div key={set.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {set.title}
              </h2>
              <p className="text-gray-600 mb-4">Number of Cards: {set.cards}</p>
              <p className="text-gray-500 text-sm">
                Last Updated: {set.lastUpdated}
              </p>
              <div className="mt-4 flex justify-end">
                <a
                  href={`/flashcards/${set.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
