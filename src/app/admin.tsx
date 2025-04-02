"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5500/admin/transactions")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4 text-primary">Admin Dashboard</h1>
      <div className="overflow-x-auto bg-gray-800 p-4 rounded-lg shadow-lg">
        <table className="w-full border border-gray-700 text-left">
          <thead className="bg-gray-700 text-gray-200">
            <tr>
              <th className="border p-3">Tx Hash</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index} className="hover:bg-gray-700 transition">
                <td className="border p-3 text-blue-400">{tx.hash}</td>
                <td className="border p-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    tx.status === "confirmed" ? "bg-green-500 text-white" :
                    tx.status === "pending" ? "bg-yellow-500 text-gray-900" :
                    "bg-red-500 text-white"
                  }`}>
                    {tx.status}
                  </span>
                </td>
                <td className="border p-3">{new Date(tx.timestamp * 1000).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
