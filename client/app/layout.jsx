import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./components/Header";
import { light } from "@clerk/themes";

const myFont = localFont({
  src: [
    {
      path:"./fonts/GT-Maru/GT-Maru-Regular-Trial.otf",
      weight: "400",
      style:"normal"
    },
    {
      path: "./fonts/GT-Maru/GT-Maru-Bold-Oblique-Trial.otf",
      weight: "700",
      style: "bold",
    },
    {
      path: "./fonts/GT-Maru/GT-Maru-Medium-Oblique-Trial.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/GT-Maru/GT-Maru-Medium-Trial.otf",
      weight: "500",
      style: "oblique"
    },
    {
      path: "./fonts/GT-Maru/GT-Maru-Mega-Mini-Trial.otf",
      weight: "900",
      style: "normal" //logo font
    },
    {
      path: "./fonts/GT-Maru/GT-Maru-Light-Trial.otf",
      weight: "300",
      style: "normal"
    },
    ]
});

export const metadata = {
  title: "Flashmaster",
  description: "Your minimalist flashcard app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: light }}>
      <html lang="en" className={myFont.className}>
        <body className={`${myFont.className} bg-white text-gray-900`}>
          <Header />
          <main className="flex flex-col min-h-screen pt-20">
            {/* Adjust pt-16 to match the height of the header */}
            <div className="flex-1">{children}</div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
