import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white flex items-center justify-center font-medium-oblique">
      <main className="flex flex-row items-center w-full max-w-6xl px-6">
        {/* Content on the left */}
        <div className="flex-1 pr-8 text-center md:text-left">
          <h2 className="text-2xl font-semibold mb-4">
            Master Flashcards with Ease
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Welcome to Flashmaster, the ultimate flashcard app designed to help
            you learn faster and remember longer. Create, customize, and ace
            your study sessions with our intuitive and powerful tool. Start
            mastering your knowledge today!
          </p>
          <a
            href="dashboard"
            className="bg-orange-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-orange-700"
          >
            Get Started
          </a>
        </div>

        {/* Image on the right */}
        <div className="flex-1">
          <Image
            src="/images/hero.jpg"
            alt="Flashmaster app image"
            width={400}
            height={500}
          />
        </div>
      </main>
    </div>
  );
}
