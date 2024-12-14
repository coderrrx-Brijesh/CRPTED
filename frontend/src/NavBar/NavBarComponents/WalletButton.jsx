import { Button } from "../../components/ui/button";
import { WalletIcon } from "lucide-react";

 export const WalletButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700">
      <WalletIcon className="w-5 h-5 text-white" />
      <span>Connect Wallet</span>
    </Button>
  );
};

