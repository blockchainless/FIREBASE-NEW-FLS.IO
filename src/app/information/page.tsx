"use client";

import { useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
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
                <CardContent className="flex-grow p-0 flex flex-col min-h-0">
                    <div className="flex-grow border-2 border-primary/50 rounded-md mx-6 my-2">
                        <ScrollArea className="h-full no-scrollbar">
                            <div className="p-6 text-foreground/90">
                                {/* Content will be added here later */}
                            </div>
                        </ScrollArea>
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
