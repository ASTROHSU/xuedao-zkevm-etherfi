import React, { useState, useEffect } from 'react';
import { CreditCard, ArrowRight, Layers, Zap, Shield, TrendingUp, Wallet, History, ChevronRight, Activity, BookOpen, ChevronLeft, Maximize2 } from 'lucide-react';

// --- Shared Components ---

const Card = ({ title, icon: Icon, children }) => (
  <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 h-full">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-purple-500/20 rounded-lg">
        <Icon className="w-6 h-6 text-purple-400" />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <div className="text-gray-300 leading-relaxed text-sm">
      {children}
    </div>
  </div>
);

const EvolutionStep = ({ year, title, desc, isActive, onClick }) => (
  <div 
    onClick={onClick}
    className={`cursor-pointer p-4 rounded-xl transition-all duration-300 border mb-3 last:mb-0 ${
      isActive 
        ? 'bg-purple-900/30 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)] translate-x-2' 
        : 'bg-gray-800/30 border-transparent hover:bg-gray-800 hover:translate-x-1'
    }`}
  >
    <div className="flex justify-between items-center mb-1">
      <span className="text-xs font-mono text-purple-400">{year}</span>
      {isActive && <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />}
    </div>
    <h3 className={`font-bold text-white mb-1 ${isActive ? 'text-lg' : 'text-base'}`}>{title}</h3>
    <p className={`text-xs text-gray-400 transition-all duration-300 line-clamp-2 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
      {desc}
    </p>
  </div>
);

const ArticleCard = ({ date, title, content }) => (
  <div className="bg-gray-900/80 border border-gray-700 p-4 rounded-lg mb-3 hover:border-purple-500/50 transition-colors last:mb-0">
    <div className="flex items-center gap-2 mb-2 text-[10px] font-mono text-purple-400 uppercase tracking-wider">
      <BookOpen className="w-3 h-3" />
      {date} • Blocktrend Archive
    </div>
    <h4 className="font-bold text-white mb-2 text-sm">{title}</h4>
    <p className="text-gray-400 text-xs leading-relaxed border-l-2 border-gray-700 pl-3 italic">
      "{content}"
    </p>
  </div>
);

// --- Main App Component ---

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeEra, setActiveEra] = useState(2); // Default to latest era

  const totalSlides = 5;

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

  const eras = [
    {
      year: "Gen 1.0 (2016-2020)",
      title: "CEX 預付卡 (Prepaid)",
      desc: "充值法幣或賣出加密貨幣。本質是「變現」。需要手動操作，高滑點。",
      detail: "早期階段，重點在於讓加密貨幣「能用」。但每一筆都是 Tax Event。",
      articles: [
        {
          date: "Mar 10, 2020",
          title: "Coinbase 成為 Visa 主要會員",
          content: "消費者花掉比特幣，商家拿到現金。這是最早期的隱形支付嘗試，但仍需中心化機構轉換。"
        },
        {
          date: "May 26, 2020",
          title: "全通路 5% 回饋神卡：CRO Visa 卡",
          content: "犧牲了「去中心化」換取便利性。容易讓人忽視風險，但大幅降低了入門門檻。"
        }
      ]
    },
    {
      year: "Gen 2.0 (2021-2023)",
      title: "DeFi 簽帳卡 (Debit)",
      desc: "非託管錢包連接。直接扣除 USDC。去中心化但無資金效率。",
      detail: "中期階段，重點在於「自託管 (Self-Custody)」與基礎建設打通。",
      articles: [
        {
          date: "Dec 08, 2020",
          title: "Visa 將數位美金放進全球支付網路",
          content: "Visa 態度 180 度大轉變。這標誌著穩定幣從交易工具轉變為支付結算貨幣的開始。"
        },
        {
          date: "Nov 14, 2023",
          title: "Gnosis Pay：直接從錢包扣款",
          content: "Gnosis Pay 的出現是一大創舉：卡片資金在個人錢包。這標誌著 Self-custody 支付的真正開始。"
        }
      ]
    },
    {
      year: "Gen 3.0 (2024-Present)",
      title: "Ether.fi Cash (Credit)",
      desc: "基於資產的信用消費。LRT 繼續質押生息，消費時自動借款。",
      detail: "成熟階段。追求「資金效率」與「資產增值」。消費不再是賣幣，而是借貸。",
      articles: [
        {
          date: "May 08, 2025",
          title: "穩定幣支付卡大爆發！Visa 是 L2",
          content: "Visa 就像以太坊上的第二層網路（L2），讓交易更有效率。這為 Ether.fi 的出現鋪平了道路。"
        },
        {
          date: "Jun 05, 2025",
          title: "全球首張直接從錢包扣款的支付卡",
          content: "實測磨損只有 0.7%，加上消費回饋還能倒賺！這是正回饋（Positive Carry）的終極型態。"
        }
      ]
    }
  ];

  // --- Slides Content ---

  const renderSlide = () => {
    switch(currentSlide) {
      // SLIDE 1: INTRO
      case 0:
        return (
          <div className="flex flex-col justify-center items-center h-full text-center px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-sm mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              XueDAO Meetup • Taipei
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 leading-tight">
              Spending without <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Selling.</span>
            </h1>
            
            <p className="text-xl md:text-3xl text-gray-400 max-w-3xl leading-relaxed mb-12">
              從「變現消費」到「資產抵押」。<br/>
              解析 Ether.fi 如何在 Scroll 上重塑 DeFi 的最後一哩路。
            </p>

            <div className="flex items-center gap-4 bg-gray-800/40 p-4 rounded-full pr-8 border border-gray-700/50">
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">A</div>
              <div className="text-left">
                <p className="font-bold text-white text-lg">Astro Hsu</p>
                <p className="text-sm text-gray-400">Founder, Blocktrend</p>
              </div>
            </div>
          </div>
        );

      // SLIDE 2: EVOLUTION
      case 1:
        return (
          <div className="h-full flex flex-col px-4 pt-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3 shrink-0">
              <History className="text-purple-400 w-8 h-8" />
              The Evolution of Crypto Cards
            </h2>
            <p className="text-gray-400 mb-6 text-lg shrink-0">
              我從 2020 年開始追蹤此領域，這是一條從「中心化變現」走向「去中心化信用」的漫長道路。
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
              {/* Left: Timeline Selection */}
              <div className="md:w-1/3 flex flex-col overflow-y-auto pr-2">
                {eras.map((era, index) => (
                  <EvolutionStep 
                    key={index}
                    {...era}
                    isActive={activeEra === index}
                    onClick={() => setActiveEra(index)}
                  />
                ))}
              </div>

              {/* Right: Detail Content */}
              <div className="md:w-2/3 bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden flex flex-col h-full">
                <div className="p-6 border-b border-gray-700/50 bg-gray-800/80 shrink-0">
                  <h3 className="text-2xl font-bold text-purple-300 mb-2">
                    {eras[activeEra].title}
                  </h3>
                  <p className="text-base text-gray-300">
                    {eras[activeEra].detail}
                  </p>
                </div>
                
                <div className="p-6 bg-gray-900/30 overflow-y-auto flex-1 custom-scrollbar">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2 sticky top-0 bg-gray-900/0 backdrop-blur-sm py-2 z-10">
                    <Activity className="w-3 h-3" />
                    Blocktrend Archives
                  </h4>
                  <div className="space-y-3">
                    {eras[activeEra].articles.map((article, idx) => (
                      <ArticleCard key={idx} {...article} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // SLIDE 3: ETHER.FI CASH FEATURES
      case 2:
        return (
          <div className="h-full flex flex-col justify-center px-4">
            <div className="mb-10 text-center">
              <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 3.0</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why ether.fi Cash is Different?
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                它站在前人的肩膀上。它不是一張 Debit Card，它是一張由你的 LRT 資產擔保的 Credit Card。
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
              <Card title="Keep the Yield" icon={TrendingUp}>
                你的資金以 <span className="text-purple-400 font-bold">eETH/weETH</span> 形式存在。
                在你還款之前，持續產生 <span className="text-white font-bold">3-5% Staking Yield</span> + EigenLayer Points。
              </Card>

              <Card title="Spend = Borrow" icon={Wallet}>
                消費當下<span className="text-white font-bold">不賣幣</span>。系統自動根據你的資產額度進行借貸。
                你可以選擇最佳時機還款，或用收益自動還款 (Self-repaying)。
              </Card>

              <Card title="Tax Efficiency" icon={Shield}>
                對於許多司法管轄區而言，<span className="text-white font-bold">"借款" 不是應稅事件</span>，但 "賣幣" 是。
                這讓高淨值用戶能更靈活地管理稅務。
              </Card>

              <Card title="Smooth UX" icon={CreditCard}>
                支援 Apple Pay 與 Google Pay。
                這不是未來的概念，是現在就能在台北大安區買飲料的技術。
              </Card>
            </div>
          </div>
        );

      // SLIDE 4: INFRASTRUCTURE (SCROLL)
      case 3:
        return (
          <div className="h-full flex flex-col justify-center px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center max-w-6xl mx-auto">
              <div className="flex-1">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                  Powered by <br/>
                  <span className="text-[#FFF0DD] drop-shadow-[0_0_15px_rgba(255,240,221,0.2)]">Scroll zkEVM</span>
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="p-3 bg-yellow-500/10 rounded-xl h-fit">
                      <Zap className="w-8 h-8 text-yellow-500" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2">極低成本 (Low Cost)</h4>
                      <p className="text-gray-400 leading-relaxed">
                        頻繁的小額消費（買咖啡 $5）在 L1 上是不可能的。
                        zkEVM 讓結算成本趨近於零，這才讓「消費即借貸」的頻繁互動成為可能。
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl h-fit">
                      <Layers className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2">DeFi 可組合性</h4>
                      <p className="text-gray-400 leading-relaxed">
                        Scroll 生態系統對 DeFi 的深度支持，讓 Ether.fi 的流動性池能無縫與 Aave 等借貸協議互動，實現自動化管理。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 w-full">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl border border-gray-700 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[50px] rounded-full"></div>
                  
                  <div className="flex justify-between items-center mb-8">
                     <div className="text-sm font-mono text-gray-400">RECEIPT #0X1234</div>
                     <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded font-bold">COMPLETED</div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-gray-700 pb-6">
                      <span className="text-xl text-gray-300">Coffee @ Taipei</span>
                      <span className="text-2xl text-white font-mono font-bold">$5.00</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Borrow Amount</span>
                        <span className="text-white font-mono">5.00 USDC</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                         <span className="text-gray-400">Gas Fee (Scroll)</span>
                         <span className="text-green-400 font-mono">{'<'} $0.01</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                         <span className="text-gray-400">Collateral Yield</span>
                         <span className="text-purple-400 font-mono flex items-center gap-1">
                           <TrendingUp className="w-3 h-3" /> Still Earning
                         </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-700/30 rounded-xl flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-yellow-200">Settled on Scroll zkEVM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // SLIDE 5: CTA
      case 4:
        return (
          <div className="h-full flex flex-col justify-center items-center text-center px-4">
            <div className="w-24 h-24 bg-purple-500/10 rounded-full flex items-center justify-center mb-8 border border-purple-500/30">
              <Activity className="w-12 h-12 text-purple-500" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              Real Usage is Here.
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12 leading-relaxed">
              Web3 不再只是螢幕上的數字。<br/>
              透過 Ether.fi 與 Scroll，我們終於能將鏈上的流動性，<br/>
              無縫注入現實生活的每一筆消費。
            </p>
            
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 p-8 rounded-2xl max-w-md w-full hover:border-purple-500 transition-all duration-300 group cursor-pointer">
              <p className="text-purple-400 font-bold mb-2 text-sm uppercase tracking-widest">NEXT SESSION</p>
              <h3 className="text-2xl font-bold text-white mb-4">Hands-on Guidance</h3>
              <p className="text-gray-400 text-sm mb-6">接下來會有實際的操作教學環節，帶大家註冊與體驗。</p>
              
              <button className="w-full bg-purple-600 group-hover:bg-purple-500 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-lg">
                Get Started <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
      <main className="flex-1 relative overflow-hidden">
        {renderSlide()}
      </main>

      {/* Footer Navigation Controls */}
      <footer className="h-16 border-t border-gray-800 bg-gray-900/90 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-50">
        <div className="text-xs text-gray-600">
          XueDAO Meetup • Jan 17 • Taipei
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