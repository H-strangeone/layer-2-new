// import WalletConnect from "../../components/WalletConnect";
// import BatchSubmit from "../../components/BatchSubmit";

// export default function Home() {
//   return (
//     <> {/* Fragment to group multiple components */}
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
//         <h1 className="text-3xl font-bold mb-4">Layer 2 Transactions</h1>

//         {/* Wallet Connect (Only needed if not already in Navbar) */}
//         {/* Remove this if WalletConnect is already in Navbar */}
//         {/* <WalletConnect /> */}

//         {/* Batch Transactions */}
//         <BatchSubmit />
//       </div>
//     </>
//   );
// }
import BatchSubmit from "../../components/BatchSubmit";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-4">Layer 2 Transactions</h1>
        <BatchSubmit />
      </div>
    </>
  );
}


