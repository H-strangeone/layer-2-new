"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Withdraw() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!wallet || !window.ethereum) return;
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balanceWei = await provider.getBalance(wallet);
        setBalance(ethers.formatEther(balanceWei));
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [wallet]);

  const withdrawFunds = async () => {
    if (!wallet || !amount) return alert("Enter a valid amount");
    if (!window.ethereum) return alert("MetaMask not installed!");

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // TODO: Replace with your L2 withdrawal smart contract details
      const l2WithdrawalContract = new ethers.Contract(
        "YOUR_L2_WITHDRAW_CONTRACT_ADDRESS",
        [
          "function withdraw(uint256 amount) public"
        ],
        signer
      );

      const tx = await l2WithdrawalContract.withdraw(ethers.parseUnits(amount, 18));
      await tx.wait(); // Wait for confirmation

      alert(`Withdrawal successful! TX: ${tx.hash}`);
      setAmount(""); // Reset input
    } catch (error) {
      console.error("Withdrawal error:", error);
      alert("Withdrawal failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-4">Withdraw Funds</h2>
      <p className="mb-2">Available Balance: {balance} ETH</p>
      <input
        type="number"
        placeholder="Amount to withdraw"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 border rounded mb-2"
      />
      <button
        onClick={withdrawFunds}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Processing..." : "Withdraw"}
      </button>
    </div>
  );
}
