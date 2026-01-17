import React, { useState, useEffect } from 'react';
import { CreditCard, ArrowRight, Zap, Shield, TrendingUp, Wallet, History, ChevronRight, Activity, BookOpen, ChevronLeft, Pizza, AlertTriangle, Layers, XCircle, Coins, ArrowDown } from 'lucide-react';

// --- Components ---

const ProcessStep = ({ icon: Icon, title, sub, isLast = false, isBad = false }) => (
  <div className="flex flex-col items-center relative z-10 group">
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-lg transition-all duration-300 ${
      isBad 
        ? 'bg-red-500/10 border border-red-500/30 text-red-400 group-hover:bg-red-500/20' 
        : 'bg-gray-800 border border-gray-700 text-purple-400 group-hover:border-purple-500'
    }`}>
      <Icon className="w-8 h-8" />
    </div>
    <h4 className="font-bold text-white text-sm text-center mb-1">{title}</h4>
    <p className="text-xs text-gray-400 text-center max-w-[120px]">{sub}</p>
    
    {!isLast && (
      <div className="absolute top-8 left-full w-full h-[2px] bg-gray-700 -z-10 hidden md:block">
        <div className="absolute right-0 -top-1.5 text-gray-700">
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    )}
    {!isLast && (
      <div className="md:hidden my-2 text-gray-600">
        <ArrowDown className="w-6 h-6" />
      </div>
    )}
  </div>
);

const FeeLayer = ({ title, value }) => (
  <div className="flex justify-between items-center bg-red-900/20 border border-red-500/30 p-3 rounded-lg mb-2">
    <span className="text-red-200 text-sm">{title}</span>
    <span className="text-red-400 font-mono font-bold">{value}</span>
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
          <div className="flex flex-col justify-center items-center h-full text-center px-4 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-sm mb-12">
               XueDAO Meetup • Taipei
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              The Furthest Distance<br />
              <span className="text-gray-500 text-3xl md:text-5xl block mt-4 font-normal">
                is between your <span className="text-white">Bitcoin</span> and a <span className="text-white">Coffee</span>.
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              這兩端花了 15 年才真正連起來。<br/>
              這是一段關於「支付演變」的故事。
            </p>

            <div className="animate-bounce text-gray-600 mt-8">
              <span className="text-xs font-mono">PRESS SPACE TO START</span>
            </div>
          </div>
        );

      // SLIDE 2: GEN 0 - BITCOIN PIZZA
      case 1:
        return (
          <div className="h-full flex flex-col justify-center px-4 max-w-6xl mx-auto w-full">
            <div className="mb-12">
              <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 0 (2010)</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-4">
                The "Human" Bridge <Pizza className="text-yellow-500 w-10 h-10" />
              </h2>
              <p className="text-xl text-gray-400">
                大家都知道 10,000 BTC 買了披薩，但很少人知道中間發生了什麼事。<br/>
                最難的不是轉帳，是<span className="text-white font-bold">找到願意收幣的人 (Coincidence of Wants)</span>。
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 relative">
               {/* Connecting Line for Desktop */}
               <div className="hidden md:block absolute top-8 left-0 w-full h-1 bg-gradient-to-r from-purple-900 via-gray-700 to-yellow-900 -z-10"></div>

               <ProcessStep icon={Wallet} title="Laszlo" sub="持有 10,000 BTC" />
               <ProcessStep icon={Layers} title="BitcoinTalk" sub="論壇發文請求" />
               <ProcessStep icon={Activity} title="Jercos" sub="英國網友答應" />
               <ProcessStep icon={CreditCard} title="Credit Card" sub="Jercos 用法幣付款" />
               <ProcessStep icon={Pizza} title="Papa John's" sub="收到法幣，外送披薩" isLast={true} />
            </div>

            <div className="mt-16 bg-gray-800/50 p-6 rounded-xl border border-gray-700 text-center">
              <p className="text-gray-300">
                <span className="font-bold text-red-400">痛點：</span> 這不是點對點支付，這是「人肉 OTC」。效率極低，無法複製。
              </p>
            </div>
          </div>
        );

      // SLIDE 3: GEN 1 - CEX CARDS
      case 2:
        return (
          <div className="h-full flex flex-col justify-center px-4 max-w-6xl mx-auto w-full">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 1 (2016-2022)</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  The "CEX" Bridge
                </h2>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  交易所 (Crypto.com / Binance) 出現了。他們幫你把幣變現。<br/>
                  雖然方便了，但這其實是一張<span className="text-white font-bold">「變現卡」</span>，每一筆消費都被層層剝皮。
                </p>
                
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                   <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                     <AlertTriangle className="text-yellow-500" />
                     The Fee Sandwich
                   </h3>
                   <FeeLayer title="1. 用戶賣幣 (Tax Event)" value="Capital Gain Tax" />
                   <FeeLayer title="2. 換成 SGD/USD (交易所匯差)" value="~0.5% Spread" />
                   <FeeLayer title="3. 台灣刷卡 (SGD 轉 TWD)" value="~1.5% FX Fee" />
                   <FeeLayer title="4. 跨國交易手續費" value="1.5% Int'l Fee" />
                </div>
              </div>

              <div className="flex-1 flex justify-center">
                <div className="relative w-80">
                  {/* Card Visual */}
                  <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-br from-blue-900 to-blue-600 rounded-2xl border border-blue-400/30 transform -rotate-6 shadow-2xl z-10 flex flex-col justify-between p-6">
                    <div className="text-blue-200 font-bold italic">CEX CARD</div>
                    <div className="flex justify-between items-end">
                      <div className="text-blue-100 font-mono tracking-widest">**** 8888</div>
                      <div className="text-xs text-blue-200">PREPAID</div>
                    </div>
                  </div>
                  
                  {/* The Problem Visual */}
                  <div className="absolute top-24 -right-12 bg-gray-900 border border-red-500 p-4 rounded-lg shadow-xl z-20 w-64">
                    <div className="flex items-center gap-3 text-red-400 mb-2">
                      <XCircle className="w-5 h-5" />
                      <span className="font-bold text-sm">NOT Crypto Payment</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      你是把加密貨幣「賣掉」，把現金存進去。這失去了加密貨幣的意義。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // SLIDE 4: GEN 2 - THE FAILED PIONEERS
      case 3:
        return (
          <div className="h-full flex flex-col justify-center px-4 max-w-6xl mx-auto w-full">
            <div className="mb-10">
              <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 2 (2018-2020)</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                The Failed Pioneers (L1)
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl">
                曾經有先驅者嘗試做「自託管 (Self-Custody)」。方向是對的，但時間錯了。<br/>
                他們死於 <span className="text-red-400 font-bold">Ethereum L1 的高昂成本</span>。
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Monolith */}
              <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Monolith (TokenCard)</h3>
                    <span className="text-xs font-mono bg-gray-700 px-2 py-1 rounded text-gray-300">First DeFi Card</span>
                  </div>
                  <Coins className="text-gray-500 w-8 h-8" />
                </div>
                <ul className="space-y-4 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>理想：直接扣合約錢包，不需預付。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>死因：買一杯 $5 咖啡，要付 <span className="text-white font-bold">$15 Gas Fee</span>。</span>
                  </li>
                </ul>
              </div>

              {/* Argent */}
              <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Argent Wallet</h3>
                    <span className="text-xs font-mono bg-gray-700 px-2 py-1 rounded text-gray-300">Gas Subsidy</span>
                  </div>
                  <Shield className="text-gray-500 w-8 h-8" />
                </div>
                <ul className="space-y-4 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>理想：為了使用者體驗，官方補貼 Gas (Meta-tx)。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>死因：DeFi Summer Gas 暴漲，專案方<span className="text-white font-bold">燒不起錢</span>，被迫停止。</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 text-center text-gray-500 text-sm italic">
              "Right idea, wrong infrastructure."
            </div>
          </div>
        );

      // SLIDE 5: GEN 3 - ETHER.FI CASH
      case 4:
        return (
          <div className="h-full flex flex-col justify-center px-4 max-w-6xl mx-auto w-full">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 3 (2024-Present)</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  The Final Bridge
                </h2>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  為什麼現在可以了？<br/>
                  因為基礎設施 (L2) 終於跟上了夢想。
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4 p-4 bg-purple-900/20 border border-purple-500/30 rounded-xl">
                    <div className="bg-purple-500/20 p-3 rounded-lg h-fit">
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
                    <div className="bg-green-500/20 p-3 rounded-lg h-fit">
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

              <div className="flex-1 flex flex-col items-center">
                 <div className="relative w-72 h-72">
                    {/* Abstract Representation of Convergence */}
                    <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="relative z-10 bg-gray-900 border border-gray-700 p-8 rounded-3xl shadow-2xl h-full flex flex-col justify-center items-center text-center">
                      <Zap className="w-16 h-16 text-yellow-400 mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">Frictionless</h3>
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
          <div className="h-full flex flex-col justify-center items-center text-center px-4">
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              Just Use It.
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12 leading-relaxed">
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
      <header className="h-16 border-b border-gray-800 bg-gray-900/90 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl tracking-tighter">Blocktrend</span>
          <span className="text-gray-500">x</span>
          <span className="text-purple-400 font-semibold">ether.fi</span>
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

      {/* Main Slide Area */}
      <main className="flex-1 relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
        {renderSlide()}
      </main>

      {/* Footer Controls */}
      <footer className="h-16 border-t border-gray-800 bg-gray-900/90 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-50">
        <div className="text-xs text-gray-600">
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