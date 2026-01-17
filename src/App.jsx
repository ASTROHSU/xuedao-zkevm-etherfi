import React, { useState, useEffect } from 'react';
import { 
  CreditCard, ArrowRight, Zap, Shield, TrendingUp, Wallet, 
  History, ChevronRight, Activity, BookOpen, ChevronLeft, 
  Pizza, AlertTriangle, Layers, XCircle, Coins, ArrowDown, 
  QrCode, Store, Smartphone, Globe, Lock, CheckCircle, 
  Landmark, RefreshCw, AlertCircle, Banknote 
} from 'lucide-react';

// --- Components ---

const ProcessStep = ({ icon: Icon, title, sub, isLast = false, isBad = false }) => (
  <div className="flex flex-col items-center relative z-10 group w-full md:w-auto">
    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg transition-all duration-300 ${
      isBad 
        ? 'bg-red-500/10 border border-red-500/30 text-red-400 group-hover:bg-red-500/20' 
        : 'bg-gray-800 border border-gray-700 text-purple-400 group-hover:border-purple-500'
    }`}>
      <Icon className="w-6 h-6 md:w-8 md:h-8" />
    </div>
    <h4 className="font-bold text-white text-lg md:text-xl text-center mb-2">{title}</h4>
    <p className="text-sm md:text-base text-gray-400 text-center max-w-[200px] md:max-w-[160px] leading-snug">{sub}</p>
    
    {!isLast && (
      <div className="hidden md:block absolute top-1/2 -right-1/2 w-full h-[2px] bg-gray-700 -z-10 transform -translate-y-1/2"></div>
    )}
    {!isLast && (
       <div className="md:hidden my-4 text-gray-600 animate-bounce">
        <ArrowDown className="w-6 h-6" />
      </div>
    )}
  </div>
);

const AnatomyPart = ({ icon: Icon, title, desc, position, color = "purple" }) => {
  const colorClasses = {
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    green: "text-green-400 bg-green-500/10 border-green-500/30",
    yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30"
  };

  const lineStyles = {
    "top-left": "bottom-0 right-0 translate-y-full translate-x-1/2 h-16 w-[2px]",
    "top-right": "bottom-0 left-0 translate-y-full -translate-x-1/2 h-16 w-[2px]",
    "bottom-left": "top-0 right-0 -translate-y-full translate-x-1/2 h-16 w-[2px]",
    "bottom-right": "top-0 left-0 -translate-y-full -translate-x-1/2 h-16 w-[2px]",
    "top": "bottom-0 left-1/2 -translate-x-1/2 translate-y-full h-12 w-[2px]",
    "bottom": "top-0 left-1/2 -translate-x-1/2 -translate-y-full h-12 w-[2px]",
    "left": "right-0 top-1/2 -translate-y-1/2 translate-x-full w-8 h-[2px]",
    "right": "left-0 top-1/2 -translate-y-1/2 -translate-x-full w-8 h-[2px]"
  };

  return (
    <div className={`relative p-4 rounded-xl border backdrop-blur-sm ${colorClasses[color]} flex flex-col items-center text-center w-full lg:w-64 z-20 transition-all duration-300`}>
      <div className="mb-2 p-2 rounded-full bg-gray-900/50">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="font-bold text-white text-lg mb-1">{title}</h4>
      <p className="text-xs text-gray-300 leading-relaxed">{desc}</p>
      
      <div className={`hidden lg:block absolute bg-gray-600/50 ${lineStyles[position] || ""}`}>
        <div className="absolute w-2 h-2 bg-white rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_white]"></div>
      </div>
    </div>
  );
};

const TimelineCard = ({ title, era, icon: Icon, mainText, subText, question, answer, theme = "blue" }) => {
  const themes = {
    blue: "from-blue-900/50 to-gray-900 border-blue-500/30 text-blue-400",
    purple: "from-purple-900/50 to-gray-900 border-purple-500/30 text-purple-400",
    yellow: "from-yellow-900/50 to-gray-900 border-yellow-500/30 text-yellow-400",
    green: "from-green-900/50 to-gray-900 border-green-500/30 text-green-400",
  };

  return (
    <div className={`flex flex-col md:flex-row gap-8 items-stretch bg-gradient-to-br ${themes[theme]} p-8 rounded-2xl border w-full max-w-6xl mx-auto min-h-[450px]`}>
      <div className="flex-1 space-y-6 flex flex-col">
        <div>
          <span className="font-mono text-sm tracking-widest opacity-80 mb-2 block">{era}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        </div>
        
        <div className="bg-gray-900/40 p-4 rounded-xl border border-white/5 mb-4">
           <div className="flex items-start gap-3 mb-2">
             <div className="bg-white/10 p-1.5 rounded text-xs font-bold text-white">Q</div>
             <p className="text-gray-300 italic">"{question}"</p>
           </div>
           <div className="flex items-start gap-3">
             <div className={`bg-${theme}-500/20 p-1.5 rounded text-xs font-bold text-${theme}-400`}>A</div>
             <p className={`text-${theme}-200 font-medium`}>{answer}</p>
           </div>
        </div>

        <div className={`p-4 rounded-xl bg-gray-900/50 border border-white/10 flex-grow`}>
          <Icon className="w-10 h-10 mb-3 opacity-80" />
          <p className="text-lg text-gray-200 leading-relaxed font-light">{mainText}</p>
        </div>
      </div>
      
      <div className="flex-1 w-full bg-black/20 p-6 rounded-xl border border-white/5 relative overflow-hidden group flex flex-col">
        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
          <Icon className="w-32 h-32" />
        </div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" /> The Reality
        </h3>
        <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-line flex-grow">
          {subText}
        </p>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 12; // Increased by 1

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  const renderSlide = () => {
    switch(currentSlide) {
      // SLIDE 0: OPENING
      case 0:
        return (
          <div className="flex flex-col justify-center items-center min-h-full py-12 text-center px-4 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs md:text-sm mb-8 md:mb-12">
               XueDAO Meetup • Taipei
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-tight text-white">
              The Furthest Distance<br />
              <span className="text-gray-500 text-2xl md:text-5xl block mt-4 font-normal">
                is between your <span className="text-white">Bitcoin</span> and a <span className="text-white">Coffee</span>.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 px-4">
              這兩端花了 15 年才真正連起來。<br/>
              這是一段關於「支付演變」的故事。
            </p>

            <div className="animate-bounce text-gray-600 mt-8 hidden md:block">
              <span className="text-xs font-mono">PRESS SPACE TO START</span>
            </div>
          </div>
        );

      // SLIDE 1: THE TARGET (NEW)
      case 1:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-12 min-h-full">
            <div className="text-center mb-16">
               <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">THE GOAL</span>
               <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">How it works <span className="text-gray-500">today</span></h2>
               <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                 這就是我們現在追求的終極體驗。<br/>
                 聽起來很簡單：你付加密貨幣，店家收法幣。
               </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 max-w-5xl mx-auto w-full relative">
               <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-purple-900 via-blue-900 to-gray-700 -z-10"></div>
               
               <div className="bg-gray-900 p-8 rounded-2xl border border-purple-500/30 flex flex-col items-center w-full md:w-1/3 z-10 shadow-2xl">
                  <div className="w-20 h-20 bg-purple-900/30 rounded-full flex items-center justify-center mb-6 text-purple-400">
                    <Wallet className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">User</h3>
                  <p className="text-gray-400">Pays Crypto</p>
                  <span className="text-xs font-mono bg-purple-900/50 px-2 py-1 rounded mt-2 text-purple-300">USDC / ETH</span>
               </div>

               <div className="md:w-32 flex flex-col items-center z-10">
                 <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-4 border-gray-900">
                    <Globe className="w-8 h-8 text-white" />
                 </div>
                 <p className="text-blue-400 font-bold mt-2">Visa Net</p>
                 <p className="text-xs text-gray-500">Auto Swap</p>
               </div>

               <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 flex flex-col items-center w-full md:w-1/3 z-10 shadow-2xl">
                  <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6 text-green-400">
                    <Store className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Merchant</h3>
                  <p className="text-gray-400">Receives Fiat</p>
                  <span className="text-xs font-mono bg-gray-800 px-2 py-1 rounded mt-2 text-gray-300">USD / TWD</span>
               </div>
            </div>

            <div className="text-center mt-16 animate-pulse text-gray-500">
               這看似簡單的三步，區塊鏈世界花了 15 年才走完。
            </div>
          </div>
        );

      // SLIDE 2: GEN 0 - BITCOIN PIZZA
      case 2:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 md:py-0 min-h-full overflow-y-auto">
            <div className="mb-8">
              <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 0 (May 22, 2010)</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 flex items-center gap-4 flex-wrap text-white">
                The Day of "No Exchange" <Pizza className="text-yellow-500 w-8 h-8 md:w-10 md:h-10" />
              </h2>
              
              <div className="grid md:grid-cols-5 gap-8 mb-12">
                <div className="md:col-span-3">
                   <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
                     這個故事最重要的並不是披薩，而是<span className="text-red-400 font-bold">「那時候沒有中心化交易所」</span>。
                     幣價非常不確定，Laszlo 只能到論壇喊價。
                   </p>
                   <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 text-sm md:text-base">
                     <div className="flex gap-4 mb-4">
                        <div className="min-w-[4px] bg-red-500 rounded-full h-auto"></div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">當時的問題</p>
                          <p className="text-gray-300 italic">"這 10,000 顆比特幣到底值多少錢？沒人說得準，論壇上有人說大概值 $41 美金。"</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="min-w-[4px] bg-yellow-500 rounded-full h-auto"></div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Jercos 的套利機會</p>
                          <p className="text-yellow-400 font-bold">披薩成本 $25 → 收到市值 $41 的比特幣</p>
                          <p className="text-gray-300 italic">"這 <span className="text-white">$16 美金的價差</span> 就是為了彌補「沒有交易所」的不確定性。"</p>
                        </div>
                     </div>
                   </div>
                </div>
                
                <div className="md:col-span-2 flex flex-col justify-center gap-3 text-sm md:text-base text-gray-500 bg-gray-900/30 p-6 rounded-xl border border-gray-800">
                     <div className="flex justify-between border-b border-gray-800 pb-2">
                       <span>BTC "Market" Value</span>
                       <span className="text-green-400">~$41.00 USD</span>
                     </div>
                     <div className="flex justify-between border-b border-gray-800 pb-2">
                       <span>Pizza Cost</span>
                       <span className="text-red-400">~$25.00 USD</span>
                     </div>
                     <div className="flex justify-between pt-1">
                       <span>Arbitrage Profit</span>
                       <span className="text-yellow-500 font-bold">+$16.00 (64%)</span>
                     </div>
                     <div className="text-xs mt-4 text-gray-400 italic text-center">
                       Jercos 願意收幣，是因為他賺了這個巨大價差。
                     </div>
                </div>
              </div>
            </div>
          </div>
        );

      // --- ERA SLIDES ---

      case 3:
        return (
          <div className="flex flex-col justify-center px-4 h-full w-full">
            <TimelineCard 
              era="ERA 1 (2010-2012)"
              title="The Exchange Era"
              icon={Landmark}
              question="比特幣可以買東西嗎？"
              answer="可以，但你要先去賣掉換錢。"
              mainText="2010 年 Mt. Gox 成立，解決了「報價」與「流動性」問題。大家終於知道 1 顆比特幣值多少錢。"
              subText={`問題：\n消費流程還是兩段式的。\n\n你必須先去交易所 → 賣幣 → 提領法幣 → 再去買披薩。\n\n交易所解決了「幣變錢」的問題，但沒有解決「支付」的問題。`}
              theme="blue"
            />
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col justify-center px-4 h-full w-full">
            <TimelineCard 
              era="ERA 2 (2013-2016)"
              title="Merchant Adoption"
              icon={Store}
              question="比特幣可以買東西嗎？"
              answer="可以，如果你付比特幣給我們。"
              mainText="Overstock, Newegg 等科技電商開始「願意收幣」。這簡化了使用者的流程，你可以直接把幣轉給商家。"
              subText={`問題：\n這變成了商家的麻煩。\n\n如果沒有中心化交易所的報價，電商怎麼知道要收多少幣？\n而且商家收了幣之後，他們也要去交易所賣掉換現金。\n負擔只是從消費者轉移到了商家身上。`}
              theme="purple"
            />
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col justify-center px-4 h-full w-full">
            <TimelineCard 
              era="ERA 3 (2014-2018)"
              title="Payment Processors"
              icon={RefreshCw}
              question="比特幣可以買東西嗎？"
              answer="可以，我們會幫店家自動換匯。"
              mainText="BitPay, Coinbase Commerce 出現。消費者付幣，中間商自動換成法幣給店家。商家終於沒有風險了。"
              subText={`問題：\n這對商家好，但對消費者還是很痛苦。\n\n1. 你要等 10 分鐘區塊確認。\n2. 你要付昂貴的礦工費。\n3. 中間商匯率通常很差。\n\n這是一個「可用」但「不好用」的體驗。`}
              theme="yellow"
            />
          </div>
        );

      case 6:
        return (
          <div className="flex flex-col justify-center px-4 h-full w-full">
            <TimelineCard 
              era="ERA 4 (2016-2019)"
              title="Tech Improvements"
              icon={Zap}
              question="比特幣可以買東西嗎？"
              answer="可以，而且現在變快了 (USDT/LN)。"
              mainText="Lightning Network 讓交易變快；USDT 讓價值穩定。技術一直在進步，支付不再需要等 10 分鐘。"
              subText={`問題：\n你還是只能在「支援加密貨幣」的特定店家消費。\n\n我想買咖啡、我想搭捷運、我想去便利商店。\n現實世界絕大多數的消費場景，依然只收法幣 (Visa/Mastercard)。\n\n我們需要的不是「更快的轉帳」，而是「通用的支付」。`}
              theme="green"
            />
          </div>
        );

      case 7:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 md:py-0 min-h-full">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              <div className="flex-1 w-full text-white">
                <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 1 (2019-2022)</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  The "Centralized" Card
                </h2>
                <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                  2019 年 Crypto.com 發卡，這是一個轉折點。<br/>
                  它解決了「通用性」：你可以用加密貨幣在任何收 Visa 的地方消費。
                </p>
                
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 w-full mb-6">
                   <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                     <CheckCircle className="text-green-500" />
                     UX Solved
                   </h3>
                   <p className="text-gray-300 text-sm mb-4">
                     不用等區塊確認、不用管商家收不收幣。刷下去就對了，後端自動賣幣換法幣。
                   </p>
                </div>

                <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30 w-full">
                   <h3 className="font-bold text-red-200 mb-4 flex items-center gap-2">
                     <XCircle className="text-red-500" />
                     Ownership Lost
                   </h3>
                   <p className="text-red-200/80 text-sm">
                     代價是：你的錢必須放在中心化交易所 (CEX)。<br/>
                     這張卡本質上是<span className="text-white font-bold">「交易所帳戶的提款卡」</span>。<br/>
                     FTX 事件後，大家都知道這意味著什麼：Not your keys, not your coins.
                   </p>
                </div>
              </div>

              <div className="flex-1 flex justify-center w-full py-8 md:py-0">
                <div className="relative w-full max-w-[320px]">
                  <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-br from-blue-900 to-blue-600 rounded-2xl border border-blue-400/30 transform -rotate-6 shadow-2xl z-10 flex flex-col justify-between p-6">
                    <div className="text-blue-200 font-bold italic">CEX CARD</div>
                    <div className="flex justify-between items-end">
                      <div className="text-blue-100 font-mono tracking-widest">**** 8888</div>
                      <div className="text-xs text-blue-200">CUSTODIAL</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 md:py-0 min-h-full">
            <div className="mb-8 md:mb-10 text-white">
              <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 2 (2018-2020)</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                The Failed Pioneers (L1)
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl">
                既然 CEX 危險，那為什麼不做「自託管卡」？<br/>
                其實早就有人做了，但他們死於 <span className="text-red-400 font-bold">Ethereum L1 的高昂成本</span>。
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 pb-8">
              <div className="bg-gray-800/50 p-6 md:p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">TokenCard (Monolith)</h3>
                    <span className="text-xs font-mono bg-gray-700 px-2 py-1 rounded text-gray-300">Self-Custody</span>
                  </div>
                  <Coins className="text-gray-500 w-8 h-8" />
                </div>
                <ul className="space-y-4 text-gray-400 text-sm md:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">✓</span>
                    <span>理想：刷卡時直接扣合約錢包，資金自己保管。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    <span>死因：買一杯 $5 咖啡，要付 <span className="text-white font-bold">$15 Gas Fee</span>。沒人會用。</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800/50 p-6 md:p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">Argent Wallet</h3>
                    <span className="text-xs font-mono bg-gray-700 px-2 py-1 rounded text-gray-300">Gas Subsidy</span>
                  </div>
                  <Shield className="text-gray-500 w-8 h-8" />
                </div>
                <ul className="space-y-4 text-gray-400 text-sm md:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">✓</span>
                    <span>理想：為了使用者體驗，官方補貼 Gas (Meta-tx)。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    <span>死因：DeFi Summer Gas 暴漲，專案方<span className="text-white font-bold">燒不起錢</span>，補貼模式破產。</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 md:py-0 min-h-full overflow-y-auto">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              <div className="flex-1 w-full text-white">
                <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 3 (2024-Present)</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  The Final Bridge
                </h2>
                <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                  為什麼現在可以了？<br/>
                  因為基礎設施 <span className="text-white font-bold">Layer 2 (Scroll)</span> 終於跟上了夢想。
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4 p-4 bg-purple-900/20 border border-purple-500/30 rounded-xl">
                    <div className="bg-purple-500/20 p-3 rounded-lg h-fit shrink-0">
                      <Layers className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Scroll (L2) 解決了 Monolith 的問題</h4>
                      <p className="text-sm text-gray-400 mt-1">
                        zkEVM 讓 Gas Fee 趨近於零。每一筆刷卡都能在鏈上低成本結算，不需要補貼也能運作。
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-green-900/20 border border-green-500/30 rounded-xl">
                    <div className="bg-green-500/20 p-3 rounded-lg h-fit shrink-0">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Ether.fi 解決了 CEX 的問題</h4>
                      <p className="text-sm text-gray-400 mt-1">
                        你的錢在合約帳戶裡 (Self-Custody)，不是在交易所。而且還能持續生息 (Positive Carry)。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center py-8 md:py-0">
                 <div className="relative w-64 h-64 md:w-72 md:h-72">
                    <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="relative z-10 bg-gray-900 border border-gray-700 p-8 rounded-3xl shadow-2xl h-full flex flex-col justify-center items-center text-center aspect-square">
                      <Zap className="w-16 h-16 text-yellow-400 mb-4" />
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Frictionless</h3>
                      <p className="text-gray-400 text-sm">
                        Spending becomes<br/>Borrowing.
                      </p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        );

      // SLIDE 10: ANATOMY (MOVED TO END)
      case 10:
        return (
          <div className="flex flex-col justify-center px-4 max-w-7xl mx-auto w-full py-8 md:py-12 min-h-full overflow-y-auto">
            <div className="text-center mb-8 lg:mb-12 shrink-0">
              <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">THE BLUEPRINT</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                Anatomy of Ether.fi Cash
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                把歷史的拼圖拼起來，這就是它現在的樣子。<br/>
                每一個組件，都是為了解決過去某個階段的失敗。
              </p>
            </div>

            <div className="relative flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-3 gap-6 lg:gap-8 items-center justify-center h-auto lg:h-[600px] w-full max-w-5xl mx-auto">
              
              {/* Central Card Visual */}
              <div className="lg:col-start-2 lg:row-start-2 z-10 w-full flex justify-center order-1 lg:order-none mb-8 lg:mb-0">
                <div className="relative w-64 h-40 md:w-80 md:h-48 bg-gradient-to-br from-purple-900 to-gray-900 rounded-2xl border border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.3)] flex flex-col justify-between p-6 transform hover:scale-105 transition-transform duration-500">
                  <div className="flex justify-between items-start">
                    <span className="text-purple-200 font-bold italic tracking-wider">ether.fi</span>
                    <Globe className="text-purple-400/50 w-6 h-6" />
                  </div>
                  <div className="text-center">
                     <span className="text-white text-opacity-20 font-bold text-4xl tracking-widest">CASH</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="text-purple-100 font-mono tracking-widest text-sm">**** 8888</div>
                    <div className="text-xs text-purple-300 border border-purple-500/50 px-2 py-0.5 rounded">L2 NATIVE</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-start-2 lg:row-start-1 flex justify-center order-2 lg:order-none w-full">
                <AnatomyPart icon={Globe} title="Visa Network" desc="解決「通用性」。就像 Crypto.com 一樣，連接全球 8000 萬商戶。" position="bottom" color="blue" />
              </div>
              <div className="lg:col-start-2 lg:row-start-3 flex justify-center order-3 lg:order-none w-full">
                <AnatomyPart icon={Layers} title="Scroll zkEVM" desc="解決「成本」。就像失敗的 Monolith，但這次手續費夠低了。" position="top" color="yellow" />
              </div>
              <div className="lg:col-start-1 lg:row-start-2 flex justify-center order-4 lg:order-none w-full">
                <AnatomyPart icon={Lock} title="Smart Wallet" desc="解決「安全性」。資金在合約帳戶內 (Self-Custody)，避免 FTX 風險。" position="right" color="green" />
              </div>
              <div className="lg:col-start-3 lg:row-start-2 flex justify-center order-5 lg:order-none w-full">
                <AnatomyPart icon={TrendingUp} title="Token Rewards" desc="解決「誘因」。消費即挖礦，利用 DeFi 收益覆蓋最後一點摩擦成本。" position="left" color="purple" />
              </div>
            </div>
          </div>
        );

      case 11:
         return (
          <div className="flex flex-col justify-center items-center text-center px-4 min-h-full py-12 overflow-y-auto">
            <h2 className="text-4xl md:text-7xl font-bold mb-8 text-white">
              Just Use It.
            </h2>
            <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mb-12 leading-relaxed px-2">
              這條路走了 15 年，現在終於通了。<br/>
              不需要解釋底層的 zkEVM 怎麼運作，<br/>
              去樓下 7-11 買杯咖啡，你就懂了。
            </p>
            
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 p-8 rounded-2xl max-w-md w-full hover:border-purple-500 transition-all duration-300 cursor-pointer group">
              <p className="text-purple-400 font-bold mb-2 text-sm uppercase tracking-widest">NEXT</p>
              <h3 className="text-2xl font-bold text-white mb-4">Live Demo & Sign Up</h3>
              <p className="text-gray-400 text-sm mb-6">拿出你的手機，我們現在就來跨越這座橋。</p>
              <button className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2">
                Let's Go <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 h-screen w-full text-gray-100 font-sans selection:bg-purple-500 selection:text-white overflow-hidden flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-gray-800 bg-gray-900/90 backdrop-blur-md flex items-center justify-between px-4 md:px-6 shrink-0 z-50">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg md:text-xl tracking-tighter text-white">Blocktrend</span>
          <span className="text-gray-500">x</span>
          <span className="text-purple-400 font-semibold text-sm md:text-base">ether.fi</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-gray-500 bg-gray-800 px-3 py-1 rounded">
            <span>SPACE TO NEXT</span>
          </div>
          <div className="text-sm font-mono text-gray-400">
            {currentSlide + 1} / {totalSlides}
          </div>
        </div>
      </header>

      {/* Main Slide Area */}
      <main className="flex-1 relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 scroll-smooth">
        <div className="h-full w-full overflow-y-auto overflow-x-hidden">
          {renderSlide()}
        </div>
      </main>

      {/* Footer Controls */}
      <footer className="h-16 border-t border-gray-800 bg-gray-900/90 backdrop-blur-md flex items-center justify-between px-4 md:px-6 shrink-0 z-50">
        <div className="text-xs text-gray-600 truncate max-w-[150px] md:max-w-none">
          Jan 17 • Taipei • Astro Hsu
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-3 rounded-full hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-white"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="p-3 rounded-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:bg-gray-700 transition-all text-white shadow-lg shadow-purple-900/20"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
}