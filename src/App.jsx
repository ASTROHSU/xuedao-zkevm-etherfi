import React, { useState } from 'react';
import { CreditCard, ArrowRight, Layers, Zap, Shield, TrendingUp, Wallet, History, ChevronRight, Activity, BookOpen, Quote } from 'lucide-react';

const SlideSection = ({ children, className = "" }) => (
  <section className={`min-h-screen flex flex-col justify-center px-6 py-12 border-b border-gray-800 ${className}`}>
    <div className="max-w-4xl mx-auto w-full">
      {children}
    </div>
  </section>
);

const Card = ({ title, icon: Icon, children }) => (
  <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-purple-500/20 rounded-lg">
        <Icon className="w-6 h-6 text-purple-400" />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <div className="text-gray-300 leading-relaxed">
      {children}
    </div>
  </div>
);

const EvolutionStep = ({ year, title, desc, isActive, onClick }) => (
  <div 
    onClick={onClick}
    className={`cursor-pointer p-6 rounded-xl transition-all duration-300 border h-full flex flex-col ${
      isActive 
        ? 'bg-purple-900/30 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
        : 'bg-gray-800/30 border-transparent hover:bg-gray-800'
    }`}
  >
    <div className="text-sm font-mono text-purple-400 mb-2">{year}</div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className={`text-sm text-gray-400 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
      {desc}
    </p>
  </div>
);

const ArticleCard = ({ date, title, content }) => (
  <div className="bg-gray-900/80 border border-gray-700 p-5 rounded-lg mb-4 hover:border-purple-500/50 transition-colors">
    <div className="flex items-center gap-2 mb-2 text-xs font-mono text-purple-400">
      <BookOpen className="w-3 h-3" />
      {date} • Blocktrend Archive
    </div>
    <h4 className="font-bold text-white mb-2 text-base">{title}</h4>
    <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-gray-700 pl-3 italic">
      "{content}"
    </p>
  </div>
);

const App = () => {
  const [activeEra, setActiveEra] = useState(2);

  const eras = [
    {
      year: "Gen 1.0 (2016-2020)",
      title: "CEX 預付卡 (Prepaid)",
      desc: "充值法幣或賣出加密貨幣。本質是「變現」。需要手動操作，高滑點。",
      detail: "早期階段，重點在於讓加密貨幣「能用」。",
      articles: [
        {
          date: "Mar 10, 2020",
          title: "Coinbase 成為 Visa 主要會員 — 加密貨幣支付隱形化",
          content: "消費者選擇以 Coinbase Visa 支付... Coinbase 再從消費者帳戶內扣除等值的加密貨幣。商家拿到現金，消費者花掉比特幣，大家都開心。這是最早期的隱形支付嘗試。"
        },
        {
          date: "May 26, 2020",
          title: "全通路 5% 回饋神卡：CRO / MCO Visa 卡",
          content: "MCO Visa 大幅降低了人們接觸加密貨幣的門檻... 但也容易讓人一不小心就忽視了它的風險。這類卡片犧牲了「去中心化」，但也讓人們換到了便利性。"
        }
      ]
    },
    {
      year: "Gen 2.0 (2021-2023)",
      title: "DeFi 簽帳卡 (Debit)",
      desc: "非託管錢包連接。直接扣除 USDC。雖然去中心化，但失去了資金效率。",
      detail: "中期階段，重點在於「自託管 (Self-Custody)」與基礎建設的打通。",
      articles: [
        {
          date: "Dec 08, 2020",
          title: "Visa 將數位美金（USDC）放進全球支付網路",
          content: "Visa 態度 180 度大轉變，讓 USDC 直接進入全球支付網路。Visa 估計，每年透過支票以及電匯進行的付款達 120 兆美元... 這是基礎建設的關鍵轉折。"
        },
        {
          date: "Nov 14, 2023",
          title: "Gnosis Pay：直接從錢包扣款的 Visa 金融卡",
          content: "Gnosis Pay 的出現是一大創舉：卡片資金不是放在交易所，也不是銀行帳戶，而是個人錢包。這標誌著 Self-custody 支付的真正開始。"
        }
      ]
    },
    {
      year: "Gen 3.0 (2024-Present)",
      title: "Ether.fi Cash (Credit)",
      desc: "基於資產的信用消費。你的 ETH/LRT 繼續質押生息，消費時自動借款。",
      detail: "成熟階段。基礎設施完備，現在我們追求的是「資金效率」與「資產增值」。",
      articles: [
        {
          date: "May 08, 2025",
          title: "穩定幣支付卡大爆發！Visa 是以太坊第二層網路",
          content: "穩定幣已經脫離原本的交易避險工具，成為日常消費的支付工具。Visa 就像以太坊上的第二層網路（L2），讓交易更有效率。這為 Ether.fi 的出現鋪平了道路。"
        },
        {
          date: "Jun 05, 2025",
          title: "全通路 4% 消費回饋！Ether.fi Cash：全球首張直接從錢包扣款的加密支付卡",
          content: "Ether.fi Cash 就像是連動你口袋鈔票的支付卡，一刷口袋裡面的鈔票就自動跑出去了... 實測磨損只有 0.7%，加上消費回饋，不只能抵銷竟然還能倒賺！"
        }
      ]
    }
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100 font-sans selection:bg-purple-500 selection:text-white">
      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tighter">Blocktrend</span>
            <span className="text-gray-500">x</span>
            <span className="text-purple-400 font-semibold">ether.fi</span>
          </div>
          <div className="text-xs md:text-sm font-mono text-gray-400">
            XueDAO Meetup • Jan 17
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <SlideSection className="pt-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-sm mb-6 w-fit">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          Live in Taipei
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
          Spending without <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Selling.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed mb-8">
          支付卡演變史：從「變現消費」到「資產抵押」。<br/>
          解析 Ether.fi 如何在 Scroll 上重塑 DeFi 的最後一哩路。
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
               {/* Placeholder for Astro's Avatar if needed, using generic icon for now */}
               <div className="w-full h-full flex items-center justify-center bg-purple-600 text-white font-bold">A</div>
            </div>
            <div>
              <p className="font-bold text-white">Astro Hsu</p>
              <p className="text-sm text-gray-400">Founder, Blocktrend</p>
            </div>
          </div>
        </div>
      </SlideSection>

      {/* The Problem / Context */}
      <SlideSection>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-4">
          <History className="text-purple-400" />
          The Evolution
        </h2>
        <p className="text-gray-400 mb-10 text-lg">
          我從 2020 年開始追蹤加密貨幣支付卡的發展，這是一條從「中心化變現」走向「去中心化信用」的漫長道路。
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {eras.map((era, index) => (
            <EvolutionStep 
              key={index}
              {...era}
              isActive={activeEra === index}
              onClick={() => setActiveEra(index)}
            />
          ))}
        </div>

        {/* Detailed View Panel */}
        <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden">
          <div className="p-8 border-b border-gray-700/50">
            <h3 className="text-2xl font-bold text-purple-300 mb-2">
              {eras[activeEra].title}
            </h3>
            <p className="text-lg text-gray-300">
              {eras[activeEra].desc}
            </p>
          </div>
          
          <div className="p-8 bg-gray-900/30">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Blocktrend Archives (Historical Context)
            </h4>
            
            <div className="grid md:grid-cols-1 gap-4">
              {eras[activeEra].articles.map((article, idx) => (
                <ArticleCard key={idx} {...article} />
              ))}
            </div>
          </div>
        </div>
      </SlideSection>

      {/* The Solution: Ether.fi Cash */}
      <SlideSection>
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Gen 3.0: Why ether.fi Cash is Different?
          </h2>
          <p className="text-xl text-gray-400">
            它站在前人的肩膀上。它不是一張 Debit Card，它是一張由你的 LRT 資產擔保的 Credit Card。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Keep the Yield" icon={TrendingUp}>
            當你用 USDC 買咖啡時，你的錢就沒了。但在 Ether.fi，你的資金是以 
            <span className="text-purple-400 font-bold"> eETH/weETH </span> 
            形式存在。在你還款之前，這些資產持續產生 3-5% 的 Staking 收益 + EigenLayer Points。
          </Card>

          <Card title="Spend = Borrow" icon={Wallet}>
            消費當下不賣幣。系統自動根據你的資產額度進行借貸（Borrowing）。
            你可以選擇在最佳時機還款（Repay），或是用收益自動還款（Self-repaying loans）。
          </Card>

          <Card title="Tax Efficiency" icon={Shield}>
            對於許多司法管轄區而言，"借款" 不是應稅事件，但 "賣幣" 是。
            這讓高淨值用戶能更靈活地管理稅務。
          </Card>

          <Card title="Smooth UX" icon={CreditCard}>
            支援 Apple Pay 與 Google Pay。這不是未來的概念，是現在就能在台北大安區買飲料的技術。
          </Card>
        </div>
      </SlideSection>

      {/* Infrastructure: Scroll */}
      <SlideSection>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Powered by <span className="text-[#FFF0DD] drop-shadow-[0_0_10px_rgba(255,240,221,0.3)]">Scroll</span>
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              為什麼 Ether.fi 選擇 Scroll 作為這張卡的結算層？
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white">低延遲與低成本</h4>
                  <p className="text-gray-400 text-sm">頻繁的小額消費（買咖啡、搭捷運）在 L1 上是不可能的。zkEVM 讓結算成本趨近於零。</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Layers className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white">原生整合 (Native Integration)</h4>
                  <p className="text-gray-400 text-sm">Scroll 生態系統對 DeFi 的深度支持，讓 Ether.fi 的流動性池能無縫運作。</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="flex-1 bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 w-full">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                <span className="text-gray-400">Transaction</span>
                <span className="text-white font-mono">Coffee @ Taipei</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Cost</span>
                <span className="text-purple-400 font-mono">-$5.00 USDC</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Yield Earned (Pending)</span>
                <span className="text-green-400 font-mono">+$0.02 eETH</span>
              </div>
              <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded text-xs text-yellow-200 text-center">
                Settled on Scroll zkEVM
              </div>
            </div>
          </div>
        </div>
      </SlideSection>

      {/* CTA / Summary */}
      <SlideSection className="border-b-0">
        <div className="text-center max-w-3xl mx-auto">
          <Activity className="w-16 h-16 text-purple-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Real Usage is Here.</h2>
          <p className="text-xl text-gray-400 mb-10">
            Web3 不再只是螢幕上的數字。透過 Ether.fi 與 Scroll，
            我們終於能將鏈上的流動性，無縫注入現實生活的每一筆消費。
          </p>
          
          <div className="bg-purple-600/20 border border-purple-500/50 p-6 rounded-xl inline-block">
            <p className="text-white font-bold mb-2">Ready to try?</p>
            <p className="text-purple-200 text-sm mb-4">接下來會有實際的 Sign-Up Guidance 環節</p>
            <button className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2 mx-auto">
              Get Started <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </SlideSection>

      <footer className="py-8 text-center text-gray-600 text-sm border-t border-gray-800">
        <p>© 2025 Blocktrend. Created for XueDAO Meetup.</p>
      </footer>
    </div>
  );
};

export default App;