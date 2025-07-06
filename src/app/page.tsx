import { Button } from "@/components/ui/button";
import { History, Wallet } from "lucide-react";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-center space-y-4 animate-fade-in-down">
        <h1 className="text-5xl md:text-6xl font-bold font-headline">
          Demo
        </h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Select restore if you had wallet before to access it. Select create wallet if you need to open new wallet to use this dapp.
        </p>
      </div>
      <div className="w-full max-w-sm space-y-6 animate-fade-in-up">
        <Link href="/set-password?action=restore" passHref>
          <Button
            variant="outline"
            size="lg"
            className="w-full h-16 text-lg border-2 border-primary hover:bg-primary/10 hover:text-foreground transition-all duration-300 hover:shadow-neon-red"
          >
            <History className="mr-3 h-6 w-6" />
            Restore Wallet
          </Button>
        </Link>
        <Link href="/set-password?action=create" passHref>
          <Button
            variant="outline"
            size="lg"
            className="w-full h-16 text-lg border-2 border-primary hover:bg-primary/10 hover:text-foreground transition-all duration-300 hover:shadow-neon-red"
          >
            <Wallet className="mr-3 h-6 w-6" />
            Create Wallet
          </Button>
        </Link>
      </div>
      <div className="animate-fade-in-up">
        <p className="text-xs text-muted-foreground text-center">
          Blockchain Dapp, Powered by web3, 2025 All right reserved.
        </p>
      </div>
    </div>
  );
}
