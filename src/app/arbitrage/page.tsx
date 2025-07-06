
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

// --- LENDER DATA ---
const protocolData = {
  'aave-v3': {
    name: "Aave V3",
    fee: 0.0005,
    tokens: { "USDC": 1.00, "USDT": 1.00, "ETH": 2563, "WETH": 2641, "BTC": 100500, "WBTC": 103515 }
  },
  'balancer-v3': {
    name: "Balancer V3",
    fee: 0.001,
    tokens: { "USDC": 1.00, "USDT": 1.00, "ETH": 2576, "WETH": 2653, "BTC": 101000, "WBTC": 104030 }
  },
  'uniswap-v3': {
    name: "Uniswap V3",
    fee: 0.0015,
    tokens: { "USDC": 1.00, "USDT": 1.00, "ETH": 2588, "WETH": 2666, "BTC": 101500, "WBTC": 104545 }
  },
  'bancor-v3': {
    name: "Bancor V3",
    fee: 0.0,
    tokens: { "USDC": 1.00, "USDT": 1.00, "ETH": 2601, "WETH": 2679, "BTC": 102000, "WBTC": 105060 }
  }
};

// --- DEX DATA (Buy Low) ---
const fromDexData = {
  'uniswap-v3': {
    name: "Uniswap V3",
    fee: 0.0065,
    tokens: { "USDC": 1.00, "USDT": 1.00, "ETH": 2550, "WETH": 2630, "BTC": 100000, "WBTC": 103000 }
  },
  'sushiswap': {
    name: "Sushiswap",
    fee: 0.008,
    tokens: { "USDC": 1.00, "USDT": 1.00, "ETH": 2570, "WETH": 2650, "BTC": 100020, "WBTC": 103020 }
  },
  'kyberswap': {
    name: "Kyberswap",
    fee: 0.006,
    tokens: { "USDC": 1.00, "USDT": 1.00, "ETH": 2590, "WETH": 2670, "BTC": 100040, "WBTC": 103040 }
  },
  'pancakeswap': {
    name: "Pancakeswap",
    fee: 0.0075,
    tokens: { "USDC": 1.00, "USDT": 1.00, "ETH": 2610, "WETH": 2690, "BTC": 100060, "WBTC": 103060 }
  }
};

// --- DEX DATA (Sell High) ---
const toDexData = {
    'apeswap': {
      name: "ApeSwap",
      fee: 0.007,
      tokens: { "USDC": 1.00, "USDT": 1.00, "ETH": 3978, "WETH": 4098, "BTC": 156000, "WBTC": 160680 }
    },
    '1inch': {
      name: "1inch",
      fee: 0.0085,
      tokens: { "USDC": 1.00, "USDT": 1.00, "ETH": 4009, "WETH": 4130, "BTC": 156031, "WBTC": 160713 }
    },
    '0x-protocol': {
      name: "0x Protocol",
      fee: 0.0065,
      tokens: { "USDC": 1.00, "USDT": 1.00, "ETH": 4040, "WETH": 4161, "BTC": 156062, "WBTC": 160744 }
    },
    'quickswap': {
      name: "Quickswap",
      fee: 0.008,
      tokens: { "USDC": 1.00, "USDT": 1.00, "ETH": 4072, "WETH": 4194, "BTC": 156094, "WBTC": 160776 }
    }
};
// --------------------------------

export default function ArbitragePage() {
  const router = useRouter();

  const initial_state = {
    network: 'ethereum',
    lender: 'aave-v3',
    fromSwap: 'uniswap-v3',
    toSwap: '1inch',
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
  
  const [estimatedProfit, setEstimatedProfit] = useState('0.00');
  const [executeClicked, setExecuteClicked] = useState(false);

  const handleRecalculate = useCallback((source: 'from' | 'to' | 'gas' | 'init', value: string) => {
    const controlledValue = value.replace(/[^0-9.]/g, '');

    const selectedLender = protocolData[lender];
    const selectedFromSwap = fromDexData[fromSwap];
    const selectedToSwap = toDexData[toSwap];

    if (!fromCoin || !toCoin || !selectedLender || !selectedFromSwap || !selectedToSwap) {
      if (source === 'from') setFromAmount(controlledValue);
      if (source === 'to') setToAmount(controlledValue);
      if (source === 'gas') setGasFeeInput(controlledValue);
      return;
    }

    const priceFromCoin_Lender = selectedLender.tokens[fromCoin];
    const priceFromCoin_FromSwap = selectedFromSwap.tokens[fromCoin];
    const priceToCoin_FromSwap = selectedFromSwap.tokens[toCoin];
    const priceFromCoin_ToSwap = selectedToSwap.tokens[fromCoin];
    const priceToCoin_ToSwap = selectedToSwap.tokens[toCoin];
    const lenderFeeRate = selectedLender.fee;
    const fromSwapFee = selectedFromSwap.fee;
    const toSwapFee = selectedToSwap.fee;

    if (!priceFromCoin_Lender || !priceFromCoin_FromSwap || !priceToCoin_FromSwap || !priceFromCoin_ToSwap || !priceToCoin_ToSwap) {
      setFromAmount('');
      setToAmount('');
      setGasFeeInput('');
      setEstimatedProfit('0.00');
      return;
    }

    if (source === 'from') {
      setFromAmount(controlledValue);
      const principal = parseFloat(controlledValue);
      if (!principal || principal <= 0) {
        setToAmount('');
        setGasFeeInput('');
        setEstimatedProfit('0.00');
        return;
      }
      const amountOfToCoin = (principal * priceFromCoin_FromSwap) / priceToCoin_FromSwap;
      const amountOfToCoinAfterFee = amountOfToCoin * (1 - fromSwapFee);
      const endValueUSD = amountOfToCoinAfterFee * priceToCoin_ToSwap;
      const endAmountOfFromCoin = endValueUSD / priceFromCoin_ToSwap;
      const endAmountOfFromCoinAfterFee = endAmountOfFromCoin * (1 - toSwapFee);
      const grossProfitInFromCoin = endAmountOfFromCoinAfterFee - principal;
      const grossProfitUSD = grossProfitInFromCoin * priceFromCoin_Lender;
      const principalValueUSD = principal * priceFromCoin_Lender;
      const lenderFeeUSD = principalValueUSD * lenderFeeRate;
      const breakevenGas = grossProfitUSD - lenderFeeUSD;
      
      setToAmount(amountOfToCoin.toFixed(6));
      if (breakevenGas > 0) {
        setGasFeeInput(breakevenGas.toFixed(2));
        setEstimatedProfit('0.00');
      } else {
        setGasFeeInput('0.00');
        setEstimatedProfit(breakevenGas.toFixed(2));
      }
    } else if (source === 'to') {
      setToAmount(controlledValue);
      const receivedAmount = parseFloat(controlledValue);
      if (!receivedAmount || receivedAmount <= 0) {
        setFromAmount('');
        setGasFeeInput('');
        setEstimatedProfit('0.00');
        return;
      }
      const principal = (receivedAmount * priceToCoin_FromSwap) / priceFromCoin_FromSwap;
      const amountOfToCoinAfterFee = receivedAmount * (1 - fromSwapFee);
      const endValueUSD = amountOfToCoinAfterFee * priceToCoin_ToSwap;
      const endAmountOfFromCoin = endValueUSD / priceFromCoin_ToSwap;
      const endAmountOfFromCoinAfterFee = endAmountOfFromCoin * (1 - toSwapFee);
      const grossProfitInFromCoin = endAmountOfFromCoinAfterFee - principal;
      const grossProfitUSD = grossProfitInFromCoin * priceFromCoin_Lender;
      const principalValueUSD = principal * priceFromCoin_Lender;
      const lenderFeeUSD = principalValueUSD * lenderFeeRate;
      const breakevenGas = grossProfitUSD - lenderFeeUSD;
      
      setFromAmount(principal.toFixed(2));
      if (breakevenGas > 0) {
        setGasFeeInput(breakevenGas.toFixed(2));
        setEstimatedProfit('0.00');
      } else {
        setGasFeeInput('0.00');
        setEstimatedProfit(breakevenGas.toFixed(2));
      }
    } else if (source === 'gas') {
      setGasFeeInput(controlledValue);
      const gasFee = parseFloat(controlledValue);
      if (!(gasFee >= 0)) {
        if (controlledValue === '') {
          setFromAmount('');
          setToAmount('');
        }
        setEstimatedProfit('0.00');
        return;
      }
      const grossProfitRateInFromCoin = ((priceFromCoin_FromSwap / priceToCoin_FromSwap) * (priceToCoin_ToSwap / priceFromCoin_ToSwap) * (1 - fromSwapFee) * (1 - toSwapFee)) - 1;
      const effectiveProfitRate = grossProfitRateInFromCoin - lenderFeeRate;

      if (effectiveProfitRate > 0) {
        const requiredPrincipal = (gasFee / priceFromCoin_Lender) / effectiveProfitRate;
        setFromAmount(requiredPrincipal.toFixed(2));
        const toAmountValue = (requiredPrincipal * priceFromCoin_FromSwap) / priceToCoin_FromSwap;
        setToAmount(toAmountValue.toFixed(6));

        const amountOfToCoinAfterFee = toAmountValue * (1 - fromSwapFee);
        const endValueUSD = amountOfToCoinAfterFee * priceToCoin_ToSwap;
        const endAmountOfFromCoin = endValueUSD / priceFromCoin_ToSwap;
        const endAmountOfFromCoinAfterFee = endAmountOfFromCoin * (1 - toSwapFee);
        const grossProfitInFromCoin = endAmountOfFromCoinAfterFee - requiredPrincipal;
        const grossProfitUSD = grossProfitInFromCoin * priceFromCoin_Lender;
        const principalValueUSD = requiredPrincipal * priceFromCoin_Lender;
        const lenderFeeUSD = principalValueUSD * lenderFeeRate;
        const netProfit = grossProfitUSD - lenderFeeUSD - gasFee;
        setEstimatedProfit(netProfit.toFixed(2));
      } else {
        setFromAmount('');
        setToAmount('');
        setEstimatedProfit('0.00');
      }
    }
  }, [fromCoin, toCoin, lender, fromSwap, toSwap]);
  
  useEffect(() => {
    if (fromAmount) {
      handleRecalculate('from', fromAmount);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network, lender, fromSwap, toSwap, fromCoin, toCoin]);


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
      setEstimatedProfit('0.00');
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
  const lenderOptions = Object.entries(protocolData).map(([key, { name }]) => ({ value: key, label: name }));

  const fromDexOptions = Object.entries(fromDexData).map(([key, { name }]) => ({ value: key, label: name }));
  const toDexOptions = Object.entries(toDexData).map(([key, { name }]) => ({ value: key, label: name }));

  const coinOptions = [
      { value: 'USDT', label: 'USDT' }, { value: 'USDC', label: 'USDC' },
      { value: 'ETH', label: 'ETH' }, { value: 'WETH', label: 'WETH' },
      { value: 'WBTC', label: 'WBTC' }, { value: 'BTC', label: 'BTC' },
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
          <ArbitrageSelect value={fromSwap} onValueChange={setFromSwap} options={fromDexOptions} placeholder="Arbitrage From Swap" />
          <ArbitrageSelect value={toSwap} onValueChange={setToSwap} options={toDexOptions} placeholder="Arbitrage To Swap" />
          <ArbitrageSelect value={fromCoin} onValueChange={setFromCoin} options={coinOptions} placeholder="Arbitrage Coin From" />
          <ArbitrageSelect value={toCoin} onValueChange={setToCoin} options={coinOptions} placeholder="Arbitrage Coin To" />

          <Input type="text" value={fromAmount} onChange={(e) => handleRecalculate('from', e.target.value)} placeholder="Enter amount" className="h-12 text-lg bg-black/30 focus:bg-black/50 transition-colors text-center" />
          <Input type="text" value={toAmount} onChange={(e) => handleRecalculate('to', e.target.value)} placeholder="Calculated amount" className="h-12 text-lg bg-black/30 focus:bg-black/50 transition-colors text-center" />
          
           <Input 
              type="text" 
              value={gasFeeInput} 
              onChange={(e) => handleRecalculate('gas', e.target.value)}
              placeholder="Enter gas fee (USD)" 
              className="h-12 text-lg bg-black/30 focus:bg-black/50 transition-colors text-center" 
           />

          <Label className="block text-center w-full p-3 h-12 border rounded-md bg-black/30 border-primary shadow-neon-blue leading-6">Estimated Arbitrage Profit: ${estimatedProfit}</Label>
          
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
