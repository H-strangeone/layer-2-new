// "use client";
// import { useState, useEffect } from "react";
// import { ethers } from "ethers";

// declare global {
//   interface Window {
//     ethereum?: any;
//   }
// }

// export default function TransactionTracker({ wallet }: { wallet: string | null }) {
//   const [transactions, setTransactions] = useState<{ hash: string; status: string }[]>([]);

//   useEffect(() => {
//     if (wallet) {
//       fetchTransactions(wallet);
//     }
//   }, [wallet]);

//   const fetchTransactions = async (address: string) => {
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const history = await provider.getTransactionhistory(address);

//       const txs = history.map((tx: any) => ({
//         hash: tx.hash,
//         status: tx.confirmations > 0 ? "Confirmed" : "Pending",
//       }));

//       setTransactions(txs);
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//     }
//   };

//   return (
//     <div className="mt-4 w-full max-w-lg">
//       <h2 className="text-lg font-bold mb-2">Recent Transactions</h2>
//       {transactions.length === 0 ? (
//         <p>No transactions found.</p>
//       ) : (
//         <ul className="border border-gray-600 rounded p-2">
//           {transactions.map((tx, index) => (
//             <li key={index} className="flex justify-between p-2 border-b last:border-none">
//               <a
//                 href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-400"
//               >
//                 {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
//               </a>
//               <span
//                 className={`px-2 py-1 rounded text-white ${
//                   tx.status === "Confirmed" ? "bg-green-500" : "bg-yellow-500"
//                 }`}
//               >
//                 {tx.status}
//               </span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
// "use client";
// import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// const ALCHEMY_API_KEY = "ThPQEn2P7cfVBkx4lubJqJVl_Ay0ATnr";


// export default function TransactionTracker({ wallet }: { wallet: string | null }) {
  
//   const [loading, setLoading] = useState<boolean>(false);
//   const [transactions, setTransactions] = useState<{ 
//     hash: string; 
//     time: string;
//     amount: string;  // ✅ Add amount
//     token: string;
//     type: "Sent" | "Received"; // ✅ Add 'type' explicitly   // ✅ Add token name (ETH, USDC, etc.)
//   }[]>([]);
  
//   useEffect(() => {
//     if (wallet) {
//       fetchTransactions(wallet);
//     }
//   }, [wallet]);

//   const fetchTransactions = async (address: string) => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             jsonrpc: "2.0",
//             method: "alchemy_getAssetTransfers",
//             params: [{
//               fromBlock: "0x0",
//               toBlock: "latest",
//               fromAddress: address, // ✅ Get transactions from this address
//               toAddress: address,   // ✅ Get transactions to this address
//               category: ["external", "erc20"],
//             }],
//             id: 1,
//           }),
//         }
//       );
  
//       const data = await response.json();
      
//       if (data.result?.transfers) {
//         setTransactions(
//           data.result.transfers.map((tx: any) => ({
//             hash: tx.hash,
//             time: new Date(tx.blockNum * 1000).toLocaleString(),
//             amount: ethers.formatUnits(tx.value, tx.asset === "ETH" ? 18 : tx.decimals), // ✅ Convert value
//             token: tx.asset, // ✅ Token name
//             type: tx.from.toLowerCase() === address.toLowerCase() ? "Sent" : "Received", // ✅ Add type
//           }))
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//     }
//     setLoading(false);
//   };
  
  
  
  
  

//   return (
//     <div className="mt-4 w-full max-w-lg">
//       <h2 className="text-lg font-bold mb-2">Recent Transactions</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : transactions.length > 0 ? (
//         <ul className="border border-gray-600 rounded p-2">
//           {transactions.map((tx, index) => (
//             <li key={index} className="flex justify-between p-2 border-b last:border-none">
//               <a
//                 href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-400"
//               >
//                 {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
//               </a>
//               <span className={`text-sm ${tx.type === "Sent" ? "text-red-400" : "text-green-400"}`}>
//                 {tx.type === "Sent" ? "- " : "+ "}
//                 {tx.amount} {tx.token}
//               </span>
//               <span className="text-gray-400 text-sm">{tx.time}</span>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No transactions found.</p>
//       )}
//     </div>
//   );
  
  
  
// }
// "use client";
// import { useState, useEffect } from "react";
// import { ethers } from "ethers";

// const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY; // ✅ Use env variable

// export default function TransactionTracker({ wallet }: { wallet: string | null }) {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [transactions, setTransactions] = useState<
//     { hash: string; time: string; amount: string; token: string; type: "Sent" | "Received" }[]
//   >([]);

//   useEffect(() => {
//     if (wallet) {
//       fetchTransactions(wallet);
//     }
//   }, [wallet]);

//   const fetchTransactions = async (address: string) => {
//     if (!ALCHEMY_API_KEY) {
//       console.error("Alchemy API key is missing!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             jsonrpc: "2.0",
//             method: "alchemy_getAssetTransfers",
//             params: [
//               {
//                 fromBlock: "0x0",
//                 toBlock: "latest",
//                 fromAddress: address, // ✅ Sent transactions
//                 toAddress: address, // ✅ Received transactions
//                 category: ["external", "erc20"],
//               },
//             ],
//             id: 1,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (data.result?.transfers) {
//         setTransactions(
//           data.result.transfers.map((tx: any) => ({
//             hash: tx.hash,
//             time: new Date(tx.blockNum * 1000).toLocaleString(),
//             amount: ethers.formatUnits(tx.value, tx.asset === "ETH" ? 18 : tx.decimals),
//             token: tx.asset,
//             type: tx.from.toLowerCase() === address.toLowerCase() ? "Sent" : "Received",
//           }))
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="mt-4 w-full max-w-lg">
//       <h2 className="text-lg font-bold mb-2">Recent Transactions</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : transactions.length > 0 ? (
//         <ul className="border border-gray-600 rounded p-2">
//           {transactions.map((tx, index) => (
//             <li key={index} className="flex justify-between p-2 border-b last:border-none">
//               <a
//                 href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-400"
//               >
//                 {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
//               </a>
//               <span className={`text-sm ${tx.type === "Sent" ? "text-red-400" : "text-green-400"}`}>
//                 {tx.type === "Sent" ? "- " : "+ "}
//                 {tx.amount} {tx.token}
//               </span>
//               <span className="text-gray-400 text-sm">{tx.time}</span>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No transactions found.</p>
//       )}
//     </div>
//   );
// }
// "use client";
// import { useState, useEffect } from "react";
// import { ethers } from "ethers";

// const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

// export default function TransactionTracker({ wallet }: { wallet: string | null }) {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [transactions, setTransactions] = useState<
//     { hash: string; time: string; amount: string; token: string; type: "Sent" | "Received" }[]
//   >([]);

//   useEffect(() => {
//     if (wallet) {
//       fetchTransactions(wallet);
//     } else {
//       setTransactions([]); // ✅ Reset transactions when wallet disconnects
//     }
//   }, [wallet]);

//   const fetchTransactions = async (address: string) => {
//     if (!ALCHEMY_API_KEY) {
//       console.error("Alchemy API key is missing!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             jsonrpc: "2.0",
//             method: "alchemy_getAssetTransfers",
//             params: [
//               {
//                 fromBlock: "0x0",
//                 toBlock: "latest",
//                 fromAddress: address,
//                 toAddress: address,
//                 category: ["external", "erc20"],
//               },
//             ],
//             id: 1,
//           }),
//         }
//       );

//       const data = await response.json();
//       if (data.result?.transfers) {
//         setTransactions(
//           data.result.transfers.map((tx: any) => ({
//             hash: tx.hash,
//             time: new Date(parseInt(tx.metadata.blockTimestamp) * 1000).toLocaleString(),
//             amount: ethers.formatUnits(tx.value, tx.asset === "ETH" ? 18 : tx.decimals),
//             token: tx.asset,
//             type: tx.from.toLowerCase() === address.toLowerCase() ? "Sent" : "Received",
//           }))
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="mt-4 w-full max-w-lg">
//       <h2 className="text-lg font-bold mb-2">Recent Transactions</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : transactions.length > 0 ? (
//         <ul className="border border-gray-600 rounded p-2">
//           {transactions.map((tx, index) => (
//             <li key={index} className="flex justify-between p-2 border-b last:border-none">
//               <a
//                 href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-400"
//               >
//                 {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
//               </a>
//               <span className={`text-sm ${tx.type === "Sent" ? "text-red-400" : "text-green-400"}`}>
//                 {tx.type === "Sent" ? "- " : "+ "}
//                 {tx.amount} {tx.token}
//               </span>
//               <span className="text-gray-400 text-sm">{tx.time}</span>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No transactions found.</p>
//       )}
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

interface Transaction {
  hash: string;
  time: string;
  amount: string;
  token: string;
  type: "Sent" | "Received";
}

interface TransactionTrackerProps {
  wallet: string | null;
  transactions: Transaction[]; // ✅ Accept transactions prop
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>; // ✅ Accept setTransactions prop
}

export default function TransactionTracker({ wallet, transactions, setTransactions }: TransactionTrackerProps) {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (wallet) {
      fetchTransactions(wallet);
    }
  }, [wallet]);

  const fetchTransactions = async (address: string) => {
    if (!ALCHEMY_API_KEY) {
      console.error("Alchemy API key is missing!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "alchemy_getAssetTransfers",
            params: [
              {
                fromBlock: "0x0",
                toBlock: "latest",
                fromAddress: address, // ✅ Sent transactions
                toAddress: address, // ✅ Received transactions
                category: ["external", "erc20"],
              },
            ],
            id: 1,
          }),
        }
      );

      const data = await response.json();

      if (data.result?.transfers) {
        setTransactions(
          data.result.transfers.map((tx: any) => ({
            hash: tx.hash,
            time: new Date(tx.blockNum * 1000).toLocaleString(),
            amount: ethers.formatUnits(tx.value, tx.asset === "ETH" ? 18 : tx.decimals),
            token: tx.asset,
            type: tx.from.toLowerCase() === address.toLowerCase() ? "Sent" : "Received",
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
    setLoading(false);
  };

  return (
    <div className="mt-4 w-full max-w-lg">
      <h2 className="text-lg font-bold mb-2">Recent Transactions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : transactions.length > 0 ? (
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
              <span className={`text-sm ${tx.type === "Sent" ? "text-red-400" : "text-green-400"}`}>
                {tx.type === "Sent" ? "- " : "+ "}
                {tx.amount} {tx.token}
              </span>
              <span className="text-gray-400 text-sm">{tx.time}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
}
