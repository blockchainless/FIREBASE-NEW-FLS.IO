"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function InformationPage() {
    const router = useRouter();

    return (
        <div className="w-full max-w-sm mx-auto animate-fade-in">
            <Card className="bg-black/50 backdrop-blur-sm border-2 border-primary shadow-neon-blue flex flex-col max-h-[85vh]">
                <CardHeader>
                    <CardTitle className="text-3xl text-center font-headline">Information</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow overflow-y-auto no-scrollbar space-y-4 text-foreground/90">
                    <div>
                        <p className="font-bold text-lg">What is flashloanstudio.io?</p>
                        <p>flashloanstudio.io is a decentralized arbitrage trading platform that helps you profit from price differences across different decentralized exchanges (DEXs). Our platform automates the process of finding and executing profitable arbitrage opportunities.</p>
                    </div>
                    <div>
                        <p className="font-bold text-lg">How it works:</p>
                        <ul className="list-disc list-inside space-y-1 pl-4">
                            <li><strong>Network Selection:</strong> Choose your preferred blockchain network (Ethereum, Arbitrum, Polygon, etc.)</li>
                            <li><strong>Borrowing Protocol:</strong> Select a lending protocol to borrow funds for larger arbitrage opportunities</li>
                            <li><strong>DEX Selection:</strong> Pick two exchanges where you want to execute the arbitrage trade</li>
                            <li><strong>Token Pair:</strong> Choose which cryptocurrencies you want to arbitrage between</li>
                            <li><strong>Amount Entry:</strong> Enter how much you want to trade, or set your gas budget first</li>
                            <li><strong>Profit Calculation:</strong> The platform automatically calculates potential profits minus gas fees</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-bold text-lg">Smart Gas Fee System:</p>
                        <p>Our platform features an intelligent gas fee calculator that works two ways:</p>
                        <ul className="list-disc list-inside space-y-1 pl-4">
                            <li>Enter your trade amounts first → See calculated gas fees</li>
                            <li>Set your gas budget first → Get suggested trade amounts that fit your budget</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-bold text-lg">Risk Warning:</p>
                        <p>Arbitrage trading involves financial risk. Always do your own research and never invest more than you can afford to lose. Gas fees and market volatility can affect profitability.</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => router.push('/arbitrage')} className="w-full h-12 text-lg font-bold">
                        Return to Main Page
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
