"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function InformationPage() {
    const router = useRouter();

    return (
        <div className="w-full max-w-sm mx-auto animate-fade-in">
            <Card className="bg-black/50 backdrop-blur-sm border-2 border-primary shadow-neon-blue flex flex-col h-[920px]">
                <CardHeader>
                    <CardTitle className="text-3xl text-center font-headline">Information</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow p-6 pt-0 flex flex-col min-h-0">
                    <div className="flex-1 border-2 border-primary/50 rounded-md overflow-y-auto no-scrollbar">
                        <div className="p-6 text-foreground/90 space-y-4">
                                <div>
                                    <p className="font-bold text-lg">What is FlashLoanStudio.io?</p>
                                    <p>FlashLoanStudio.io is an advanced decentralized finance (DeFi) arbitrage trading platform designed to empower users to capitalize on price discrepancies across various decentralized exchanges (DEXs). By leveraging cutting-edge automation, FlashLoanStudio.io identifies and executes profitable arbitrage opportunities seamlessly, making it accessible for both novice and experienced traders to maximize their returns in the dynamic world of DeFi.</p>
                                </div>
                                <div>
                                    <p className="font-bold text-lg">How FlashLoanStudio.io Works:</p>
                                    <p>FlashLoanStudio.io streamlines the arbitrage process through a user-friendly interface and robust backend technology. Below is a detailed breakdown of the steps involved in using the platform:</p>
                                    <ul className="list-disc list-inside space-y-1 pl-4">
                                    <li><strong>Network Selection:</strong> Choose from a variety of supported blockchain networks, including Ethereum, Arbitrum, Polygon, Binance Smart Chain, and more, to execute your trades on the network that best suits your strategy.</li>
                                    <li><strong>Borrowing Protocol:</strong> Select a trusted lending protocol to access flash loans, enabling you to borrow funds instantly without collateral to amplify your arbitrage opportunities and potential profits.</li>
                                    <li><strong>DEX Selection:</strong> Pick two decentralized exchanges (e.g., Uniswap, SushiSwap, or PancakeSwap) where price differences for your chosen token pair exist, allowing the platform to execute trades across these venues.</li>
                                    <li><strong>Token Pair:</strong> Specify the cryptocurrency pair (e.g., ETH/USDT, DAI/USDC) you wish to arbitrage, tailoring your trades to market opportunities and your investment preferences.</li>
                                    <li><strong>Amount Entry:</strong> Input the desired trade amount or set a gas budget to ensure your trades align with your financial goals and risk tolerance.</li>
                                    <li><strong>Profit Calculation:</strong> FlashLoanStudio.io’s sophisticated algorithm automatically calculates potential profits by factoring in price differences, gas fees, and other transaction costs, providing you with a clear estimate of your expected returns.</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-bold text-lg">Smart Gas Fee System:</p>
                                    <p>FlashLoanStudio.io features an innovative gas fee optimization system designed to maximize profitability while accommodating user preferences. The system operates in two flexible modes:</p>
                                    <ul className="list-disc list-inside space-y-1 pl-4">
                                    <li><strong>Trade-First Mode:</strong> Enter your desired trade amounts, and the platform will calculate the associated gas fees, ensuring transparency and helping you understand the cost implications of your trades.</li>
                                    <li><strong>Budget-First Mode:</strong> Set a gas budget upfront, and FlashLoanStudio.io will recommend optimal trade amounts that fit within your specified budget, allowing you to control costs while pursuing profitable opportunities.</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-bold text-lg">Risk Warning:</p>
                                    <p>While FlashLoanStudio.io provides powerful tools for arbitrage trading, it’s important to recognize that all DeFi activities carry inherent financial risks. Market volatility, gas fee fluctuations, and smart contract vulnerabilities can impact profitability. We strongly recommend conducting thorough research, understanding the risks involved, and only investing funds you can afford to lose. Always exercise caution and due diligence when engaging in arbitrage trading.</p>
                                </div>
                                <div>
                                    <p className="font-bold text-lg">Why Choose FlashLoanStudio.io?</p>
                                    <p>FlashLoanStudio.io stands out as a premier DeFi arbitrage platform due to its intuitive design, robust automation, and commitment to user empowerment. Whether you’re looking to execute small-scale trades or leverage flash loans for larger opportunities, our platform provides the tools and insights you need to succeed in the fast-paced world of decentralized finance.</p>
                                </div>
                                <div>
                                    <p className="font-bold text-lg">Contact Us:</p>
                                    <p>If you have any questions, feedback, or need assistance, you can reach out to the FlashLoanStudio.io development team by sending an email to <a href="mailto:flashloanstudio@arbitrage.io">flashloanstudio@arbitrage.io</a>. We’re here to help you navigate the platform and make the most of your DeFi arbitrage experience.</p>
                                </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="pt-6">
                    <Button onClick={() => router.push('/arbitrage')} className="w-full h-12 text-lg font-bold">
                        Return to Main Page
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
