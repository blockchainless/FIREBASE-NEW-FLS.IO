
"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEvent, Suspense, useEffect, useState, useCallback } from 'react';
import { AuthLayout } from '@/components/shared/auth-layout';
import * as bip39 from 'bip39';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { wordlist } from '@/lib/bip39-wordlist';

function SetupPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get('action');

  const [seedPhrase, setSeedPhrase] = useState('');
  const [words, setWords] = useState(Array(24).fill(''));

  const generateNewSeed = useCallback(() => {
    const mnemonic = bip39.generateMnemonic(256, undefined, wordlist); // 24 words
    setSeedPhrase(mnemonic);
  }, []);

  useEffect(() => {
    if (action === 'create') {
      generateNewSeed();
    }
  }, [action, generateNewSeed]);

  const handleRestoreChange = (index: number, value: string) => {
    const newWords = [...words];
    newWords[index] = value.trim().toLowerCase();
    setWords(newWords);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate the seed phrase
    router.push('/arbitrage');
  };

  if (action === 'create') {
    return (
      <AuthLayout title="Create Wallet">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Your 24-word Seed Phrase</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Write these words down in order and keep them somewhere safe. This is the only way to recover your wallet.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 p-4 border rounded-md bg-black/20 text-sm">
              {seedPhrase ? seedPhrase.split(' ').map((word, index) => (
                <div key={index} className="truncate">
                  <span className="text-muted-foreground mr-2 select-none">{index + 1}.</span>{word}
                </div>
              )) : Array.from({ length: 24 }).map((_, index) => <Skeleton key={index} className="h-5 w-full" />)}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Button
                type="button"
                variant="outline"
                onClick={generateNewSeed}
                className="w-full h-12"
            >
                Generate New Seed
            </Button>
            <Button
              type="submit"
              disabled={!seedPhrase}
              className="w-full h-14 text-lg font-bold transition-all duration-300 hover:shadow-neon-red"
            >
              I've saved my phrase, Continue
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push('/welcome')} className="w-full h-12">
              Back
            </Button>
          </div>
        </form>
      </AuthLayout>
    );
  }

  if (action === 'restore') {
    return (
      <AuthLayout title="Restore Wallet">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Enter your 24-word Seed Phrase</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Enter one word per field to restore your wallet.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
              {words.map((word, index) => (
                  <div key={index} className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground select-none">{index + 1}</span>
                      <Input
                          type="text"
                          value={word}
                          onChange={(e) => handleRestoreChange(index, e.target.value)}
                          className="pl-7 bg-black/30 focus:bg-black/50 text-sm h-10"
                          autoCapitalize="none"
                          autoComplete="off"
                          autoCorrect="off"
                      />
                  </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Button
              type="submit"
              className="w-full h-14 text-lg font-bold transition-all duration-300 hover:shadow-neon-red"
            >
              Continue
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push('/welcome')} className="w-full h-12">
              Back
            </Button>
          </div>
        </form>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Setup Wallet">
      <div className="text-center space-y-4">
        <p>Please select an action from the welcome page.</p>
          <Link href="/welcome" passHref>
              <Button variant="outline">Go to Welcome</Button>
          </Link>
      </div>
    </AuthLayout>
  );
}

export default function SetupPage() {
  return (
    <div className="flex justify-center">
        <Suspense fallback={<AuthLayout title="Loading..."><Skeleton className="h-64 w-full" /></AuthLayout>}>
          <SetupPageContent />
        </Suspense>
    </div>
  );
}
