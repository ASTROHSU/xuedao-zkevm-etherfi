import React, { useState, useEffect } from 'react';
import { CreditCard, ArrowRight, Zap, Shield, TrendingUp, Wallet, History, ChevronRight, Activity, BookOpen, ChevronLeft, Pizza, AlertTriangle, Layers, XCircle, Coins, ArrowDown } from 'lucide-react';

// --- Components ---

const ProcessStep = ({ icon: Icon, title, sub, isLast = false, isBad = false }) => (
  <div className="flex flex-col items-center relative z-10 group w-full md:w-auto">
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-lg transition-all duration-300 ${
      isBad 
        ? 'bg-red-500/10 border border-red-500/30 text-red-400 group-hover:bg-red-500/20' 
        : 'bg-gray-800 border border-gray-700 text-purple-400 group-hover:border-purple-500'
    }`}>
      <Icon className="w-8 h-8" />
    </div>
    <h4 className="font-bold text-white text-sm text-center mb-1">{title}</h4>
    <p className="text-xs text-gray-400 text-center max-w-[200px] md:max-w-[120px]">{sub}</p>
    
    {!isLast && (
      <div className="absolute top-8 left-1/2 w-full h-[2px] bg-gray-700 -z-10 hidden md:block">
        <div className="absolute right-0 -top-1.5 text-gray-700">
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    )}
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

// --- Main App ---

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 6;

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
      // SLIDE 1: OPENING
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

      // SLIDE 2: GEN 0 - BITCOIN PIZZA
      case 1:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 md:py-0 min-h-full">
            <div className="mb-8">
              <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 0 (May 22, 2010)</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 flex items-center gap-4 flex-wrap">
                The "Human" Bridge <Pizza className="text-yellow-500 w-8 h-8 md:w-10 md:h-10" />
              </h2>
              
              <div className="grid md:grid-cols-5 gap-8 mb-8">
                <div className="md:col-span-3">
                   <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
                     這是比特幣歷史上最重要的一天。
                     <span className="text-white font-bold mx-1">Laszlo Hanyecz</span> 
                     (GPU 挖礦發明者) 在論壇苦等 4 天，只為了證明比特幣可以作為貨幣，而不僅僅是數位收藏品。
                   </p>
                   <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 text-sm">
                     <div className="flex gap-3 mb-4">
                        <div className="min-w-[4px] bg-purple-500 rounded-full h-auto"></div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">當時的網友建議</p>
                          <p className="text-gray-300 italic">"為何不去交易所賣掉換 $41 美金？買披薩只要 $25，你還能現賺 $16 價差。"</p>
                        </div>
                     </div>
                     <div className="flex gap-3">
                        <div className="min-w-[4px] bg-yellow-500 rounded-full h-auto"></div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Laszlo 的堅持</p>
                          <p className="text-white font-bold">"我只是想用比特幣換到食物... 就像在飯店點早餐一樣。"</p>
                          <p className="text-gray-400 mt-1">他寧願承受高摩擦與溢價，也要完成這筆「點對點」實物交易。</p>
                        </div>
                     </div>
                   </div>
                </div>
                
                <div className="md:col-span-2 flex flex-col justify-center gap-3 text-sm text-gray-500 bg-gray-900/30 p-5 rounded-xl border border-gray-800">
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
                       <span>Premium Paid</span>
                       <span className="text-yellow-500 font-bold">+64% (為了信仰)</span>
                     </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 relative pb-12">
               {/* Connecting Line */}
               <div className="hidden md:block absolute top-8 left-0 w-full h-1 bg-gradient-to-r from-purple-900 via-gray-700 to-yellow-900 -z-10"></div>

               <ProcessStep icon={Wallet} title="Laszlo" sub="佛羅里達發起懸賞 (10k BTC)" />
               <ProcessStep icon={Layers} title="BitcoinTalk" sub="論壇媒合 (等待4天)" />
               <ProcessStep icon={Activity} title="Jercos" sub="加州學生接單" />
               <ProcessStep icon={CreditCard} title="Fiat Bridge" sub="Jercos 刷卡代付" />
               <ProcessStep icon={Pizza} title="Papa John's" sub="外送抵達 Laszlo 家" isLast={true} />
            </div>
            
            <div className="text-center text-gray-500 text-xs pb-8 md:pb-0">
              *有趣的事實：這筆交易還支付了 1 BTC 給礦工，總成本其實是 10,001 BTC。
            </div>
          </div>
        );

      // SLIDE 3: GEN 1 - CEX CARDS
      case 2:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 md:py-0 min-h-full">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              <div className="flex-1 w-full">
                <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 1 (2016-2022)</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  The "CEX" Bridge
                </h2>
                <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                  交易所 (Crypto.com / Binance) 出現了。他們幫你把幣變現。<br/>
                  雖然方便了，但這其實是一張<span className="text-white font-bold">「變現卡」</span>，每一筆消費都被層層剝皮。
                </p>
                
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 w-full">
                   <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                     <AlertTriangle className="text-yellow-500" />
                     The Fee Sandwich
                   </h3>
                   <FeeLayer title="1. 用戶賣幣 (Tax Event)" value="Capital Gain Tax" />
                   <FeeLayer title="2. 換成 SGD/USD (匯差)" value="~0.5% Spread" />
                   <FeeLayer title="3. 台灣刷卡 (SGD 轉 TWD)" value="~1.5% FX Fee" />
                   <FeeLayer title="4. 跨國交易手續費" value="1.5% Int'l Fee" />
                </div>
              </div>

              <div className="flex-1 flex justify-center w-full py-8 md:py-0">
                <div className="relative w-full max-w-[320px]">
                  {/* Card Visual */}
                  <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-br from-blue-900 to-blue-600 rounded-2xl border border-blue-400/30 transform -rotate-6 shadow-2xl z-10 flex flex-col justify-between p-6">
                    <div className="text-blue-200 font-bold italic">CEX CARD</div>
                    <div className="flex justify-between items-end">
                      <div className="text-blue-100 font-mono tracking-widest">**** 8888</div>
                      <div className="text-xs text-blue-200">PREPAID</div>
                    </div>
                  </div>
                  
                  {/* The Problem Visual */}
                  <div className="absolute top-28 md:top-24 -right-4 md:-right-12 bg-gray-900 border border-red-500 p-4 rounded-lg shadow-xl z-20 w-64">
                    <div className="flex items-center gap-3 text-red-400 mb-2">
                      <XCircle className="w-5 h-5" />
                      <span className="font-bold text-sm">NOT Crypto Payment</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      你是把加密貨幣「賣掉」，把現金存進去。這失去了加密貨幣的意義。
                    </p>
                  </div>
                  
                  {/* Spacer for flow */}
                  <div className="h-64"></div>
                </div>
              </div>
            </div>
          </div>
        );

      // SLIDE 4: GEN 2 - THE FAILED PIONEERS
      case 3:
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

      // SLIDE 5: GEN 3 - ETHER.FI CASH
      case 4:
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

      // SLIDE 6: CONCLUSION / DEMO
      case 5:
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