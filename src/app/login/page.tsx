"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, KeyRound } from 'lucide-react';
import { FormEvent } from 'react';
import { AuthLayout } from '@/components/shared/auth-layout';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, you'd verify the password and pin
    router.push('/arbitrage');
  };

  return (
    <div className="flex justify-center">
        <AuthLayout title="Login">
            <form onSubmit={handleLogin} className="space-y-6 py-40">
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            id="password" 
                            type="password" 
                            placeholder="••••••••" 
                            required 
                            className="pl-10 h-12 text-lg bg-black/30 focus:bg-black/50 transition-colors"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="pin">PIN Code</Label>
                    <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            id="pin" 
                            type="password"
                            inputMode="numeric"
                            pattern="\d*"
                            placeholder="••••••••••" 
                            required 
                            className="pl-10 h-12 text-lg bg-black/30 focus:bg-black/50 transition-colors"
                        />
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <Button 
                        type="submit" 
                        className="w-full h-14 text-lg font-bold transition-all duration-300 hover:shadow-neon-red"
                    >
                        Login
                    </Button>
                    <Button variant="outline" onClick={() => router.push('/')} className="w-full h-12">
                        Back to Setup
                    </Button>
                </div>
            </form>
        </AuthLayout>
    </div>
  );
}
