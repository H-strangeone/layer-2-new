"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function WalletConnect() {
  const [wallet, setWallet] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_accounts", []);
          if (accounts.length > 0) {
            setWallet(accounts[0]);
          }
        } catch (error) {
          console.error("Error fetching accounts:", error);
        }
      }
    };
    checkConnection();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("MetaMask not installed!");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWallet(accounts[0]); // ✅ Only store address
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
  };

  return (
    <div className="flex items-center gap-2">
      {wallet ? (
        <div className="relative group">
          <button className="bg-green-500 px-4 py-2 rounded text-white">
            {wallet.slice(0, 6)}...{wallet.slice(-4)}
          </button>
          <button
            onClick={disconnectWallet}
            className="absolute top-10 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-red-500 px-3 py-1 text-white rounded"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button onClick={connectWallet} className="bg-blue-500 px-4 py-2 rounded text-white">
          Connect Wallet
        </button>
      )}
    </div>
  );
}
