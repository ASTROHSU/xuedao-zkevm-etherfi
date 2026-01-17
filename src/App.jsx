import React, { useState, useEffect } from 'react';
import { CreditCard, ArrowRight, Zap, Shield, TrendingUp, Wallet, History, ChevronRight, Activity, BookOpen, ChevronLeft, Pizza, AlertTriangle, Layers, XCircle, Coins, ArrowDown, QrCode, Store, Smartphone, Globe, Lock, CheckCircle, Landmark, RefreshCw, AlertCircle, Clock, Check } from 'lucide-react';

// --- Components ---

const ProcessChain = ({ steps }) => {
  return (
    <div className="w-full overflow-x-auto py-6">
      <div className="flex items-start justify-between min-w-max px-2">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          // Status styles
          const baseStyle = "flex flex-col items-center relative z-10 transition-all duration-500";
          let circleStyle = "w-12 h-12 rounded-full flex items-center justify-center border-2 mb-3 bg-gray-800 border-gray-600 text-gray-400";
          let lineStyle = "bg-gray-700";
          let textStyle = "text-gray-400";
          
          if (step.status === 'removed') {
            circleStyle = "w-12 h-12 rounded-full flex items-center justify-center border-2 mb-3 bg-red-900/20 border-red-500/50 text-red-500 opacity-50 grayscale";
            lineStyle = "bg-red-900/30";
            textStyle = "text-red-500/50 line-through decoration-red-500";
          } else if (step.status === 'new') {
            circleStyle = "w-14 h-14 rounded-full flex items-center justify-center border-2 mb-3 bg-green-900/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.3)] transform scale-110";
            lineStyle = "bg-green-500";
            textStyle = "text-green-400 font-bold";
          } else if (step.status === 'optimized') {
            circleStyle = "w-14 h-14 rounded-full flex items-center justify-center border-2 mb-3 bg-purple-900/20 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)] transform scale-110";
            lineStyle = "bg-purple-500";
            textStyle = "text-purple-400 font-bold";
          }

          const Icon = step.icon;

          return (
            <div key={index} className="flex items-center">
              <div className={baseStyle}>
                <div className={circleStyle}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-center w-24">
                  <p className={`text-xs md:text-sm whitespace-pre-wrap ${textStyle}`}>{step.label}</p>
                  {step.sub && <p className="text-[10px] text-gray-500 mt-1">{step.sub}</p>}
                </div>
              </div>
              
              {!isLast && (
                <div className={`h-1 w-8 md:w-16 mx-2 rounded ${lineStyle} transition-colors duration-500`}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

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
    <div className={`relative p-3 md:p-4 rounded-xl border backdrop-blur-sm ${colorClasses[color]} flex flex-col items-center text-center w-full lg:w-64 z-20 transition-all duration-300`}>
      <div className="mb-2 p-2 rounded-full bg-gray-900/50">
        <Icon className="w-5 h-5 md:w-6 md:h-6" />
      </div>
      <h4 className="font-bold text-white text-base md:text-lg mb-1">{title}</h4>
      <p className="text-[10px] md:text-xs text-gray-300 leading-relaxed">{desc}</p>
      
      <div className={`hidden lg:block absolute bg-gray-600/50 ${lineStyles[position] || ""}`}>
        <div className="absolute w-2 h-2 bg-white rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_white]"></div>
      </div>
    </div>
  );
};

const ProcessCard = ({ era, title, icon: Icon, mainText, flowSteps, outcome }) => {
  return (
    <div className="flex flex-col h-full w-full max-w-6xl mx-auto">
      <div className="text-center mb-6 shrink-0">
        <span className="font-mono text-sm tracking-widest text-purple-400 opacity-80 mb-2 block">{era}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Icon className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
          {title}
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">{mainText}</p>
      </div>

      <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-4 md:p-8 mb-6 overflow-hidden flex-1 flex flex-col justify-center">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">The Process Flow</h4>
        <ProcessChain steps={flowSteps} />
      </div>

      <div className="bg-gray-800/80 p-4 rounded-xl border border-gray-700 shrink-0">
        <div className="flex items-start gap-3">
          <Activity className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
          <div>
            <h4 className="font-bold text-white text-sm mb-1">Outcome Analysis</h4>
            <p className="text-gray-400 text-sm leading-relaxed">{outcome}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 11; 

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

      // SLIDE 1: ANATOMY & TARGET STATE
      case 1:
        return (
          <div className="flex flex-col justify-center px-4 max-w-7xl mx-auto w-full py-8 md:py-12 min-h-full overflow-y-auto">
            <div className="text-center mb-8 shrink-0">
              <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">THE GOAL (END IN MIND)</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-2">
                Anatomy of Ether.fi Cash
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                這是我們的終極目標：把所有複雜技術都藏在後端，讓前端回歸最簡單的刷卡。
              </p>
            </div>

            {/* Anatomy Grid */}
            <div className="relative flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-3 gap-4 lg:gap-8 items-center justify-center h-auto w-full max-w-5xl mx-auto mb-12">
              <div className="lg:col-start-2 lg:row-start-2 z-10 w-full flex justify-center order-1 lg:order-none mb-8 lg:mb-0">
                <div className="relative w-64 h-40 md:w-72 md:h-44 bg-gradient-to-br from-purple-900 to-gray-900 rounded-2xl border border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.3)] flex flex-col justify-between p-6 transform hover:scale-105 transition-transform duration-500">
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
              <div className="lg:col-start-2 lg:row-start-1 flex justify-center order-2 lg:order-none w-full"><AnatomyPart icon={Globe} title="Visa Network" desc="解決「換幣」難題。" position="bottom" color="blue" /></div>
              <div className="lg:col-start-2 lg:row-start-3 flex justify-center order-3 lg:order-none w-full"><AnatomyPart icon={Layers} title="Scroll zkEVM" desc="解決「Gas Fee」。" position="top" color="yellow" /></div>
              <div className="lg:col-start-1 lg:row-start-2 flex justify-center order-4 lg:order-none w-full"><AnatomyPart icon={Lock} title="Smart Wallet" desc="解決「自託管」。" position="right" color="green" /></div>
              <div className="lg:col-start-3 lg:row-start-2 flex justify-center order-5 lg:order-none w-full"><AnatomyPart icon={TrendingUp} title="Token Rewards" desc="解決「誘因」。" position="left" color="purple" /></div>
            </div>

            {/* The Final Payment Logic */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 w-full max-w-4xl mx-auto">
              <h4 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> The Final Experience (Current)
              </h4>
              <ProcessChain steps={[
                { label: "User", icon: Wallet, status: 'normal' },
                { label: "Tap Card", icon: Smartphone, status: 'optimized', sub: "Apple Pay" },
                { label: "Processing", icon: Layers, status: 'optimized', sub: "Scroll zkEVM" },
                { label: "Coffee", icon: CheckCircle, status: 'new', sub: "Instant" }
              ]} />
            </div>
          </div>
        );

      // SLIDE 2: GEN 0 - THE LONG CHAIN
      case 2:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 md:py-0 min-h-full">
            <ProcessCard 
              era="GEN 0 (2010)"
              title="The Start: Bitcoin Pizza"
              icon={Pizza}
              mainText="一切的起點。這是一個純手工、高摩擦、高溢價的交易流程。看看它到底有多長。"
              flowSteps={[
                { label: "Laszlo", icon: Wallet, status: 'normal' },
                { label: "Forum Post", icon: Layers, status: 'normal', sub: "尋找對手方" },
                { label: "Waiting", icon: Clock, status: 'normal', sub: "4 Days" },
                { label: "Jercos", icon: Activity, status: 'normal', sub: "中介者" },
                { label: "Fiat Pay", icon: CreditCard, status: 'normal', sub: "Jercos 刷卡" },
                { label: "Delivery", icon: Pizza, status: 'normal' },
                { label: "BTC Tx", icon: Coins, status: 'normal', sub: "L1 Transfer" },
                { label: "Confirm", icon: Check, status: 'normal', sub: "10 Mins" }
              ]}
              outcome={`為了完成一筆交易，Laszlo 需要經歷 8 個步驟、等待 4 天，並支付 64% 的溢價。\n這是 P2P 的雛形，但完全不可擴展。`}
            />
          </div>
        );

      // SLIDE 3: EXCHANGES (2010-2012)
      case 3:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 md:py-0 min-h-full">
            <ProcessCard 
              era="ERA 1 (2010-2012)"
              title="Exchange Era"
              icon={Landmark}
              mainText="交易所解決了「媒合」問題，但把支付變成了「兩段式」。"
              flowSteps={[
                { label: "User", icon: Wallet, status: 'normal' },
                { label: "Deposit", icon: Landmark, status: 'new', sub: "Fiat In" },
                { label: "Trade", icon: RefreshCw, status: 'optimized', sub: "Instant Match" },
                { label: "Withdraw", icon: Landmark, status: 'new', sub: "Fiat Out" },
                { label: "Spend", icon: CreditCard, status: 'normal', sub: "Fiat" },
                { label: "Goods", icon: CheckCircle, status: 'normal' }
              ]}
              outcome={`進步：消滅了「Forum Post」和漫長的「Waiting」。\n代價：增加了「充值」與「提現」步驟。你還是不能直接用幣付錢。`}
            />
          </div>
        );

      // SLIDE 4: MERCHANTS (2013-2016)
      case 4:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 md:py-0 min-h-full">
            <ProcessCard 
              era="ERA 2 (2013-2016)"
              title="Direct Merchants"
              icon={Store}
              mainText="商家 (Overstock) 願意收幣了。流程變短了，但體驗很糟。"
              flowSteps={[
                { label: "User", icon: Wallet, status: 'normal' },
                { label: "Scan QR", icon: QrCode, status: 'new', sub: "Manual" },
                { label: "Input Amt", icon: Smartphone, status: 'new', sub: "Manual" },
                { label: "Wait", icon: Clock, status: 'removed', sub: "Confirmations" },
                { label: "Goods", icon: CheckCircle, status: 'normal' }
              ]}
              outcome={`進步：可以直接付幣，不用先換回法幣。\n代價：UX 惡夢。掃碼、輸入金額、等待區塊確認 (10-60分鐘)。\n這是一個「能用但沒人想用」的狀態。`}
            />
          </div>
        );

      // SLIDE 5: PROCESSORS (2014-2018)
      case 5:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 md:py-0 min-h-full">
            <ProcessCard 
              era="ERA 3 (2014-2018)"
              title="Payment Processors"
              icon={RefreshCw}
              mainText="BitPay 出現。解決了商家的波動風險，但沒解決消費者的麻煩。"
              flowSteps={[
                { label: "User", icon: Wallet, status: 'normal' },
                { label: "Scan QR", icon: QrCode, status: 'removed', sub: "Still Needed" },
                { label: "Processor", icon: RefreshCw, status: 'new', sub: "Auto-Sell" },
                { label: "Merchant", icon: Store, status: 'optimized', sub: "Gets Fiat" },
                { label: "Goods", icon: CheckCircle, status: 'normal' }
              ]}
              outcome={`改變：後端加了 Processor 幫商家賣幣。\n現狀：對消費者來說，依然是「掃碼 + 轉帳」。沒有省下任何步驟。`}
            />
          </div>
        );

      // SLIDE 6: TECH (2016-2019)
      case 6:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 md:py-0 min-h-full">
            <ProcessCard 
              era="ERA 4 (2016-2019)"
              title="Tech Improvements"
              icon={Zap}
              mainText="閃電網路與穩定幣。速度快了，幣價穩了，但動作沒變。"
              flowSteps={[
                { label: "User", icon: Wallet, status: 'normal' },
                { label: "Setup", icon: Layers, status: 'new', sub: "Channels" },
                { label: "Scan QR", icon: QrCode, status: 'removed', sub: "Still Needed" },
                { label: "Transfer", icon: Zap, status: 'optimized', sub: "Fast" },
                { label: "Goods", icon: CheckCircle, status: 'normal' }
              ]}
              outcome={`進步：等待時間縮短 (Fast Tx)。\n瓶頸：還是要「操作錢包」。這不是刷卡，這還是轉帳。人類的行為習慣很難改變。`}
            />
          </div>
        );

      // SLIDE 8 (Formerly 4): GEN 1 - CEX CARDS
      case 7:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 md:py-0 min-h-full">
            <ProcessCard 
              era="GEN 1 (2019-2022)"
              title="The Centralized Card"
              icon={CreditCard}
              mainText="終於！卡片出現了。它第一次把所有摩擦都藏起來。"
              flowSteps={[
                { label: "User", icon: Wallet, status: 'normal' },
                { label: "Deposit", icon: Landmark, status: 'new', sub: "To CEX" },
                { label: "Swipe", icon: CreditCard, status: 'optimized', sub: "Visa" },
                { label: "Auto-Swap", icon: RefreshCw, status: 'optimized', sub: "Backend" },
                { label: "Coffee", icon: CheckCircle, status: 'new' }
              ]}
              outcome={`突破：不用掃碼、不用等待，像刷卡一樣簡單。\n代價：必須把錢存進交易所 (Custody Risk)。這不是你的錢包，是交易所的帳戶。`}
            />
          </div>
        );

      // SLIDE 9 (Formerly 5): GEN 2 - THE FAILED PIONEERS
      case 8:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 md:py-0 min-h-full">
            <ProcessCard 
              era="GEN 2 (2018-2020)"
              title="Self-Custody (L1)"
              icon={Lock}
              mainText="Monolith / Argent 試圖拿回控制權，讓卡片直接連錢包。"
              flowSteps={[
                { label: "User Wallet", icon: Lock, status: 'optimized', sub: "Self-Custody" },
                { label: "Swipe", icon: CreditCard, status: 'normal' },
                { label: "L1 Gas", icon: AlertTriangle, status: 'removed', sub: "$15 Fee!" },
                { label: "Coffee", icon: XCircle, status: 'removed', sub: "Failed" }
              ]}
              outcome={`理想：直接扣錢包，不用存交易所。\n死因：以太坊 L1 手續費太貴。買杯咖啡 $5，手續費 $15。商業模式不成立。`}
            />
          </div>
        );

      // SLIDE 10 (Formerly 6): GEN 3 - ETHER.FI CASH
      case 9:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 md:py-0 min-h-full">
            <ProcessCard 
              era="GEN 3 (2024-Present)"
              title="Ether.fi Cash"
              icon={CheckCircle}
              mainText="Scroll (L2) + Ether.fi (Yield) 終於完成了最後一哩路。"
              flowSteps={[
                { label: "User Wallet", icon: Lock, status: 'optimized', sub: "Earning 4%" },
                { label: "Swipe", icon: CreditCard, status: 'normal' },
                { label: "L2 Gas", icon: Layers, status: 'optimized', sub: "< $0.01" },
                { label: "Coffee", icon: CheckCircle, status: 'new' }
              ]}
              outcome={`終極形態：\n1. 自託管 (Safe)\n2. 低成本 (Scroll)\n3. 賺收益 (Ether.fi)\n\n這就是為什麼我們花了 15 年才走到這裡。`}
            />
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