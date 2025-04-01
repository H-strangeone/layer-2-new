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
//       setWallet(accounts[0]);
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
//   const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);

//   useEffect(() => {
//     if (typeof window !== "undefined" && window.ethereum) {
//       setIsMetaMaskInstalled(true);
//     }
//   }, []);

//   const connectWallet = async () => {
//     if (!window.ethereum) {
//       alert("MetaMask not installed! Please install it and try again.");
//       return;
//     }

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
//       ) : isMetaMaskInstalled ? (
//         <button onClick={connectWallet} className="bg-blue-500 px-4 py-2 rounded text-white">
//           Connect Wallet
//         </button>
//       ) : (
//         <button disabled className="bg-gray-500 px-4 py-2 rounded text-white cursor-not-allowed">
//           MetaMask Not Installed
//         </button>
//       )}
//     </div>
//   );
// }
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
//   const [balance, setBalance] = useState<string | null>(null);
//   const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);

//   useEffect(() => {
//     if (typeof window !== "undefined" && window.ethereum) {
//       setIsMetaMaskInstalled(true);
//     }
//   }, []);

//   const connectWallet = async () => {
//     if (!window.ethereum) {
//       alert("MetaMask not installed! Please install it and try again.");
//       return;
//     }

//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const accounts = await provider.send("eth_requestAccounts", []);
//       setWallet(accounts[0]); // ✅ Store address
//       fetchBalance(provider, accounts[0]); // ✅ Fetch balance
//     } catch (error) {
//       console.error("Error connecting wallet:", error);
//     }
//   };

//   const fetchBalance = async (provider: ethers.BrowserProvider, address: string) => {
//     try {
//       const balance = await provider.getBalance(address);
//       setBalance(ethers.formatEther(balance)); // ✅ Convert balance to ETH
//     } catch (error) {
//       console.error("Error fetching balance:", error);
//     }
//   };

//   const disconnectWallet = () => {
//     setWallet(null);
//     setBalance(null);
//   };

//   return (
//     <div className="flex items-center gap-2">
//       {wallet ? (
//         <div className="relative group">
//           <button className="bg-green-500 px-4 py-2 rounded text-white">
//             {wallet.slice(0, 6)}...{wallet.slice(-4)}
//           </button>
//           <span className="ml-2 text-sm text-gray-300">{balance ? `${balance} ETH` : "Loading..."}</span>
//           <button
//             onClick={disconnectWallet}
//             className="absolute top-10 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-red-500 px-3 py-1 text-white rounded"
//           >
//             Disconnect
//           </button>
//         </div>
//       ) : isMetaMaskInstalled ? (
//         <button onClick={connectWallet} className="bg-blue-500 px-4 py-2 rounded text-white">
//           Connect Wallet
//         </button>
//       ) : (
//         <button disabled className="bg-gray-500 px-4 py-2 rounded text-white cursor-not-allowed">
//           MetaMask Not Installed
//         </button>
//       )}
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import TransactionTracker from "./TransactionTracker"; // ✅ Import TransactionTracker

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function WalletConnect() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      setIsMetaMaskInstalled(true);
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not installed! Please install it and try again.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWallet(accounts[0]); // ✅ Store address
      fetchBalance(provider, accounts[0]); // ✅ Fetch balance
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const fetchBalance = async (provider: ethers.BrowserProvider, address: string) => {
    try {
      const balance = await provider.getBalance(address);
      setBalance(ethers.formatEther(balance)); // ✅ Convert balance to ETH
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setBalance(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        {wallet ? (
          <div className="relative group">
            <button className="bg-green-500 px-4 py-2 rounded text-white">
              {wallet.slice(0, 6)}...{wallet.slice(-4)}
            </button>
            <span className="ml-2 text-sm text-gray-300">{balance ? `${balance} ETH` : "Loading..."}</span>
            <button
              onClick={disconnectWallet}
              className="absolute top-10 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-red-500 px-3 py-1 text-white rounded"
            >
              Disconnect
            </button>
          </div>
        ) : isMetaMaskInstalled ? (
          <button onClick={connectWallet} className="bg-blue-500 px-4 py-2 rounded text-white">
            Connect Wallet
          </button>
        ) : (
          <button disabled className="bg-gray-500 px-4 py-2 rounded text-white cursor-not-allowed">
            MetaMask Not Installed
          </button>
        )}
      </div>

      {/* ✅ Show Transaction Tracker */}
      {wallet && <TransactionTracker wallet={wallet} />}
    </div>
  );
}