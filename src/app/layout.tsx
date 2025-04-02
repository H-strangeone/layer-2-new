"use client";
import { WalletProvider } from "../context/WalletContext";
import Navbar from "../../components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <WalletProvider>
          <Navbar />
          <main className="p-6">{children}</main>
        </WalletProvider>
      </body>
    </html>
  );
}
