"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ArbitrageSelect = ({ value, onValueChange, options, placeholder }) => (
  <Select value={value} onValueChange={onValueChange}>
    <SelectTrigger className="h-12 text-base bg-black/30 focus:bg-black/50 transition-colors">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
    </SelectContent>
  </Select>
);

export default function ArbitragePage() {
  const router = useRouter();

  const initial_state = {
    network: 'ethereum',
    lender: 'balancer-v2',
    fromSwap: 'uniswap',
    toSwap: 'sushiswap',
    fromCoin: 'USDT',
    toCoin: 'USDC',
    fromAmount: '',
    toAmount: '',
    gasFeeInput: '',
  };

  const [network, setNetwork] = useState(initial_state.network);
  const [lender, setLender] = useState(initial_state.lender);
  const [fromSwap, setFromSwap] = useState(initial_state.fromSwap);
  const [toSwap, setToSwap] = useState(initial_state.toSwap);
  const [fromCoin, setFromCoin] = useState(initial_state.fromCoin);
  const [toCoin, setToCoin] = useState(initial_state.toCoin);
  const [fromAmount, setFromAmount] = useState(initial_state.fromAmount);
  const [toAmount, setToAmount] = useState(initial_state.toAmount);
  const [gasFeeInput, setGasFeeInput] = useState(initial_state.gasFeeInput);
  
  const [gasFeeDisplay, setGasFeeDisplay] = useState('0.00');
  const [estimatedProfit, setEstimatedProfit] = useState('0.00');
  const [showGasFeeInput, setShowGasFeeInput] = useState(true);
  const [executeClicked, setExecuteClicked] = useState(false);

  const calculateFeesAndProfit = useCallback(() => {
    let currentGasFee = 0;
    const amount = parseFloat(fromAmount) || parseFloat(toAmount) || 0;

    if (!showGasFeeInput) {
        let networkFee = 0;
        if (network === 'ethereum') networkFee = 50;
        else if (['arbitrum', 'optimism'].includes(network)) networkFee = 5;
        else if (network === 'polygon') networkFee = 1;
        else networkFee = 10;
        
        const dexFee = (fromSwap && toSwap && amount > 0) ? ((fromSwap === 'uniswap' || toSwap === 'uniswap') ? 0.003 * amount : 0.002 * amount) : 0;
        currentGasFee = networkFee + dexFee;
        setGasFeeDisplay(currentGasFee.toFixed(2));
    } else {
        currentGasFee = parseFloat(gasFeeInput) || 0;
    }

    let priceDiff = 0;
    if (fromCoin && toCoin && fromCoin !== toCoin) {
        priceDiff = (fromSwap === 'uniswap' && toSwap === 'sushiswap') ? 0.05 : 0.03;
    }
    const grossProfit = amount * priceDiff;
    const netProfit = grossProfit - currentGasFee;
    setEstimatedProfit(netProfit.toFixed(2));
  }, [fromAmount, toAmount, network, fromSwap, toSwap, fromCoin, toCoin, gasFeeInput, showGasFeeInput]);

  useEffect(() => {
    calculateFeesAndProfit();
  }, [calculateFeesAndProfit]);

  const handleAmountChange = (value, type) => {
    const controlledValue = value.replace(/[^0-9.]/g, '');
    const setter = type === 'from' ? setFromAmount : setToAmount;
    setter(controlledValue);
    
    if (controlledValue) {
      setShowGasFeeInput(false);
    } else if ((type === 'from' && !toAmount) || (type === 'to' && !fromAmount)) {
      setShowGasFeeInput(true);
      setGasFeeInput('');
    }
  };

  const handleGasFeeInputChange = (value) => {
    const controlledValue = value.replace(/[^0-9.]/g, '');
    setGasFeeInput(controlledValue);
  };

  const handleGasFeeBlur = () => {
    const gasFee = parseFloat(gasFeeInput) || 0;
    if (gasFee > 0 && !fromAmount && !toAmount) {
      const arbitrageAmount = Math.round(gasFee * 100);
      setFromAmount(String(arbitrageAmount));
      setToAmount(String(arbitrageAmount));
      setShowGasFeeInput(false);
    }
  };

  const resetForm = () => {
      setNetwork(initial_state.network);
      setLender(initial_state.lender);
      setFromSwap(initial_state.fromSwap);
      setToSwap(initial_state.toSwap);
      setFromCoin(initial_state.fromCoin);
      setToCoin(initial_state.toCoin);
      setFromAmount(initial_state.fromAmount);
      setToAmount(initial_state.toAmount);
      setGasFeeInput(initial_state.gasFeeInput);
      setShowGasFeeInput(true);
      setExecuteClicked(false);
  }

  const handleExecute = () => {
    if (!executeClicked) {
        alert('Arbitrage executed! (Simulated)');
        setExecuteClicked(true);
    } else {
        resetForm();
    }
  };

  const networkOptions = [
      { value: 'ethereum', label: 'Ethereum' }, { value: 'arbitrum', label: 'Arbitrum' },
      { value: 'polygon', label: 'Polygon' }, { value: 'optimism', label: 'Optimism' },
      { value: 'bsc', label: 'Binance Smart Chain' }, { value: 'avalanche', label: 'Avalanche' },
      { value: 'fantom', label: 'Fantom' }, { value: 'cronos', label: 'Cronos' },
      { value: 'base', label: 'Base' }, { value: 'solana', label: 'Solana' },
  ];
  const lenderOptions = [
      { value: 'balancer-v2', label: 'Balancer V2' }, { value: 'balancer-v3', label: 'Balancer V3' },
      { value: 'balancer', label: 'Balancer' }, { value: 'aave-ark', label: 'Aave ARK' },
      { value: 'aave-v2', label: 'Aave V2' }, { value: 'aave-v3', label: 'Aave V3' },
      { value: 'uniswap-v1', label: 'Uniswap V1' }, { value: 'uniswap-v2', label: 'Uniswap V2' },
      { value: 'uniswap-v3', label: 'Uniswap V3' }, { value: 'uniswap-v4', label: 'Uniswap V4' },
  ];
  const fromSwapOptions = [
      { value: 'uniswap', label: 'Uniswap' }, { value: 'sushiswap', label: 'Sushiswap' },
      { value: 'kyberswap', label: 'Kyberswap' }, { value: 'pancakeswap', label: 'Pancakeswap' },
  ];
  const toSwapOptions = [
      { value: 'sushiswap', label: 'Sushiswap' }, { value: 'coreswap', label: 'Coreswap' },
      { value: 'linxswap', label: 'Linxswap' }, { value: 'doxswap', label: 'Doxswap' },
      { value: 'optimumswap', label: 'Optimumswap' },
  ];
  const coinOptions = [
      { value: 'USDT', label: 'USDT' }, { value: 'USDC', label: 'USDC' },
      { value: 'ETH', label: 'ETH' }, { value: 'WETH', label: 'WETH' },
      { value: 'WBTC', label: 'WBTC' }, { value: 'BTC', label: 'BTC' },
      { value: 'DOX', label: 'DOX' }, { value: 'LINX', label: 'LINX' },
      { value: 'MAGIC', label: 'MAGIC' },
  ];

  return (
    <div className="w-full max-w-sm mx-auto animate-fade-in">
      <Card className="bg-black/50 backdrop-blur-sm border-2 border-primary shadow-neon-blue h-[920px]">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">flashloanstudio.io</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ArbitrageSelect value={network} onValueChange={setNetwork} options={networkOptions} placeholder="Select Network Provider" />
          <ArbitrageSelect value={lender} onValueChange={setLender} options={lenderOptions} placeholder="Select Borrow Lender" />
          <ArbitrageSelect value={fromSwap} onValueChange={setFromSwap} options={fromSwapOptions} placeholder="Arbitrage From Swap" />
          <ArbitrageSelect value={toSwap} onValueChange={setToSwap} options={toSwapOptions} placeholder="Arbitrage To Swap" />
          <ArbitrageSelect value={fromCoin} onValueChange={setFromCoin} options={coinOptions} placeholder="Arbitrage Coin From" />
          <ArbitrageSelect value={toCoin} onValueChange={setToCoin} options={coinOptions} placeholder="Arbitrage Coin To" />

          <Input type="text" value={fromAmount} onChange={(e) => handleAmountChange(e.target.value, 'from')} placeholder="Enter amount" className="h-12 text-lg bg-black/30 focus:bg-black/50 transition-colors text-center" />
          <Input type="text" value={toAmount} onChange={(e) => handleAmountChange(e.target.value, 'to')} placeholder="Enter amount" className="h-12 text-lg bg-black/30 focus:bg-black/50 transition-colors text-center" />
          
          {showGasFeeInput ? (
             <Input 
                type="text" 
                value={gasFeeInput} 
                onChange={(e) => handleGasFeeInputChange(e.target.value)} 
                onBlur={handleGasFeeBlur}
                placeholder="Enter gas fee (USD)" 
                className="h-12 text-lg bg-black/30 focus:bg-black/50 transition-colors text-center" 
             />
          ) : (
             <Label className="block text-center w-full p-3 h-12 border rounded-md bg-black/30 border-primary shadow-neon-blue">Gas Fee: ${gasFeeDisplay}</Label>
          )}

          <Label className="block text-center w-full p-3 h-12 border rounded-md bg-black/30 border-primary shadow-neon-blue">Estimated Arbitrage Profit: ${estimatedProfit}</Label>
          
          <Button onClick={handleExecute} className="w-full h-14 text-lg font-bold transition-all duration-300 hover:shadow-neon-red">
            {executeClicked ? 'Reset' : 'Execute'}
          </Button>

          <Button onClick={() => router.push('/information')} variant="outline" className="w-full h-12 text-lg">
            Information
          </Button>

        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center pt-2 space-y-2">
           <Button
            variant="ghost"
            onClick={() => router.push('/login')}
            className="text-xs text-muted-foreground hover:bg-transparent hover:text-foreground p-0 h-auto"
          >
            All right reserved
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
