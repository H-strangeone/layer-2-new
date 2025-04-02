// "use client";
// import { useState, useEffect } from "react";
// import { ethers } from "ethers";

// declare global {
//   interface Window {
//     ethereum?: any;
//   }
// }

// export default function WalletConnect() {
//   const [wallet, setWallet] = useState<string | null>(null);

//   useEffect(() => {
//     const checkConnection = async () => {
//       if (window.ethereum) {
//         try {
//           const provider = new ethers.BrowserProvider(window.ethereum);
//           const accounts = await provider.send("eth_accounts", []);
//           if (accounts.length > 0) {
//             setWallet(accounts[0]);
//           }
//         } catch (error) {
//           console.error("Error fetching accounts:", error);
//         }
//       }
//     };
//     checkConnection();
//   }, []);

//   const connectWallet = async () => {
//     if (!window.ethereum) return alert("MetaMask not installed!");

//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const accounts = await provider.send("eth_requestAccounts", []);
//       setWallet(accounts[0]); // ✅ Only store address
//     } catch (error) {
//       console.error("Error connecting wallet:", error);
//     }
//   };

//   const disconnectWallet = () => {
//     setWallet(null);
//   };

//   return (
//     <div className="flex items-center gap-2">
//       {wallet ? (
//         <div className="relative group">
//           <button className="bg-green-500 px-4 py-2 rounded text-white">
//             {wallet.slice(0, 6)}...{wallet.slice(-4)}
//           </button>
//           <button
//             onClick={disconnectWallet}
//             className="absolute top-10 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-red-500 px-3 py-1 text-white rounded"
//           >
//             Disconnect
//           </button>
//         </div>
//       ) : (
//         <button onClick={connectWallet} className="bg-blue-500 px-4 py-2 rounded text-white">
//           Connect Wallet
//         </button>
//       )}
//     </div>
//   );
// }
//
//
//
// "use client";
// import { useState } from "react";
// import { ethers } from "ethers";

// export default function BatchSubmit() {
//   const [transactions, setTransactions] = useState<{ recipient: string; amount: string }[]>([]);
//   const [recipient, setRecipient] = useState("");
//   const [amount, setAmount] = useState("");

//   const addTransaction = () => {
//     if (!ethers.isAddress(recipient)) {
//       alert("Invalid recipient address!");
//       return;
//     }
//     if (parseFloat(amount) <= 0) {
//       alert("Amount must be greater than 0!");
//       return;
//     }
//     setTransactions([...transactions, { recipient, amount }]);
//     setRecipient("");
//     setAmount("");
//   };

//   const submitTransactions = async () => {
//     if (transactions.length === 0) {
//       alert("No transactions to submit.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5500/api/submitBatch", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ transactions }),
//       });
//       const data = await response.json();
//       alert(`Batch submitted! Transaction ID: ${data.txId}`);
//       setTransactions([]);
//     } catch (error) {
//       console.error("Error submitting transactions:", error);
//       alert("Transaction submission failed.");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-800 text-white rounded-md w-full max-w-md">
//       <h2 className="text-lg font-bold">Batch Transactions</h2>

//       <div className="mt-4 flex flex-col gap-2">
//         <input
//           type="text"
//           placeholder="Recipient Address"
//           value={recipient}
//           onChange={(e) => setRecipient(e.target.value)}
//           className="p-2 rounded text-black"
//         />
//         <input
//           type="number"
//           placeholder="Amount (ETH)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="p-2 rounded text-black"
//         />
//         <button onClick={addTransaction} className="bg-green-500 px-4 py-2 rounded">
//           Add Transaction
//         </button>
//       </div>

//       {transactions.length > 0 && (
//         <table className="mt-4 w-full text-left border border-gray-600">
//           <thead>
//             <tr className="bg-gray-700">
//               <th className="p-2">Recipient</th>
//               <th className="p-2">Amount (ETH)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map((tx, index) => (
//               <tr key={index} className="border-t border-gray-600">
//                 <td className="p-2">{tx.recipient}</td>
//                 <td className="p-2">{tx.amount}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {transactions.length > 0 && (
//         <button onClick={submitTransactions} className="bg-blue-500 px-4 py-2 mt-4 rounded">
//           Submit Transactions
//         </button>
//       )}
//     </div>
//   );
// }
// "use client";
// import { useState } from "react";

// export default function BatchSubmit() {
//   const [recipients, setRecipients] = useState<string[]>([]);
//   const [amounts, setAmounts] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [txHash, setTxHash] = useState<string | null>(null);

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:5500/submit-transactions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ recipients, amounts }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         setTxHash(data.txHash);
//       } else {
//         console.error("Transaction failed:", data.error);
//       }
//     } catch (error) {
//       console.error("Error submitting transaction:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-4 bg-gray-800 text-white rounded shadow-md w-full max-w-md">
//       <h2 className="text-xl font-bold">Batch Submit</h2>

//       <input
//         type="text"
//         placeholder="Recipient Address"
//         className="w-full p-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded"
//         onChange={(e) => setRecipients(e.target.value.split(","))}
//       />
//       <input
//         type="text"
//         placeholder="Amounts (comma-separated)"
//         className="w-full p-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded"
//         onChange={(e) => setAmounts(e.target.value.split(","))}
//       />

//       <button
//         className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
//         onClick={handleSubmit}
//         disabled={loading}
//       >
//         {loading ? "Submitting..." : "Submit Transactions"}
//       </button>

//       {txHash && (
//         <p className="mt-2 text-green-400">
//           ✅ Transaction Hash:{" "}
//           <a
//             href={`https://sepolia.etherscan.io/tx/${txHash}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="underline"
//           >
//             {txHash.slice(0, 6)}...{txHash.slice(-4)}
//           </a>
//         </p>
//       )}
//     </div>
//   );
// }
// "use client";
// import { useState, useEffect } from "react";

// export default function BatchSubmit() {
//   const [recipientsInput, setRecipientsInput] = useState("");
//   const [amountsInput, setAmountsInput] = useState("");
//   const [recipients, setRecipients] = useState<string[]>([]);
//   const [amounts, setAmounts] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [txHash, setTxHash] = useState<string | null>(null);

//   // Convert input to arrays when user stops typing
//   useEffect(() => {
//     setRecipients(recipientsInput.split(",").map((r) => r.trim()));
//     setAmounts(amountsInput.split(",").map((a) => a.trim()));
//   }, [recipientsInput, amountsInput]);

//   const handleSubmit = async () => {
//     if (recipients.length === 0 || amounts.length === 0) {
//       alert("Please enter valid recipients and amounts.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:5500/submit-transactions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ recipients, amounts }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         setTxHash(data.txHash);
//       } else {
//         console.error("Transaction failed:", data.error);
//       }
//     } catch (error) {
//       console.error("Error submitting transaction:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-4 bg-gray-800 text-white rounded shadow-md w-full max-w-md">
//       <h2 className="text-xl font-bold">Batch Submit</h2>

//       <input
//         type="text"
//         placeholder="Recipient Addresses (comma-separated)"
//         className="w-full p-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded"
//         value={recipientsInput}
//         onChange={(e) => setRecipientsInput(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Amounts (comma-separated)"
//         className="w-full p-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded"
//         value={amountsInput}
//         onChange={(e) => setAmountsInput(e.target.value)}
//       />

//       <button
//         className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
//         onClick={handleSubmit}
//         disabled={loading}
//       >
//         {loading ? "Submitting..." : "Submit Transactions"}
//       </button>

//       {txHash && (
//         <p className="mt-2 text-green-400">
//           ✅ Transaction Hash:{" "}
//           <a
//             href={`https://sepolia.etherscan.io/tx/${txHash}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="underline"
//           >
//             {txHash.slice(0, 6)}...{txHash.slice(-4)}
//           </a>
//         </p>
//       )}
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers"; // ✅ Import ethers

export default function BatchSubmit() {
  const [recipientsInput, setRecipientsInput] = useState("");
  const [amountsInput, setAmountsInput] = useState("");
  const [recipients, setRecipients] = useState<string[]>([]);
  const [amounts, setAmounts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  // Convert input to arrays when user stops typing
  useEffect(() => {
    setRecipients(recipientsInput.split(",").map((r) => r.trim()));
    setAmounts(amountsInput.split(",").map((a) => a.trim()));
  }, [recipientsInput, amountsInput]);

  const handleSubmit = async () => {
    if (recipients.length === 0 || amounts.length === 0) {
      alert("Please enter valid recipients and amounts.");
      return;
    }

    try {
      // ✅ Convert ETH to Wei before sending
      const amountsInWei = amounts.map((a) => ethers.parseEther(a).toString());

      setLoading(true);
      const response = await fetch("http://localhost:5500/submit-transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipients, amounts: amountsInWei }), // ✅ Send converted amounts
      });

      const data = await response.json();
      if (data.success) {
        setTxHash(data.txHash);
      } else {
        console.error("Transaction failed:", data.error);
        alert("Transaction failed: " + data.error);
      }
    } catch (error) {
      console.error("Error submitting transaction:", error);
      alert("Error submitting transaction: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold">Batch Submit</h2>

      <input
        type="text"
        placeholder="Recipient Addresses (comma-separated)"
        className="w-full p-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded"
        value={recipientsInput}
        onChange={(e) => setRecipientsInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amounts in ETH (comma-separated)"
        className="w-full p-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded"
        value={amountsInput}
        onChange={(e) => setAmountsInput(e.target.value)}
      />

      <button
        className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Transactions"}
      </button>

      {txHash && (
        <p className="mt-2 text-green-400">
          ✅ Transaction Hash:{" "}
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {txHash.slice(0, 6)}...{txHash.slice(-4)}
          </a>
        </p>
      )}
    </div>
  );
}
