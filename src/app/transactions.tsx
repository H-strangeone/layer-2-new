"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Transactions() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5500/transactions")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4 text-primary">Transaction History</h1>
      <div className="space-y-3">
        {transactions.map((tx, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md hover:scale-105 transition">
            <p className="text-blue-400 font-mono">{tx.hash}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
