import { ethers } from "ethers";

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? "";
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "";
const BACKEND_URL = "http://localhost:5500"; // Adjust if your backend URL is different

if (!ALCHEMY_API_KEY || !CONTRACT_ADDRESS) {
  throw new Error("Missing ALCHEMY_API_KEY or CONTRACT_ADDRESS in .env.local!");
}

// ✅ Connect to Alchemy Sepolia
const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);

let contract: ethers.Contract | null = null;

// ✅ Fetch ABI from backend and initialize contract
async function loadContract() {
  try {
    const response = await fetch(`${BACKEND_URL}/abi`);
    const data = await response.json();
    
    if (!data.abi) {
      throw new Error("ABI not found in response");
    }

    contract = new ethers.Contract(CONTRACT_ADDRESS, data.abi, provider);
    console.log("✅ Contract initialized:", contract);
  } catch (error) {
    console.error("❌ Error loading contract:", error);
  }
}

loadContract();

export { contract };
