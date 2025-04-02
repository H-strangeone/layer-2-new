"use client";
import { useState } from "react";

export default function Withdraw() {
  const [amount, setAmount] = useState("");

  const handleWithdraw = () => {
    alert(`Withdrawing ${amount} ETH`);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen flex items-center justify-center text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-primary">Withdraw Funds</h1>
        <input
          type="number"
          placeholder="Amount (ETH)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-600 bg-gray-700 p-3 w-full rounded-md text-white outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleWithdraw}
          className="bg-red-500 hover:bg-red-700 px-4 py-2 mt-3 rounded-lg w-full text-white font-bold transition"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}
