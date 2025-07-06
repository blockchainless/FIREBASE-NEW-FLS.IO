import { Button } from "@/components/ui/button";
import { History, Wallet } from "lucide-react";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      <h1 className="text-5xl md:text-6xl font-bold font-headline text-center animate-fade-in-down">
        Demo
      </h1>
      <div className="w-full max-w-sm space-y-4 animate-fade-in-up">
        <Link href="/setup?action=restore" passHref>
          <Button
            variant="outline"
            size="lg"
            className="w-full h-16 text-lg border-2 border-primary hover:bg-primary/10 hover:text-foreground transition-all duration-300 hover:shadow-neon-red"
          >
            <History className="mr-3 h-6 w-6" />
            Restore Wallet
          </Button>
        </Link>
        <Link href="/setup?action=create" passHref>
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
    </div>
  );
}
