import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Sidebar } from "./components/Sidebar/Sidebar";
import ModalProvider from "./providers/ModalProvider";
import Player from "./components/Song/Player";



const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify",
  description: "Music for everyone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ModalProvider />
        <Sidebar>{children}</Sidebar>
        <Player />
      </body>
    </html>
  );
}
