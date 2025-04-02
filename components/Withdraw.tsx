// "use client";
// import { useState, useEffect } from "react";
// import { ethers } from "ethers";

// declare global {
//   interface Window {
//     ethereum?: any;
//   }
// }

// export default function Withdraw() {
//   const [wallet, setWallet] = useState<string | null>(null);
//   const [balance, setBalance] = useState<string>("0");
//   const [amount, setAmount] = useState<string>("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchBalance = async () => {
//       if (!wallet || !window.ethereum) return;
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const balanceWei = await provider.getBalance(wallet);
//         setBalance(ethers.formatEther(balanceWei));
//       } catch (error) {
//         console.error("Error fetching balance:", error);
//       }
//     };

//     fetchBalance();
//   }, [wallet]);

//   const withdrawFunds = async () => {
//     if (!wallet || !amount) return alert("Enter a valid amount");
//     if (!window.ethereum) return alert("MetaMask not installed!");

//     try {
//       setLoading(true);
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
      
//       // TODO: Replace with your L2 withdrawal smart contract details
//       const l2WithdrawalContract = new ethers.Contract(
//         "YOUR_L2_WITHDRAW_CONTRACT_ADDRESS",
//         [
//           "function withdraw(uint256 amount) public"
//         ],
//         signer
//       );

//       const tx = await l2WithdrawalContract.withdraw(ethers.parseUnits(amount, 18));
//       await tx.wait(); // Wait for confirmation

//       alert(`Withdrawal successful! TX: ${tx.hash}`);
//       setAmount(""); // Reset input
//     } catch (error) {
//       console.error("Withdrawal error:", error);
//       alert("Withdrawal failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-4">
//       <h2 className="text-xl font-bold mb-4">Withdraw Funds</h2>
//       <p className="mb-2">Available Balance: {balance} ETH</p>
//       <input
//         type="number"
//         placeholder="Amount to withdraw"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         className="p-2 border rounded mb-2"
//       />
//       <button
//         onClick={withdrawFunds}
//         className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//         disabled={loading}
//       >
//         {loading ? "Processing..." : "Withdraw"}
//       </button>
//     </div>
//   );
// }
// "use client";
// import { useState, useEffect } from "react";
// import { useWallet } from "../src/context/WalletContext";


// export default function Withdraw({ wallet }: { wallet: string | null }) {
//   const [loading, setLoading] = useState(false);
//   const [txHash, setTxHash] = useState<string | null>(null);
//   const [amount, setAmount] = useState<string>("");
//   const [balance, setBalance] = useState("0");
//   const { wallet } = useWallet(); // ✅ Get wallet from context

//   // Fetch balance when wallet changes
//   useEffect(() => {
//     if (!wallet) return;

//     const fetchBalance = async () => {
//       try {
//         const response = await fetch(`http://localhost:5500/balance/${wallet}`);
//         const data = await response.json();
//         if (data.success) {
//           setBalance(data.balance);
//         } else {
//           console.error("Failed to fetch balance:", data.error);
//         }
//       } catch (error) {
//         console.error("Error fetching balance:", error);
//       }
//     };

//     fetchBalance();
//   }, [wallet]);

//   // Handle Withdrawal
//   const handleWithdraw = async () => {
//     if (!wallet) return alert("Connect wallet first!");
//     if (!amount || parseFloat(amount) <= 0) return alert("Enter valid amount!");

//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:5500/withdraw", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ wallet, amount }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         setTxHash(data.txHash);
//       } else {
//         console.error("Withdrawal failed:", data.error);
//       }
//     } catch (error) {
//       console.error("Error withdrawing funds:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-4 bg-gray-800 text-white rounded shadow-md w-full max-w-md">
//       <h2 className="text-xl font-bold">Withdraw Funds</h2>

//       {wallet ? (
//         <>
//           <p className="text-sm text-gray-400">Wallet: {wallet.slice(0, 6)}...{wallet.slice(-4)}</p>
//           <p className="text-sm text-gray-400">Balance: {balance} ETH</p>

//           <input
//             type="text"
//             placeholder="Amount to withdraw"
//             className="w-full p-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />

//           <button
//             className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
//             onClick={handleWithdraw}
//             disabled={loading}
//           >
//             {loading ? "Withdrawing..." : "Withdraw Funds"}
//           </button>

//           {txHash && (
//             <p className="mt-2 text-green-400">
//               ✅ Transaction Hash:{" "}
//               <a
//                 href={`https://sepolia.etherscan.io/tx/${txHash}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="underline"
//               >
//                 {txHash.slice(0, 6)}...{txHash.slice(-4)}
//               </a>
//             </p>
//           )}
//         </>
//       ) : (
//         <p className="text-red-400 mt-2">❌ Connect your wallet first!</p>
//       )}
//     </div>
//   );
// }

// "use client";
// import {ethers} from "ethers";
// import { useState, useEffect } from "react";
// import { useWallet } from "../src/context/WalletContext"; // ✅ Correct import

// export default function Withdraw() {
//   const { wallet } = useWallet(); // ✅ Use wallet from context
//   const [loading, setLoading] = useState(false);
//   const [txHash, setTxHash] = useState<string | null>(null);
//   const [amount, setAmount] = useState<string>("");
//   const [balance, setBalance] = useState("0");

//   // Fetch balance when wallet changes
//   useEffect(() => {
//     if (!wallet) return;

//     const fetchBalance = async () => {
//       try {
//         const response = await fetch(`http://localhost:5500/balance/${wallet}`);
//         const data = await response.json();
//         if (data.success) {
//           setBalance(data.balance);
//         } else {
//           console.error("Failed to fetch balance:", data.error);
//         }
//       } catch (error) {
//         console.error("Error fetching balance:", error);
//       }
//     };

//     fetchBalance();
//   }, [wallet]);

//   // Handle Withdrawal
//   const handleWithdraw = async () => {
//     if (!wallet) return alert("Connect wallet first!");
//     if (!amount || parseFloat(amount) <= 0) return alert("Enter valid amount!");

//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:5500/withdraw", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ wallet, amount: ethers.parseEther(amount).toString() }),
// ,
//       });
//       const data = await response.json();
//       if (data.success) {
//         setTxHash(data.txHash);
//       } else {
//         console.error("Withdrawal failed:", data.error);
//       }
//     } catch (error) {
//       console.error("Error withdrawing funds:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-4 bg-gray-800 text-white rounded shadow-md w-full max-w-md">
//       <h2 className="text-xl font-bold">Withdraw Funds</h2>

//       {wallet ? (
//         <>
//           <p className="text-sm text-gray-400">Wallet: {wallet.slice(0, 6)}...{wallet.slice(-4)}</p>
//           <p className="text-sm text-gray-400">Balance: {balance} ETH</p>

//           <input
//             type="text"
//             placeholder="Amount to withdraw"
//             className="w-full p-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />

//           <button
//             className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
//             onClick={handleWithdraw}
//             disabled={loading}
//           >
//             {loading ? "Withdrawing..." : "Withdraw Funds"}
//           </button>

//           {txHash && (
//             <p className="mt-2 text-green-400">
//               ✅ Transaction Hash:{" "}
//               <a
//                 href={`https://sepolia.etherscan.io/tx/${txHash}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="underline"
//               >
//                 {txHash.slice(0, 6)}...{txHash.slice(-4)}
//               </a>
//             </p>
//           )}
//         </>
//       ) : (
//         <p className="text-red-400 mt-2">❌ Connect your wallet first!</p>
//       )}
//     </div>
//   );
// }
"use client";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useWallet } from "../src/context/WalletContext"; // ✅ Correct import

export default function Withdraw() {
  const { wallet } = useWallet(); // ✅ Use wallet from context
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [balance, setBalance] = useState("0");

  // Fetch balance when wallet changes
  useEffect(() => {
    if (!wallet) return;

    const fetchBalance = async () => {
      try {
        const response = await fetch(`http://localhost:5500/balance/${wallet}`);
        const data = await response.json();
        if (data.success) {
          setBalance(data.balance);
        } else {
          console.error("Failed to fetch balance:", data.error);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [wallet]);

  // Handle Withdrawal
  const handleWithdraw = async () => {
    if (!wallet) return alert("Connect wallet first!");
    if (!amount || parseFloat(amount) <= 0) return alert("Enter valid amount!");

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5500/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          wallet, 
          amount: ethers.parseEther(amount).toString() // ✅ Fix BigNumberish conversion
        }),
      });

      const data = await response.json();
      if (data.success) {
        setTxHash(data.txHash);
      } else {
        console.error("Withdrawal failed:", data.error);
        alert("Withdrawal failed: " + data.error);
      }
    } catch (error) {
      console.error("Error withdrawing funds:", error);
      alert("Error withdrawing funds: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold">Withdraw Funds</h2>

      {wallet ? (
        <>
          <p className="text-sm text-gray-400">Wallet: {wallet.slice(0, 6)}...{wallet.slice(-4)}</p>
          <p className="text-sm text-gray-400">Balance: {balance} ETH</p>

          <input
            type="text"
            placeholder="Amount to withdraw"
            className="w-full p-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
            onClick={handleWithdraw}
            disabled={loading}
          >
            {loading ? "Withdrawing..." : "Withdraw Funds"}
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
        </>
      ) : (
        <p className="text-red-400 mt-2">❌ Connect your wallet first!</p>
      )}
    </div>
  );
}
