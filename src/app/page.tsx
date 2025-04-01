import BatchSubmit from "../../components/BatchSubmit"; 
import WalletConnect from "../../components/WalletConnect";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Layer 2 Transactions</h1>
      <BatchSubmit />
      <WalletConnect/>
    </div>
  );
}

