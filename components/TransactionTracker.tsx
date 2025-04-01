"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function TransactionTracker({ wallet }: { wallet: string | null }) {
  const [transactions, setTransactions] = useState<{ hash: string; status: string }[]>([]);

  useEffect(() => {
    if (wallet) {
      fetchTransactions(wallet);
    }
  }, [wallet]);

  const fetchTransactions = async (address: string) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const history = await provider.getTransactionhistory(address);

      const txs = history.map((tx: any) => ({
        hash: tx.hash,
        status: tx.confirmations > 0 ? "Confirmed" : "Pending",
      }));

      setTransactions(txs);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <div className="mt-4 w-full max-w-lg">
      <h2 className="text-lg font-bold mb-2">Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className="border border-gray-600 rounded p-2">
          {transactions.map((tx, index) => (
            <li key={index} className="flex justify-between p-2 border-b last:border-none">
              <a
                href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400"
              >
                {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
              </a>
              <span
                className={`px-2 py-1 rounded text-white ${
                  tx.status === "Confirmed" ? "bg-green-500" : "bg-yellow-500"
                }`}
              >
                {tx.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}