
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
    toCoin: 'WETH',
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

  // --- MOCK DATA FOR SIMULATION ---
  const coinPrices = {
    'USDT': 1, 'USDC': 1, 'ETH': 2500, 'WETH': 2500, 'WBTC': 50000,
    'BTC': 50000, 'DOX': 0.1, 'LINX': 0.5, 'MAGIC': 2,
  };

  const dexPriceFactors = {
    'uniswap': 1.0, 'sushiswap': 1.001, 'kyberswap': 0.999, 
    'pancakeswap': 1.0, 'coreswap': 1.002, 'linxswap': 1.0015,
    'doxswap': 0.998, 'optimumswap': 1.0005,
  };

  const lenderFees = {
    'balancer-v2': 0, 'balancer-v3': 0, 'balancer': 0, 
    'aave-ark': 0.0005, 'aave-v2': 0.0009, 'aave-v3': 0.0005,
    'uniswap-v1': 0.003, 'uniswap-v2': 0.003, 'uniswap-v3': 0.003, 'uniswap-v4': 0.003,
  };

  const dexFees = {
    'uniswap': 0.003, 'sushiswap': 0.003, 'kyberswap': 0.0025, 
    'pancakeswap': 0.0025, 'coreswap': 0.003, 'linxswap': 0.003,
    'doxswap': 0.004, 'optimumswap': 0.002,
  };
  // --------------------------------

  const calculateFeesAndProfit = useCallback(() => {
    const principal = parseFloat(fromAmount);
    if (!principal || !fromCoin || !toCoin || !fromSwap || !toSwap || !lender) {
      setEstimatedProfit('0.00');
      return;
    }

    // 1. Calculate price spread and gross profit
    const fromCoinPrice = coinPrices[fromCoin] || 1;
    const toCoinPrice = coinPrices[toCoin] || 1;

    const priceToCoinOnFromSwap = toCoinPrice * (dexPriceFactors[fromSwap] || 1);
    const priceToCoinOnToSwap = toCoinPrice * (dexPriceFactors[toSwap] || 1);

    const fromSwapFee = dexFees[fromSwap] || 0;
    const toSwapFee = dexFees[toSwap] || 0;
    
    const principalValue = principal * fromCoinPrice;
    
    const intermediateToCoin = principalValue / priceToCoinOnFromSwap;
    const intermediateToCoinAfterFee = intermediateToCoin * (1 - fromSwapFee);
    
    const returnValueUSD = intermediateToCoinAfterFee * priceToCoinOnToSwap;
    const returnValueUSDAfterFee = returnValueUSD * (1 - toSwapFee);

    const grossProfit = returnValueUSDAfterFee - principalValue;

    // 2. Calculate fees
    const currentLenderFee = principalValue * (lenderFees[lender] || 0);

    let currentGasFee = 0;
    if (showGasFeeInput) {
      currentGasFee = parseFloat(gasFeeInput) || 0;
    } else {
      let networkFee = 0;
      if (network === 'ethereum') networkFee = 50;
      else if (['arbitrum', 'optimism'].includes(network)) networkFee = 5;
      else if (network === 'polygon') networkFee = 1;
      else networkFee = 10;
      currentGasFee = networkFee;
      setGasFeeDisplay(currentGasFee.toFixed(2));
    }
    
    const netProfit = grossProfit - currentLenderFee - currentGasFee;
    setEstimatedProfit(netProfit.toFixed(2));

  }, [fromAmount, network, lender, fromSwap, toSwap, fromCoin, toCoin, gasFeeInput, showGasFeeInput]);

  useEffect(() => {
    calculateFeesAndProfit();
  }, [calculateFeesAndProfit]);

  const handleAmountChange = (value, type) => {
    const controlledValue = value.replace(/[^0-9.]/g, '');
    const amount = parseFloat(controlledValue) || 0;

    if (type === 'from') {
      setFromAmount(controlledValue);
      if (amount > 0 && fromCoin && toCoin && coinPrices[fromCoin] && coinPrices[toCoin]) {
        const toAmountValue = (amount * coinPrices[fromCoin]) / coinPrices[toCoin];
        setToAmount(toAmountValue.toFixed(6));
      } else {
        setToAmount('');
      }
    } else { // type === 'to'
      setToAmount(controlledValue);
      if (amount > 0 && fromCoin && toCoin && coinPrices[fromCoin] && coinPrices[toCoin]) {
        const fromAmountValue = (amount * coinPrices[toCoin]) / coinPrices[fromCoin];
        setFromAmount(fromAmountValue.toFixed(2));
      } else {
        setFromAmount('');
      }
    }
    
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
    const gasFee = parseFloat(controlledValue) || 0;

    if (showGasFeeInput && gasFee > 0 && fromCoin && toCoin && fromSwap && toSwap && lender) {
      const fromCoinPrice = coinPrices[fromCoin] || 1;
      const toCoinPrice = coinPrices[toCoin] || 1;
      const priceToCoinOnFromSwap = toCoinPrice * (dexPriceFactors[fromSwap] || 1);
      const priceToCoinOnToSwap = toCoinPrice * (dexPriceFactors[toSwap] || 1);
      const fromSwapFee = dexFees[fromSwap] || 0;
      const toSwapFee = dexFees[toSwap] || 0;
      const currentLenderFeeRate = lenderFees[lender] || 0;

      const grossProfitRate = (priceToCoinOnToSwap / priceToCoinOnFromSwap) * (1 - fromSwapFee) * (1 - toSwapFee) - 1;
      const effectiveProfitRate = grossProfitRate - currentLenderFeeRate;

      if (effectiveProfitRate > 0) {
        const requiredPrincipal = (gasFee + 1) / effectiveProfitRate; // Target $1 profit
        const requiredFromAmount = requiredPrincipal / fromCoinPrice;
        
        setFromAmount(requiredFromAmount.toFixed(2));
        const toAmountValue = (requiredFromAmount * coinPrices[fromCoin]) / coinPrices[toCoin];
        setToAmount(toAmountValue.toFixed(6));
      } else {
        setFromAmount('');
        setToAmount('');
      }
    } else if (gasFee === 0) {
      setFromAmount('');
      setToAmount('');
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
          <Input type="text" value={toAmount} onChange={(e) => handleAmountChange(e.target.value, 'to')} placeholder="Calculated amount" className="h-12 text-lg bg-black/30 focus:bg-black/50 transition-colors text-center" />
          
          {showGasFeeInput ? (
             <Input 
                type="text" 
                value={gasFeeInput} 
                onChange={(e) => handleGasFeeInputChange(e.target.value)}
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
