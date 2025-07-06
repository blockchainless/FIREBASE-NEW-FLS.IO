import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ArbitragePage() {
  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      <Card className="bg-black/50 backdrop-blur-sm border-2 border-primary shadow-neon-blue">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Arbitrage Desk</CardTitle>
          <CardDescription className="text-muted-foreground pt-2">
            Select your assets and execute a trade.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="from-asset">From</Label>
              <Select defaultValue="btc">
                <SelectTrigger id="from-asset" className="h-12 text-lg bg-black/30 focus:bg-black/50">
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                  <SelectItem value="sol">Solana (SOL)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="from-amount">Amount</Label>
              <Input id="from-amount" placeholder="0.00" type="number" className="h-12 text-lg bg-black/30 focus:bg-black/50" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="to-asset">To</Label>
              <Select defaultValue="usdt">
                <SelectTrigger id="to-asset" className="h-12 text-lg bg-black/30 focus:bg-black/50">
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usdt">Tether (USDT)</SelectItem>
                  <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                  <SelectItem value="dai">Dai (DAI)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="to-amount">Amount</Label>
              <Input id="to-amount" placeholder="0.00" readOnly className="h-12 text-lg bg-black/30 focus:bg-black/50" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full h-14 text-lg font-bold transition-all duration-300 hover:shadow-neon-red">
            Execute Trade
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
