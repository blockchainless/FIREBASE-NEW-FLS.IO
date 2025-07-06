"use client";

import { Button } from "@/components/ui/button";
import { History, Wallet } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/shared/auth-layout";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <AuthLayout title="flashloanstudio.io">
        <div className="space-y-6 text-center">
          <p className="text-muted-foreground max-w-sm mx-auto">
            Select restore if you had wallet before to access it. Select create
            wallet if you need to open new wallet to use this dapp.
          </p>
          <div className="w-full space-y-4 pt-4">
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
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="w-full h-12"
            >
              Back
            </Button>
          </div>
          <div className="pt-4">
            <p className="text-xs text-muted-foreground text-center">
              Blockchain Dapp, Powered by web3, 2025 All right reserved.
            </p>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
}
