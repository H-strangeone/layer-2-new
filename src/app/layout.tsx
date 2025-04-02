"use client";
import { WalletProvider } from "../context/WalletContext";
import Navbar from "../../components/Navbar"; // ✅ Import Navbar

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          <Navbar />  {/* ✅ Add Navbar here */}
          <main>{children}</main>
        </WalletProvider>
      </body>
    </html>
  );
}

