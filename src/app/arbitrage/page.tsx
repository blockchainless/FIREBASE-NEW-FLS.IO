"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ArbitragePage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="w-full max-w-sm mx-auto animate-fade-in">
      <Card className="bg-black/50 backdrop-blur-sm border-2 border-primary shadow-neon-blue">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">DEMO</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Content will be provided later. Adding placeholder height */}
          <div className="h-64" />
        </CardContent>
        <CardFooter className="flex justify-center pt-2">
           <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-xs text-muted-foreground hover:bg-transparent hover:text-foreground p-0 h-auto"
          >
            All right reserved
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
