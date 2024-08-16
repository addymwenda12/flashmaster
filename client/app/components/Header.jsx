import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  const { userId } = auth();
  return (
    <nav className="bg-orange-600 py-4 px-6 flex items-center justify-between fixed top-0 left-0 w-full z-50">
      <div className="flex items-center">
        <Link href="dashboard">
          <div className="font-mega-mini text-2xl uppercase font-bold text-white">
            Flashmaster
          </div>
        </Link>
      </div>
      <div>
        <div className="text-white flex items-center font-regular">
          <Link href="sign-in" className="text-black mr-6 hover:text-white">
            Sign In
          </Link>
          <Link href="sign-up" className="text-black mr-6 hover:text-white">
            Sign Up
          </Link>
          <Link href="dashboard" className="text-black hover:text-white mr-6">
            Dashboard
          </Link>
          <Link href="profile" className="text-black hover:text-white mr-6">
            Profile Page
          </Link>
          {/* notifications go here */}
          <div className="ml-auto">
            <UserButton  />
          </div>
        </div>
      </div>
    </nav>
  );
}
