"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEvent, useState } from 'react';
import { AuthLayout } from '@/components/shared/auth-layout';
import { Lock, KeyRound } from 'lucide-react';

export default function SetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!/^\d{4,6}$/.test(pin)) {
      setError("PIN must be between 4 and 6 digits.");
      return;
    }
    if (pin !== confirmPin) {
      setError("PIN codes do not match.");
      return;
    }
    
    // In a real app, you'd save the wallet, password and pin securely
    router.push('/arbitrage');
  };

  return (
    <div className="flex justify-center">
        <AuthLayout title="Set Security">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="password">Choose a secure password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            id="password" 
                            type="password" 
                            placeholder="••••••••" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 h-12 text-lg bg-black/30 focus:bg-black/50 transition-colors"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            id="confirm-password" 
                            type="password" 
                            placeholder="••••••••" 
                            required 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pl-10 h-12 text-lg bg-black/30 focus:bg-black/50 transition-colors"
                        />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="pin">Set a 4-6 digit PIN</Label>
                    <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            id="pin" 
                            type="password"
                            inputMode="numeric"
                            pattern="\d*"
                            maxLength={6}
                            placeholder="••••" 
                            required 
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="pl-10 h-12 text-lg bg-black/30 focus:bg-black/50 transition-colors"
                        />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="confirm-pin">Confirm PIN</Label>
                    <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            id="confirm-pin" 
                            type="password"
                            inputMode="numeric"
                            pattern="\d*"
                            maxLength={6}
                            placeholder="••••" 
                            required 
                            value={confirmPin}
                            onChange={(e) => setConfirmPin(e.target.value)}
                            className="pl-10 h-12 text-lg bg-black/30 focus:bg-black/50 transition-colors"
                        />
                    </div>
                </div>
                
                {error && <p className="text-sm text-destructive text-center">{error}</p>}
                
                 <div className="flex flex-col space-y-2 pt-4">
                    <Button 
                        type="submit" 
                        className="w-full h-14 text-lg font-bold transition-all duration-300 hover:shadow-neon-red"
                    >
                        Save & Continue
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
