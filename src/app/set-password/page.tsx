"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEvent } from 'react';
import { AuthLayout } from '@/components/shared/auth-layout';
import { Lock } from 'lucide-react';

export default function SetPasswordPage() {
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, you'd save the wallet and password securely
    router.push('/login');
  };

  return (
    <div className="flex justify-center">
        <AuthLayout title="Set Password">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="password">Choose a secure password</Label>
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
                 <div className="flex flex-col space-y-2">
                    <Button 
                        type="submit" 
                        className="w-full h-14 text-lg font-bold transition-all duration-300 hover:shadow-neon-red"
                    >
                        Finish Setup
                    </Button>
                    <Button type="button" variant="outline" onClick={() => router.back()} className="w-full h-12">
                        Back
                    </Button>
                </div>
            </form>
        </AuthLayout>
    </div>
  );
}
