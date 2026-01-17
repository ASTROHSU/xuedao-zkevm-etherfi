import React, { useState, useEffect } from 'react';
import { CreditCard, ArrowRight, Zap, Shield, TrendingUp, Wallet, History, ChevronRight, Activity, BookOpen, ChevronLeft, Pizza, AlertTriangle, Layers, XCircle, Coins, ArrowDown, QrCode, Store, Smartphone, Globe, Lock, CheckCircle, Landmark, RefreshCw, AlertCircle } from 'lucide-react';

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
      <div className="md:hidden my-4 text-gray-600 animate-bounce">
        <ArrowDown className="w-6 h-6" />
      </div>
    )}
  </div>
);

const FeeLayer = ({ title, value }) => (
  <div className="flex justify-between items-center bg-red-900/20 border border-red-500/30 p-3 rounded-lg mb-2">
    <span className="text-red-200 text-sm text-left mr-2">{title}</span>
    <span className="text-red-400 font-mono font-bold whitespace-nowrap">{value}</span>
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

const TimelineCard = ({ title, era, icon: Icon, mainText, subText, theme = "blue" }) => {
  const themes = {
    blue: "from-blue-900/50 to-gray-900 border-blue-500/30 text-blue-400",
    purple: "from-purple-900/50 to-gray-900 border-purple-500/30 text-purple-400",
    yellow: "from-yellow-900/50 to-gray-900 border-yellow-500/30 text-yellow-400",
    green: "from-green-900/50 to-gray-900 border-green-500/30 text-green-400",
  };

  return (
    <div className={`flex flex-col md:flex-row gap-8 items-center bg-gradient-to-br ${themes[theme]} p-8 rounded-2xl border w-full max-w-5xl mx-auto min-h-[400px]`}>
      <div className="flex-1 space-y-6">
        <div>
          <span className="font-mono text-sm tracking-widest opacity-80 mb-2 block">{era}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{title}</h2>
        </div>
        <div className={`p-4 rounded-xl bg-gray-900/50 border border-white/10`}>
          <Icon className="w-12 h-12 mb-4 opacity-80" />
          <p className="text-xl text-gray-200 leading-relaxed font-light">{mainText}</p>
        </div>
      </div>
      <div className="flex-1 w-full bg-black/20 p-6 rounded-xl border border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
          <Icon className="w-32 h-32" />
        </div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" /> The Reality
        </h3>
        <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-line">
          {subText}
        </p>
      </div>
    </div>
  );
};

// --- Main App ---

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 11; // Increased to 11

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
            
            <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">
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
            <div className="animate-bounce text-gray-600 mt-8 md:hidden">
              <span className="text-xs font-mono">TAP ARROW TO START</span>
            </div>
          </div>
        );

      // SLIDE 1: ANATOMY
      case 1:
        return (
          <div className="flex flex-col justify-center px-4 max-w-7xl mx-auto w-full py-8 md:py-12 min-h-full overflow-y-auto">
            <div className="text-center mb-8 lg:mb-12 shrink-0">
              <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">THE BLUEPRINT</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Anatomy of Ether.fi Cash
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                這不是一張普通的卡片，而是一個由多層技術堆疊而成的「DeFi 樂高」。<br/>
                我們接下來要講的每一個歷史階段，都是為了完成這張圖拼圖中的其中一塊。
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
                  
                  <div className="lg:hidden absolute -top-6 left-1/2 w-0.5 h-6 bg-gray-700"></div>
                  <div className="lg:hidden absolute -bottom-6 left-1/2 w-0.5 h-6 bg-gray-700"></div>
                </div>
              </div>

              <div className="lg:col-start-2 lg:row-start-1 flex justify-center order-2 lg:order-none w-full">
                <AnatomyPart icon={Globe} title="Visa Network" desc="解決「換幣」難題。連接全球 8000 萬商戶，讓加密貨幣能像法幣一樣流通。" position="bottom" color="blue" />
              </div>
              <div className="lg:col-start-2 lg:row-start-3 flex justify-center order-3 lg:order-none w-full">
                <AnatomyPart icon={Layers} title="Scroll zkEVM" desc="解決「Gas Fee」。提供極低成本的結算層，讓高頻小額消費成為可能。" position="top" color="yellow" />
              </div>
              <div className="lg:col-start-1 lg:row-start-2 flex justify-center order-4 lg:order-none w-full">
                <AnatomyPart icon={Lock} title="Smart Wallet" desc="解決「自託管」。資金在你的合約帳戶內，非交易所託管。支援多重簽名與恢復機制。" position="right" color="green" />
              </div>
              <div className="lg:col-start-3 lg:row-start-2 flex justify-center order-5 lg:order-none w-full">
                <AnatomyPart icon={TrendingUp} title="Token Rewards" desc="解決「誘因」。消費即挖礦 (Spend to Earn)，回饋大於磨損，實現正收益 (Positive Carry)。" position="left" color="purple" />
              </div>
            </div>
          </div>
        );

      // SLIDE 2: GEN 0 - BITCOIN PIZZA
      case 2:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 md:py-0 min-h-full">
            <div className="mb-8">
              <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 0 (May 22, 2010)</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 flex items-center gap-4 flex-wrap">
                The "Human" Bridge <Pizza className="text-yellow-500 w-8 h-8 md:w-10 md:h-10" />
              </h2>
              
              <div className="grid md:grid-cols-5 gap-8 mb-12">
                <div className="md:col-span-3">
                   <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
                     這是比特幣歷史上最重要的一天。
                     <span className="text-white font-bold mx-1">Laszlo Hanyecz</span> 
                     (GPU 挖礦發明者) 在論壇苦等 4 天，只為了證明比特幣可以作為貨幣。
                   </p>
                   <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 text-sm md:text-base">
                     <div className="flex gap-4 mb-4">
                        <div className="min-w-[4px] bg-purple-500 rounded-full h-auto"></div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">當時的網友建議</p>
                          <p className="text-gray-300 italic">"為何不去交易所賣掉換 $41 美金？買披薩只要 $25，你還能現賺 $16 價差。"</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="min-w-[4px] bg-yellow-500 rounded-full h-auto"></div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Jercos 的獲利 (Arbitrage)</p>
                          <p className="text-yellow-400 font-bold">成本 $25 → 收到 $41 等值 BTC</p>
                          <p className="text-gray-300 italic">"多虧了他賺了這 $16 美元 (64% 價差)，否則比特幣披薩日根本不會發生。"</p>
                        </div>
                     </div>
                   </div>
                </div>
                
                <div className="md:col-span-2 flex flex-col justify-center gap-3 text-sm md:text-base text-gray-500 bg-gray-900/30 p-6 rounded-xl border border-gray-800">
                     <div className="flex justify-between border-b border-gray-800 pb-2">
                       <span>Buyer</span>
                       <span className="text-gray-300 font-bold">Laszlo (Florida)</span>
                     </div>
                     <div className="flex justify-between border-b border-gray-800 pb-2">
                       <span>Seller</span>
                       <span className="text-gray-300 font-bold">Jercos (19yo, CA)</span>
                     </div>
                     <div className="flex justify-between border-b border-gray-800 pb-2">
                       <span>BTC Value</span>
                       <span className="text-green-400">~$41.00 USD</span>
                     </div>
                     <div className="flex justify-between border-b border-gray-800 pb-2">
                       <span>Pizza Cost</span>
                       <span className="text-red-400">~$25.00 USD</span>
                     </div>
                     <div className="flex justify-between pt-1">
                       <span>Jercos Profit</span>
                       <span className="text-yellow-500 font-bold">+$16.00 (64%)</span>
                     </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 relative pb-12">
               <div className="hidden md:block absolute top-8 left-0 w-full h-1 bg-gradient-to-r from-purple-900 via-gray-700 to-yellow-900 -z-10"></div>
               <ProcessStep icon={Wallet} title="Laszlo" sub="佛羅里達發起懸賞 (10k BTC)" />
               <ProcessStep icon={Layers} title="BitcoinTalk" sub="論壇媒合 (等待4天)" />
               <ProcessStep icon={Activity} title="Jercos" sub="加州學生接單" />
               <ProcessStep icon={CreditCard} title="Fiat Bridge" sub="Jercos 刷卡代付" />
               <ProcessStep icon={Pizza} title="Papa John's" sub="外送抵達 Laszlo 家" isLast={true} />
            </div>
          </div>
        );

      // --- EXPANDED SLIDES (3, 4, 5, 6) ---

      // SLIDE 3: EXCHANGES (2010-2012)
      case 3:
        return (
          <div className="flex flex-col justify-center px-4 h-full w-full">
            <TimelineCard 
              era="ERA 1 (2010-2012)"
              title="The Exchange Era"
              icon={Landmark}
              mainText="交易所 (Mt. Gox, Bitstamp) 的出現，第一次解決了「流動性」問題。加密貨幣終於可以被定價、被賣掉。"
              subText={`但這裡有一個很關鍵的差別：\n交易所讓你「把幣換成錢」，卻沒有讓你「直接用幣付錢」。\n\n實際的消費流程仍然是兩段式的：\n你先把幣賣掉，提現成法幣，然後再用法幣去消費。`}
              theme="blue"
            />
          </div>
        );

      // SLIDE 4: MERCHANTS (2013-2016)
      case 4:
        return (
          <div className="flex flex-col justify-center px-4 h-full w-full">
            <TimelineCard 
              era="ERA 2 (2013-2016)"
              title="Merchant Adoption"
              icon={Store}
              mainText="科技公司與電商平台 (Overstock, Newegg) 開始「願意收幣」。表面上這是走向實用的重要一步。"
              subText={`但實際體驗卻是 UX 惡夢。\n\n對消費者來說：\n打開錢包 → 掃描地址 → 手動確認金額 → 等待 10 分鐘鏈上確認。\n\n這形成了一個非常不穩定的世界：\n如果你剛好有幣，對方剛好願意收，那就可以成交；\n但這種模式，不可能成為日常。`}
              theme="purple"
            />
          </div>
        );

      // SLIDE 5: PROCESSORS (2014-2018)
      case 5:
        return (
          <div className="flex flex-col justify-center px-4 h-full w-full">
            <TimelineCard 
              era="ERA 3 (2014-2018)"
              title="Payment Processors"
              icon={RefreshCw}
              mainText="BitPay, Coinbase Commerce 出現。消費者付幣，商家收法幣。風險由平台吸收。"
              subText={`這對商家來說是一大進步 (無風險)。\n但對消費者而言，體驗幾乎沒有改善。\n\n每一筆支付仍然是「轉帳、等待、確認」。\n這一代的創新，本質上是在解決商家的財務風險，而不是在解決支付本身的摩擦。`}
              theme="yellow"
            />
          </div>
        );

      // SLIDE 6: TECH (2016-2019)
      case 6:
        return (
          <div className="flex flex-col justify-center px-4 h-full w-full">
            <TimelineCard 
              era="ERA 4 (2016-2019)"
              title="Tech, but No UX"
              icon={Zap}
              mainText="Lightning Network 讓交易變快；USDT/USDC 讓價值穩定。技術一直在進步。"
              subText={`但支付行為本身還是轉帳。\n\n你仍然需要打開錢包、管理通道、簽名、確認。\n支付的最後一公尺，仍然卡在人類行為上。\n\n我們需要的不是更快的轉帳，而是「像刷卡一樣」的體驗。`}
              theme="green"
            />
          </div>
        );

      // SLIDE 8 (Formerly 4): GEN 1 - CEX CARDS
      case 7:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 md:py-0 min-h-full">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              <div className="flex-1 w-full">
                <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 1 (2019-2022)</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  The "Centralized" Card
                </h2>
                <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                  第一次，有人把摩擦<span className="text-white font-bold">「藏起來」</span>了。<br/>
                  Crypto.com / Binance 讓加密貨幣終於可以像 Visa 一樣刷。
                </p>
                
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 w-full mb-6">
                   <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                     <CheckCircle className="text-green-500" />
                     Experience Solved
                   </h3>
                   <p className="text-gray-300 text-sm mb-4">
                     你不需要打開錢包、不需要簽名、不需要等待確認。只要刷卡，後端自動換匯。
                   </p>
                </div>

                <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30 w-full">
                   <h3 className="font-bold text-red-200 mb-4 flex items-center gap-2">
                     <XCircle className="text-red-500" />
                     Ownership Lost
                   </h3>
                   <p className="text-red-200/80 text-sm">
                     代價是明確的：你的資產必須放在交易所。<br/>
                     這些卡本質上是<span className="text-white font-bold">「交易所帳戶的延伸」</span>，而不是錢包的延伸。<br/>
                     它讓加密貨幣可以被用，但沒有讓加密貨幣真正「屬於你」。
                   </p>
                </div>
              </div>

              <div className="flex-1 flex justify-center w-full py-8 md:py-0">
                <div className="relative w-full max-w-[320px]">
                  {/* Card Visual */}
                  <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-br from-blue-900 to-blue-600 rounded-2xl border border-blue-400/30 transform -rotate-6 shadow-2xl z-10 flex flex-col justify-between p-6">
                    <div className="text-blue-200 font-bold italic">CEX CARD</div>
                    <div className="flex justify-between items-end">
                      <div className="text-blue-100 font-mono tracking-widest">**** 8888</div>
                      <div className="text-xs text-blue-200">DEBIT</div>
                    </div>
                  </div>
                  
                  <div className="absolute top-28 md:top-24 -right-4 md:-right-12 bg-gray-900 border border-red-500 p-4 rounded-lg shadow-xl z-20 w-64">
                    <div className="flex items-center gap-3 text-red-400 mb-2">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="font-bold text-sm">Not Your Keys</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      2022 年 (FTX) 之後，大家才意識到這種模式的極限。
                    </p>
                  </div>
                  
                  <div className="h-64"></div>
                </div>
              </div>
            </div>
          </div>
        );

      // SLIDE 9 (Formerly 5): GEN 2 - THE FAILED PIONEERS
      case 8:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 md:py-0 min-h-full">
            <div className="mb-8 md:mb-10">
              <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 2 (2018-2020)</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                The Failed Pioneers (L1)
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl">
                曾經有先驅者嘗試做「自託管 (Self-Custody)」。方向是對的，但時間錯了。<br/>
                他們死於 <span className="text-red-400 font-bold">Ethereum L1 的高昂成本</span>。
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 pb-8">
              {/* Monolith */}
              <div className="bg-gray-800/50 p-6 md:p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">Monolith (TokenCard)</h3>
                    <span className="text-xs font-mono bg-gray-700 px-2 py-1 rounded text-gray-300">First DeFi Card</span>
                  </div>
                  <Coins className="text-gray-500 w-8 h-8" />
                </div>
                <ul className="space-y-4 text-gray-400 text-sm md:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">✓</span>
                    <span>理想：直接扣合約錢包，不需預付。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    <span>死因：買一杯 $5 咖啡，要付 <span className="text-white font-bold">$15 Gas Fee</span>。</span>
                  </li>
                </ul>
              </div>

              {/* Argent */}
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
                    <span>死因：DeFi Summer Gas 暴漲，專案方<span className="text-white font-bold">燒不起錢</span>，被迫停止。</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 md:mt-8 text-center text-gray-500 text-sm italic pb-8">
              "Right idea, wrong infrastructure."
            </div>
          </div>
        );

      // SLIDE 10 (Formerly 6): GEN 3 - ETHER.FI CASH
      case 9:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 md:py-0 min-h-full">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              <div className="flex-1 w-full">
                <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 3 (2024-Present)</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  The Final Bridge
                </h2>
                <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                  為什麼現在可以了？<br/>
                  因為基礎設施 (L2) 終於跟上了夢想。
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4 p-4 bg-purple-900/20 border border-purple-500/30 rounded-xl">
                    <div className="bg-purple-500/20 p-3 rounded-lg h-fit shrink-0">
                      <Layers className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Scroll (L2) 解決了 Monolith 的問題</h4>
                      <p className="text-sm text-gray-400 mt-1">
                        zkEVM 讓 Gas Fee 趨近於零。每一筆刷卡都能在鏈上低成本結算。
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
                        不用賣幣 (No Tax Event)、不用預付。錢包裡的資產持續生息 (Positive Carry)。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center py-8 md:py-0">
                 <div className="relative w-64 h-64 md:w-72 md:h-72">
                    {/* Abstract Representation of Convergence */}
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

      // SLIDE 11 (Formerly 7): CONCLUSION
      case 10:
         return (
          <div className="flex flex-col justify-center items-center text-center px-4 min-h-full py-12">
            <h2 className="text-4xl md:text-7xl font-bold mb-8">
              Just Use It.
            </h2>
            <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mb-12 leading-relaxed px-2">
              Ether.fi Cash 是什麼？<br/>
              不需要解釋底層原理，直接去辦一張，<br/>
              去樓下 7-11 買杯咖啡，你就懂了。
            </p>
            
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 p-8 rounded-2xl max-w-md w-full hover:border-purple-500 transition-all duration-300 cursor-pointer">
              <p className="text-purple-400 font-bold mb-2 text-sm uppercase tracking-widest">NEXT</p>
              <h3 className="text-2xl font-bold text-white mb-4">Live Demo & Sign Up</h3>
              <p className="text-gray-400 text-sm mb-6">拿出你的手機，我們現在就來跨越這座橋。</p>
              <button className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg font-bold transition-all">
                Let's Go
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 h-screen w-screen text-gray-100 font-sans selection:bg-purple-500 selection:text-white overflow-hidden flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-gray-800 bg-gray-900/90 backdrop-blur-md flex items-center justify-between px-4 md:px-6 shrink-0 z-50">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg md:text-xl tracking-tighter">Blocktrend</span>
          <span className="text-gray-500">x</span>
          <span className="text-purple-400 font-semibold text-sm md:text-base">ether.fi</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-gray-500 bg-gray-800 px-3 py-1 rounded">
            <span>PRESS SPACE TO NEXT</span>
          </div>
          <div className="text-sm font-mono text-gray-400">
            {currentSlide + 1} / {totalSlides}
          </div>
        </div>
      </header>

      {/* Main Slide Area - Now with overflow-y-auto for mobile */}
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden bg-gradient-to-b from-gray-900 to-gray-950 scroll-smooth">
        {renderSlide()}
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
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="p-3 rounded-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:bg-gray-700 transition-all text-white shadow-lg shadow-purple-900/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;