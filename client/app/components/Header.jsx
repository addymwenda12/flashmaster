import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  const { userId } = auth();
  return (
    <>
      <nav className="bg-blue-700 py-4 px-6 flex items-center justify-between mb-5">
        <div className="flex items-center">
          <Link href="/">
            <div className="text-lg uppercase font-bold text-white">
              Flashmaster
            </div>
          </Link>
        </div>
        <div>
          <div className="text-white flex items-center">
                <Link href="sign-in" className="text-gray-300 hover:text-white">
                  Sign In
                </Link>
                <Link href="sign-up" className="text-gray-300 hover:text-white">
                  Sign Up
                </Link>
                <Link
                  href="profile"
                  className="text-gray-300 hover:text-white mr-4"
                >
                  Profile Page
                </Link>
            <div className="ml-auto">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
