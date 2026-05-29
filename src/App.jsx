import React, { useState, useEffect } from 'react';
import {
  CreditCard, ArrowRight, Zap, Shield, TrendingUp, Wallet,
  History, ChevronRight, Activity, BookOpen, ChevronLeft,
  Pizza, AlertTriangle, Layers, XCircle, Coins, ArrowDown,
  QrCode, Store, Smartphone, Globe, Lock, CheckCircle,
  Landmark, RefreshCw, AlertCircle, Banknote, Mail, Key, Fingerprint
} from 'lucide-react';

// --- Speaker notes (what you SAY — kept off the slides, toggle with N) ---

const speakerNotes = {
  0: `開場。我們從一個概念講起：你手上的比特幣，跟樓下那杯咖啡之間，其實隔了非常遠的距離。這段距離花了 15 年才被填平。今天就用「支付的演變」這條線，把這 15 年講完。`,
  1: `先給大家看終點長什麼樣子。今天理想的體驗：使用者付 USDC 或 ETH，中間透過 Visa 網絡自動換匯，商家收到的是 USD 或 TWD 法幣。三個步驟，聽起來理所當然。但這看似簡單的三步，區塊鏈世界整整花了 15 年才走完。接下來我們倒回去看每一代是怎麼卡住的。`,
  2: `Gen 0，2010 年 5 月 22 日，著名的比特幣披薩日。但重點不是披薩，而是「那時候根本沒有交易所」。沒有交易所就沒有公允報價，Laszlo 只能上論壇喊價，論壇上有人猜這 1 萬顆 BTC 大概值 41 美元。披薩成本其實只要 25 美元，等於他付了 41 美元的等值 BTC，溢價 64%。這 16 美元的價差，就是當時「用比特幣買東西」的摩擦成本。流程也很克難：Laszlo 發文 → Jercos 用信用卡幫他代付 → 法幣結算 → 披薩送到。`,
  3: `Era 1。2010 年 7 月 Mt. Gox 成立，比披薩日只晚兩個月。交易所把分散的流動性集中起來，報價終於透明、可查詢，解決了「幣值多少」的問題。但消費還是兩段式：你得先把幣賣掉換成法幣、提現、領現金，再去買東西。交易所解決了「幣變錢」，沒解決「支付」。摩擦沒有消失，只是換了位置。`,
  4: `Era 2，2013 到 2016。Overstock、Newegg 這些科技電商開始願意直接收幣，使用者體驗簡化了，幣直接轉給商家就好。但麻煩轉移到商家身上——商家收了幣，還是得自己跑去交易所賣掉換現金，一樣要承擔幣價波動。這種模式很難擴大到一般店家。`,
  5: `Era 3，2014 到 2018。BitPay、Coinbase Commerce 出現，幫商家自動換匯、鎖定匯率，商家終於沒有匯率風險了。但對消費者還是很痛：要等大約 10 分鐘區塊確認、要自己付礦工費、中間商給的匯率通常很差。是「可用」但「不好用」。`,
  6: `Era 4，2016 到 2019。技術一直在進步：閃電網絡讓交易變快，USDT 讓價值穩定，支付不用再等 10 分鐘。但根本問題沒解決——你還是只能在「支援加密貨幣」的特定店家消費。我想買咖啡、搭捷運、進便利商店，現實世界絕大多數場景只收 Visa/Mastercard。我們要的不是更快的轉帳，是通用的支付。`,
  7: `Gen 1，2019 到 2022，轉捩點。Crypto.com 把加密貨幣接上 Visa 支付網絡。使用者不用再找「願意收幣的店家」，只要認得 Visa 標誌就行，通路問題一次解決，全球 8000 萬商戶都能用。代價是託管：Visa 當時並不直接收幣，是交易所幫你發卡、後端換匯。本質上這只是一張「交易所帳戶的提款卡」，你的錢在交易所手上——FTX 之後大家都知道這意味著什麼。`,
  8: `Gen 2，2018 到 2020。有人想解決託管問題。Monolith（TokenCard）嘗試做自託管支付：資金鎖在你自己的合約錢包裡，消費前手動把錢充值到一個法幣緩衝區，Visa 再從那裡扣款。自託管是做到了，但代價慘重——流程斷層，每次消費前要先掏手機發一筆交易；而且每次充值都是一筆 L1 交易，充 10 美元可能就要付 5 到 10 美元的 Gas。太貴、太麻煩，所以失敗了。`,
  9: `Gen 3 上半場，2024。兩塊拼圖補上了。第一，Layer 2 的低手續費——Arbitrum、Optimism、Scroll 讓日常小額支付不用再跑在昂貴的 L1 上，吞吐量也夠了。第二，帳戶抽象化 AA——支援 Passkeys 和智慧合約錢包，可以用 FaceID 登入、告別助記詞，還能設定自動扣款、社交恢復，體驗像 Web2 一樣滑順。這兩塊一補上，現代加密支付卡才成立。`,
  10: `Gen 3 下半場。現在 Ether.fi、Coinbase、Bybit、RedotPay 百花齊放，體驗變成：只在儲值時碰一下 Crypto，消費的當下完全無感。用 Ether.fi Cash 拆給大家看四個零件怎麼各自解決一個歷史難題：Visa 網絡解決通用性、Scroll zkEVM 解決成本（就是 Monolith 當年缺的那塊）、智能錢包解決安全性也就是自託管、代幣獎勵解決誘因。商業模式是「收益」：協議希望你把資產存著產生 DeFi 收益，再拿收益補貼你的支付，吸引更多存款，形成正循環。`,
  11: `收尾。這條路走了 15 年，現在終於通了。與其聽我講，不如等一下拿手機出來，我們現場註冊、去樓下 7-11 買杯咖啡，你就懂了。`,
};

// --- Components ---

const ProcessStep = ({ icon: Icon, title, sub, isLast = false, isBad = false }) => (
  <div className="flex flex-col items-center relative z-10 group flex-1 min-w-0">
    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center mb-2 shadow-lg transition-all duration-300 shrink-0 ${
      isBad
        ? 'bg-red-500/10 border border-red-500/30 text-red-400 group-hover:bg-red-500/20'
        : 'bg-gray-800 border border-gray-700 text-purple-400 group-hover:border-purple-500'
    }`}>
      <Icon className="w-5 h-5 md:w-6 md:h-6" />
    </div>
    <h4 className="font-bold text-white text-xs md:text-sm text-center mb-0.5 w-full px-1 leading-tight">{title}</h4>
    <p className="text-[11px] md:text-xs text-gray-400 text-center leading-tight">{sub}</p>

    {!isLast && (
      <div className="hidden md:block absolute top-5 md:top-6 -right-[50%] w-full h-[2px] bg-gray-700 -z-10"></div>
    )}
  </div>
);

const FlowSection = ({ steps, title = "支付流程", className = "" }) => (
  <div className={`w-full ${className}`}>
    <div className="flex items-center gap-2 mb-3 opacity-60">
      <div className="h-[1px] bg-gray-700 flex-1"></div>
      <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">{title}</span>
      <div className="h-[1px] bg-gray-700 flex-1"></div>
    </div>
    <div className="flex flex-row justify-between items-start gap-2 relative">
       {steps.map((step, index) => (
         <ProcessStep
           key={index}
           icon={step.icon}
           title={step.title}
           sub={step.sub}
           isLast={index === steps.length - 1}
           isBad={step.isBad}
         />
       ))}
    </div>
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
    "top": "bottom-0 left-1/2 -translate-x-1/2 translate-y-full h-10 w-[2px]",
    "bottom": "top-0 left-1/2 -translate-x-1/2 -translate-y-full h-10 w-[2px]",
    "left": "right-0 top-1/2 -translate-y-1/2 translate-x-full w-8 h-[2px]",
    "right": "left-0 top-1/2 -translate-y-1/2 -translate-x-full w-8 h-[2px]"
  };

  return (
    <div className={`relative px-4 py-3 rounded-xl border backdrop-blur-sm ${colorClasses[color]} flex flex-col items-center text-center w-full lg:w-52 z-20 transition-all duration-300 hover:scale-[1.04]`}>
      <div className="mb-1.5 p-2 rounded-full bg-gray-900/50">
        <Icon className="w-5 h-5" />
      </div>
      <h4 className="font-bold text-white text-base mb-0.5">{title}</h4>
      <p className="text-xs text-gray-300/90 leading-snug">{desc}</p>

      <div className={`hidden lg:block absolute bg-gray-600/50 ${lineStyles[position] || ""}`}>
        <div className="absolute w-2 h-2 bg-white rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_white]"></div>
      </div>
    </div>
  );
};

// Era timeline slide: title + Q&A motif + punch line on the left, problems + flow on the right.
const TimelineCard = ({ title, era, icon: Icon, takeaway, problems = [], question, answer, theme = "blue", image, children }) => {
  const themes = {
    blue: "from-blue-900/50 to-gray-900 border-blue-500/30 text-blue-400",
    purple: "from-purple-900/50 to-gray-900 border-purple-500/30 text-purple-400",
    yellow: "from-yellow-900/50 to-gray-900 border-yellow-500/30 text-yellow-400",
    green: "from-green-900/50 to-gray-900 border-green-500/30 text-green-400",
  };
  const takeawayColor = {
    blue: "text-blue-300", purple: "text-purple-300", yellow: "text-yellow-300", green: "text-green-300",
  };

  return (
    <div className="flex flex-col justify-center min-h-full w-full max-w-6xl mx-auto">
      <div className={`flex flex-col lg:flex-row gap-5 items-stretch bg-gradient-to-br ${themes[theme]} p-5 md:p-7 rounded-2xl border w-full backdrop-blur-sm`}>
        {/* Left: the scaffold */}
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <span className="font-mono text-xs tracking-widest opacity-80 mb-1 block">{era}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{title}</h2>
          </div>

          <div className="bg-gray-900/40 p-3.5 rounded-xl border border-white/5">
             <div className="flex items-start gap-2.5 mb-2">
               <div className="bg-white/10 p-1 rounded text-[11px] font-bold text-white shrink-0">Q</div>
               <p className="text-gray-300 italic text-sm md:text-base">「{question}」</p>
             </div>
             <div className="flex items-start gap-2.5">
               <div className={`bg-${theme}-500/20 p-1 rounded text-[11px] font-bold text-${theme}-400 shrink-0`}>A</div>
               <p className={`text-${theme}-200 font-medium text-sm md:text-base`}>{answer}</p>
             </div>
          </div>

          {image && (
            <div className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/10 relative group shrink-0 bg-black/30">
               <img src={image} alt={title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          )}

          {takeaway && (
            <p className={`mt-auto text-2xl md:text-3xl font-bold leading-snug ${takeawayColor[theme]}`}>{takeaway}</p>
          )}
        </div>

        {/* Right: the problem + the flow visual */}
        <div className="flex-1 lg:w-1/2 bg-black/20 p-5 rounded-xl border border-white/5 relative overflow-hidden group flex flex-col gap-6 justify-between">
          <div className="relative z-10">
            <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <Icon className="w-56 h-56" />
            </div>
            <h3 className="text-sm font-bold text-gray-400 mb-3 flex items-center gap-2 uppercase tracking-widest relative z-10">
              <AlertCircle className="w-4 h-4" /> 卡在哪
            </h3>
            <ul className="space-y-2.5 relative z-10">
              {problems.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 text-gray-200 text-base md:text-lg">
                  <XCircle className="w-5 h-5 text-red-400/80 shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showNotes, setShowNotes] = useState(false);
  const totalSlides = 12;

  // Set Title and Favicon
  useEffect(() => {
    document.title = "Ether.fi Cash｜加密支付的演變";

    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'shortcut icon';
    link.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💳</text></svg>';
    document.getElementsByTagName('head')[0].appendChild(link);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
  };
  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };
  const goToSlide = (index) => {
    setDirection(index >= currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        goToSlide(0);
      } else if (e.key === 'End') {
        goToSlide(totalSlides - 1);
      } else if (e.key === 'n' || e.key === 'N') {
        setShowNotes(s => !s);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const renderSlide = () => {
    switch(currentSlide) {
      // SLIDE 0: OPENING
      case 0:
        return (
          <div className="flex flex-col justify-center items-center min-h-full py-8 text-center px-4 relative stagger">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs md:text-sm backdrop-blur-sm">
               <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
               XueDAO × Sui • Taipei Hacker House
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold leading-tight text-white tracking-tight mt-8 md:mt-12">
              世界上最遙遠的距離<br />
              <span className="text-2xl md:text-5xl block mt-4 font-normal text-gray-500">
                是你的{' '}
                <span className="bg-gradient-to-r from-orange-300 to-yellow-400 bg-clip-text text-transparent font-semibold">比特幣</span>{' '}
                和一杯{' '}
                <span className="bg-gradient-to-r from-purple-300 to-blue-400 bg-clip-text text-transparent font-semibold">咖啡</span>{' '}之間。
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 mt-8 md:mt-10">
              支付演變的 15 年。
            </p>

            <div className="flex items-center gap-2 text-gray-600 mt-10 hidden md:flex">
              <span className="text-xs font-mono tracking-widest">按 空白鍵 開始</span>
              <ChevronRight className="w-4 h-4 animate-pulse" />
            </div>
          </div>
        );

      // SLIDE 1: THE TARGET
      case 1:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 min-h-full">
            <div className="text-center mb-12">
               <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">終極目標</span>
               <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tight">今天，它是這樣<span className="text-gray-500">運作的</span></h2>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 max-w-5xl mx-auto w-full relative">
               <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-purple-900 via-blue-900 to-gray-700 -z-10"></div>

               <div className="bg-gray-900 p-6 rounded-2xl border border-purple-500/30 flex flex-col items-center w-full md:w-1/3 z-10 shadow-2xl">
                  <div className="w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center mb-4 text-purple-400">
                    <Wallet className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">使用者</h3>
                  <p className="text-gray-400 text-sm">支付加密貨幣</p>
                  <span className="text-xs font-mono bg-purple-900/50 px-2 py-1 rounded mt-2 text-purple-300">USDC / ETH</span>
               </div>

               <div className="md:w-32 flex flex-col items-center z-10">
                 <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-4 border-gray-900">
                    <Globe className="w-7 h-7 text-white" />
                 </div>
                 <p className="text-blue-400 font-bold mt-2 text-sm">Visa 網絡</p>
                 <p className="text-xs text-gray-500">自動換匯</p>
               </div>

               <div className="bg-gray-900 p-6 rounded-2xl border border-gray-700 flex flex-col items-center w-full md:w-1/3 z-10 shadow-2xl">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 text-green-400">
                    <Store className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">商家</h3>
                  <p className="text-gray-400 text-sm">收到法幣</p>
                  <span className="text-xs font-mono bg-gray-800 px-2 py-1 rounded mt-2 text-gray-300">USD / TWD</span>
               </div>
            </div>

            <div className="text-center mt-12 text-gray-500 text-base md:text-lg">
               簡單的三步，<span className="text-white font-semibold">走了 15 年</span>。
            </div>
          </div>
        );

      // SLIDE 2: GEN 0 - BITCOIN PIZZA
      case 2:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-6 min-h-full">
            <div>
              <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 0（2010 年 5 月 22 日）</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-3 flex-wrap text-white tracking-tight">
                「沒有交易所」的那一天 <Pizza className="text-yellow-500 w-8 h-8 md:w-10 md:h-10" />
              </h2>

              <div className="grid md:grid-cols-5 gap-4 mb-4">
                <div className="md:col-span-3 aspect-[16/9] rounded-xl overflow-hidden border border-gray-700 shadow-lg bg-black/30">
                   <img
                     src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F155a7e3a-c625-4d76-9da3-607893c001a2_1024x683.png"
                     alt="Bitcoin Pizza"
                     className="w-full h-full object-cover"
                   />
                </div>

                <div className="md:col-span-2 flex flex-col justify-center bg-gray-900/30 p-5 rounded-xl border border-gray-800">
                   <div className="flex justify-between items-baseline border-b border-gray-800 pb-3 mb-3">
                     <span className="text-sm text-gray-500">BTC「市場」價值</span>
                     <span className="text-green-400 font-mono font-bold">~$41</span>
                   </div>
                   <div className="flex justify-between items-baseline border-b border-gray-800 pb-3 mb-3">
                     <span className="text-sm text-gray-500">披薩成本</span>
                     <span className="text-red-400 font-mono font-bold">~$25</span>
                   </div>
                   <div className="flex justify-between items-baseline">
                     <span className="text-sm text-gray-500">付出的溢價</span>
                     <span className="text-yellow-500 font-bold font-mono text-lg">+64%</span>
                   </div>
                   <p className="text-yellow-500/90 text-sm font-semibold mt-4 leading-snug">
                     溢價 64% = 當年「用 BTC 付款」的代價。
                   </p>
                </div>
              </div>

              <FlowSection steps={[
                { icon: Wallet, title: "Laszlo", sub: "持有 10k BTC" },
                { icon: Mail, title: "論壇", sub: "發文喊價" },
                { icon: Activity, title: "Jercos", sub: "刷卡代付" },
                { icon: CreditCard, title: "代付橋接", sub: "法幣結算" },
                { icon: Pizza, title: "披薩", sub: "完成交易" }
              ]} />
            </div>
          </div>
        );

      // --- ERA SLIDES ---

      case 3:
        return (
          <div className="flex flex-col justify-center px-4 min-h-full w-full py-8">
            <TimelineCard
              era="ERA 1（2010-2012）"
              title="交易所時代"
              icon={Landmark}
              image="https://bitbo.io/calendar/assets/img/hacks/interface.png"
              question="比特幣可以買東西嗎？"
              answer="可以，但你要先去賣掉換錢。"
              takeaway="幣變錢 ≠ 支付"
              problems={["消費仍是兩段式", "得先賣幣、提現、領鈔", "摩擦只是換了位置"]}
              theme="blue"
            >
              <FlowSection steps={[
                { icon: Wallet, title: "使用者", sub: "持有 BTC" },
                { icon: Landmark, title: "交易所", sub: "掛單賣出" },
                { icon: Banknote, title: "提現", sub: "法幣提現" },
                { icon: Coins, title: "現金", sub: "領出現金" },
                { icon: Store, title: "商店", sub: "去買東西" }
              ]} />
            </TimelineCard>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col justify-center px-4 min-h-full w-full py-8">
            <TimelineCard
              era="ERA 2（2013-2016）"
              title="商家開始收幣"
              icon={Store}
              image="https://duk.tw/RCPxA0.png"
              question="比特幣可以買東西嗎？"
              answer="可以，但僅限願意收幣的電商。"
              takeaway="麻煩只是換人扛"
              problems={["負擔轉移到商家", "商家得自己賣幣", "難擴大到一般店家"]}
              theme="purple"
            >
              <FlowSection steps={[
                { icon: Wallet, title: "使用者", sub: "發送 BTC" },
                { icon: ArrowRight, title: "直接轉帳", sub: "點對點" },
                { icon: Store, title: "商家", sub: "收到 BTC" },
                { icon: Landmark, title: "交易所", sub: "商家賣幣" },
                { icon: Banknote, title: "法幣", sub: "換回法幣" }
              ]} />
            </TimelineCard>
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col justify-center px-4 min-h-full w-full py-8">
            <TimelineCard
              era="ERA 3（2014-2018）"
              title="支付處理商"
              icon={RefreshCw}
              question="比特幣可以買東西嗎？"
              answer="可以，我們幫店家自動換匯。"
              takeaway="可用，但不好用"
              problems={["要等 ~10 分鐘確認", "得自己付礦工費", "中間商匯率很差"]}
              theme="yellow"
            >
              <FlowSection steps={[
                { icon: Wallet, title: "使用者", sub: "發送 BTC" },
                { icon: RefreshCw, title: "BitPay", sub: "鎖定匯率" },
                { icon: Landmark, title: "處理商", sub: "自動換匯" },
                { icon: ArrowRight, title: "結算", sub: "法幣結算" },
                { icon: Store, title: "商家", sub: "收到法幣" }
              ]} />
            </TimelineCard>
          </div>
        );

      case 6:
        return (
          <div className="flex flex-col justify-center px-4 min-h-full w-full py-8">
            <TimelineCard
              era="ERA 4（2016-2019）"
              title="技術改良"
              icon={Zap}
              question="比特幣可以買東西嗎？"
              answer="可以，而且現在變快了。"
              takeaway="更快 ≠ 通用"
              problems={["仍限特定商家", "日常場景只收法幣", "要的是『通用支付』"]}
              theme="green"
              image="https://images.ctfassets.net/4ua9vnmkuhzj/6ftfQVD8uXtISVdt6utFmZ/6f014da9e96d58736600190c9979a487/lightning_network_1.jpg"
            >
              <FlowSection steps={[
                { icon: Wallet, title: "使用者", sub: "閃電錢包" },
                { icon: Zap, title: "支付通道", sub: "Channel" },
                { icon: QrCode, title: "發票", sub: "掃描付款" },
                { icon: ArrowRight, title: "即時", sub: "秒速確認" },
                { icon: Store, title: "商家", sub: "特定商家" }
              ]} />
            </TimelineCard>
          </div>
        );

      case 7:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 min-h-full">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              <div className="flex-1 w-full text-white">
                <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 1（2019-2022）</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                  接入「支付網絡」
                </h2>
                <div className="bg-gray-900/40 p-3.5 rounded-xl border border-white/5 mb-5">
                   <div className="flex items-start gap-2.5 mb-2">
                     <div className="bg-white/10 p-1 rounded text-[11px] font-bold text-white shrink-0">Q</div>
                     <p className="text-gray-300 italic text-sm md:text-base">「比特幣可以買東西嗎？」</p>
                   </div>
                   <div className="flex items-start gap-2.5">
                     <div className="bg-green-500/20 p-1 rounded text-[11px] font-bold text-green-400 shrink-0">A</div>
                     <p className="text-green-200 font-medium text-sm md:text-base">「可以，只要店家有貼 Visa 標誌。」</p>
                   </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-green-300 leading-snug mb-5">通路問題，一次解決</p>

                <div className="bg-red-900/10 p-4 rounded-xl border border-red-500/20 w-full">
                   <h3 className="font-bold text-red-200 mb-1.5 flex items-center gap-2 text-sm">
                     <AlertCircle className="w-4 h-4" />
                     代價：託管風險
                   </h3>
                   <p className="text-red-200/80 text-sm md:text-base leading-relaxed">
                     錢在交易所手上 = 一張「交易所帳戶的提款卡」。
                   </p>
                </div>
              </div>

              <div className="flex-1 flex justify-center w-full flex-col">
                <div className="relative w-full max-w-[300px] mx-auto mb-10 h-44 md:h-48">
                  <div className="absolute top-0 left-0 w-full h-44 bg-gradient-to-br from-blue-900 to-blue-600 rounded-2xl border border-blue-400/30 transform -rotate-6 shadow-2xl z-10 flex flex-col justify-between p-5">
                    <div className="text-blue-200 font-bold italic">交易所卡</div>
                    <div className="flex justify-between items-end">
                      <div className="text-blue-100 font-mono tracking-widest">**** 8888</div>
                      <div className="text-xs text-blue-200">託管</div>
                    </div>
                  </div>
                </div>

                <FlowSection steps={[
                  { icon: Wallet, title: "充值", sub: "充進交易所" },
                  { icon: Landmark, title: "交易所", sub: "託管資金" },
                  { icon: RefreshCw, title: "法幣", sub: "後端換匯" },
                  { icon: Globe, title: "Visa 網絡", sub: "通用網絡" },
                  { icon: Store, title: "任意商店", sub: "全球通用" }
                ]} />
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="flex flex-col justify-center px-4 min-h-full w-full py-8">
            <TimelineCard
              era="GEN 2（2018-2020）"
              title="失敗的先驅"
              icon={Shield}
              image="https://miro.medium.com/1*kCFgcfRzore3mLX0OQnqfA.png"
              question="可以自己保管錢並消費嗎？"
              answer="可以，但你得先付 Gas 充值。"
              takeaway="自託管，但太貴太煩"
              problems={["消費前要手動發交易", "每次充值都是 L1 交易", "充 $10 可能花 $5–10 Gas"]}
              theme="purple"
            >
              <FlowSection steps={[
                { icon: Shield, title: "合約", sub: "自託管錢包" },
                { icon: ArrowRight, title: "手動充值", sub: "L1 交易", isBad: true },
                { icon: Banknote, title: "緩衝區", sub: "法幣預付戶" },
                { icon: CreditCard, title: "Visa", sub: "刷卡扣款" },
                { icon: Store, title: "商店", sub: "交易完成" }
              ]} />
            </TimelineCard>
          </div>
        );

      case 9:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-8 min-h-full">
            <div className="flex flex-col gap-8">
              <div className="text-white text-center">
                <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 3（上半場）· 2024</span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                  基礎設施補完
                </h2>
                <p className="text-base md:text-lg text-gray-400 mt-3">解決最後一哩路的兩塊拼圖。</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-900/40 to-gray-900 p-6 rounded-2xl border border-blue-500/30">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-500/20 p-3 rounded-xl text-blue-400">
                      <Layers className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-white">L2 低手續費</h3>
                  </div>
                  <ul className="space-y-2.5 text-base text-gray-300">
                    <li className="flex items-start gap-2.5"><CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" /> 小額支付不再跑昂貴 L1</li>
                    <li className="flex items-start gap-2.5"><CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" /> 吞吐量大，不再擁堵</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-900/40 to-gray-900 p-6 rounded-2xl border border-purple-500/30">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-purple-500/20 p-3 rounded-xl text-purple-400">
                      <Key className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-white">帳戶抽象化（AA）</h3>
                  </div>
                  <ul className="space-y-2.5 text-base text-gray-300">
                    <li className="flex items-start gap-2.5"><CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" /> FaceID 登入，告別助記詞</li>
                    <li className="flex items-start gap-2.5"><CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" /> 自動扣款、社交恢復</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      // --- SLIDE 10: MODERN EXPERIENCE (ANATOMY) ---
      case 10:
        return (
          <div className="flex flex-col justify-center px-4 max-w-7xl mx-auto w-full py-6 min-h-full">
            <div className="flex flex-col gap-4">
              <div className="text-white text-center">
                <span className="text-purple-400 font-mono text-sm mb-1.5 block tracking-widest">GEN 3（下半場）</span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                  現代的體驗
                </h2>
                <p className="text-base md:text-lg text-gray-400 mt-2">
                  <span className="text-white font-semibold">只在儲值時碰 Crypto，消費時完全無感。</span>
                </p>
              </div>

              <div>
                <div className="relative flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-3 gap-3 items-center justify-center h-auto lg:h-[300px] w-full max-w-4xl mx-auto">

                  {/* Central Card Visual */}
                  <div className="lg:col-start-2 lg:row-start-2 z-10 w-full flex justify-center order-1 lg:order-none mb-4 lg:mb-0">
                    <div className="relative w-56 h-32 md:w-64 md:h-40 bg-gradient-to-br from-purple-900 to-gray-900 rounded-2xl border border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.3)] flex flex-col justify-between p-4 transform hover:scale-105 transition-transform duration-500">
                      <div className="flex justify-between items-start">
                        <span className="text-purple-200 font-bold italic tracking-wider">ether.fi</span>
                        <Globe className="text-purple-400/50 w-6 h-6" />
                      </div>
                      <div className="text-center">
                         <span className="text-white text-opacity-20 font-bold text-3xl tracking-widest">CASH</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="text-purple-100 font-mono tracking-widest text-sm">**** 8888</div>
                        <div className="text-xs text-purple-300 border border-purple-500/50 px-2 py-0.5 rounded">L2 NATIVE</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-start-2 lg:row-start-1 flex justify-center order-2 lg:order-none w-full">
                    <AnatomyPart icon={Globe} title="Visa 網絡" desc="通用性 · 全球 8000 萬商戶" position="bottom" color="blue" />
                  </div>
                  <div className="lg:col-start-2 lg:row-start-3 flex justify-center order-3 lg:order-none w-full">
                    <AnatomyPart icon={Layers} title="Scroll zkEVM" desc="成本 · 手續費夠低了" position="top" color="yellow" />
                  </div>
                  <div className="lg:col-start-1 lg:row-start-2 flex justify-center order-4 lg:order-none w-full">
                    <AnatomyPart icon={Lock} title="智能錢包" desc="安全性 · 自託管免 FTX 風險" position="right" color="green" />
                  </div>
                  <div className="lg:col-start-3 lg:row-start-2 flex justify-center order-5 lg:order-none w-full">
                    <AnatomyPart icon={TrendingUp} title="代幣獎勵" desc="誘因 · 消費即挖礦" position="left" color="purple" />
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/10 px-5 py-4 rounded-2xl border border-yellow-500/20 max-w-4xl mx-auto w-full">
                <div className="flex items-center gap-3 flex-wrap justify-between">
                  <h3 className="text-base md:text-lg font-bold text-yellow-500 flex items-center gap-2">
                    <Landmark className="w-5 h-5" /> 商業模式：收益
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-yellow-200/80 flex-wrap">
                    <span>存款</span>
                    <ArrowRight className="w-4 h-4" />
                    <span>DeFi 收益</span>
                    <ArrowRight className="w-4 h-4" />
                    <span>補貼支付</span>
                    <ArrowRight className="w-4 h-4" />
                    <span>更多存款</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 11:
         return (
          <div className="flex flex-col justify-center items-center text-center px-4 min-h-full py-8 stagger">
            <h2 className="text-5xl md:text-8xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              先用再說
            </h2>
            <p className="text-lg md:text-2xl text-gray-400 max-w-3xl leading-relaxed px-2 mt-6 mb-10">
              這條路走了 15 年，現在終於通了。<br/>
              去樓下 7-11 買杯咖啡，你就懂了。
            </p>

            <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-white/10 p-7 rounded-3xl max-w-md w-full hover:border-purple-500/60 transition-all duration-300 group shadow-2xl shadow-purple-900/10">
              <p className="text-purple-400 font-bold mb-2 text-xs uppercase tracking-[0.2em]">接下來</p>
              <h3 className="text-2xl font-bold text-white mb-3">實機操作 & 註冊</h3>
              <p className="text-gray-400 text-sm mb-6">拿出你的手機，我們現在就來跨越這座橋。</p>
              <a
                href="https://www.ether.fi/refer/7c8b3870"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30 active:scale-[0.98]"
              >
                開始吧 <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-950 h-screen w-full text-gray-100 font-sans selection:bg-purple-500 selection:text-white overflow-hidden flex flex-col">
      {/* Header */}
      <header className="h-14 border-b border-white/5 bg-gray-950/70 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 shrink-0 z-50">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]"></span>
          <span className="font-bold text-lg md:text-xl tracking-tight text-white">Blocktrend</span>
          <span className="text-gray-600">×</span>
          <span className="text-purple-400 font-semibold text-sm md:text-base">ether.fi</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-gray-500 bg-white/5 border border-white/5 px-3 py-1 rounded-full">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
            <span>空白鍵 / → 下一頁</span>
          </div>
          <div className="text-sm font-mono text-gray-400 tabular-nums">
            <span className="text-white">{String(currentSlide + 1).padStart(2, '0')}</span>
            <span className="text-gray-600"> / {String(totalSlides).padStart(2, '0')}</span>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-[3px] bg-white/5 shrink-0 z-50">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-blue-500 transition-[width] duration-500 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        ></div>
      </div>

      {/* Main Slide Area */}
      <main className="flex-1 relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
        {/* Ambient background glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-48 -left-32 w-[28rem] h-[28rem] bg-purple-600/15 rounded-full blur-3xl animate-glow-pulse"></div>
          <div className="absolute -bottom-48 -right-32 w-[28rem] h-[28rem] bg-blue-600/15 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '2.5s' }}></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(168,85,247,0.08),transparent_60%)]"></div>
        </div>

        <div
          key={currentSlide}
          className={`relative h-full w-full overflow-y-auto overflow-x-hidden scrollbar-slim ${
            direction >= 0 ? 'animate-slide-in-right' : 'animate-slide-in-left'
          }`}
        >
          {renderSlide()}
        </div>

        {/* Presenter notes drawer — only the speaker sees this (toggle with N) */}
        {showNotes && (
          <div className="absolute inset-x-0 bottom-0 z-40 bg-gray-950/95 backdrop-blur-xl border-t border-purple-500/30 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] animate-fade-in">
            <div className="max-w-4xl mx-auto px-6 py-4 overflow-y-auto max-h-[40vh] scrollbar-slim">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-purple-400 tracking-widest uppercase flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> 講者備註 · 第 {currentSlide + 1} 頁
                </span>
                <button onClick={() => setShowNotes(false)} className="text-[11px] text-gray-500 hover:text-gray-300 font-mono">按 N 隱藏 ✕</button>
              </div>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed whitespace-pre-line">
                {speakerNotes[currentSlide] || '（這頁沒有備註）'}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer Controls */}
      <footer className="h-14 border-t border-white/5 bg-gray-950/70 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 shrink-0 z-50">

        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2.5 rounded-full border border-white/5 hover:bg-white/5 hover:border-white/10 disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:border-white/5 transition-all text-white active:scale-95"
            aria-label="上一頁"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="p-2.5 rounded-full bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:bg-gray-700 transition-all text-white shadow-lg shadow-purple-900/30 active:scale-95"
            aria-label="下一頁"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot navigation */}
        <div className="hidden sm:flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`跳到第 ${i + 1} 頁`}
              className={`rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? 'w-6 h-2 bg-gradient-to-r from-purple-400 to-blue-400'
                  : 'w-2 h-2 bg-white/15 hover:bg-white/40'
              }`}
            ></button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNotes(s => !s)}
            className={`flex items-center gap-1.5 text-[11px] font-mono px-3 py-1.5 rounded-full border transition-all ${
              showNotes
                ? 'bg-purple-500/20 border-purple-500/40 text-purple-200'
                : 'border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/10'
            }`}
            aria-label="講者備註"
          >
            <BookOpen className="w-3.5 h-3.5" /> 備註 N
          </button>
          <div className="text-xs text-gray-600 truncate max-w-[110px] md:max-w-none hidden md:block">
            5/30 • 台北 • Astro Hsu
          </div>
        </div>
      </footer>
    </div>
  );
}
