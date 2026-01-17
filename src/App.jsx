import React, { useState, useEffect } from 'react';
import { 
  CreditCard, ArrowRight, Zap, Shield, TrendingUp, Wallet, 
  History, ChevronRight, Activity, BookOpen, ChevronLeft, 
  Pizza, AlertTriangle, Layers, XCircle, Coins, ArrowDown, 
  QrCode, Store, Smartphone, Globe, Lock, CheckCircle, 
  Landmark, RefreshCw, AlertCircle, Banknote, Mail, Key, Fingerprint
} from 'lucide-react';

// --- Components ---

const ProcessStep = ({ icon: Icon, title, sub, isLast = false, isBad = false }) => (
  <div className="flex flex-col items-center relative z-10 group flex-1 min-w-0">
    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-3 shadow-lg transition-all duration-300 shrink-0 ${
      isBad 
        ? 'bg-red-500/10 border border-red-500/30 text-red-400 group-hover:bg-red-500/20' 
        : 'bg-gray-800 border border-gray-700 text-purple-400 group-hover:border-purple-500'
    }`}>
      <Icon className="w-6 h-6 md:w-8 md:h-8" />
    </div>
    <h4 className="font-bold text-white text-sm md:text-base text-center mb-1 w-full px-1 leading-tight">{title}</h4>
    <p className="text-xs text-gray-400 text-center leading-tight">{sub}</p>
    
    {!isLast && (
      <div className="hidden md:block absolute top-6 -right-[50%] w-full h-[2px] bg-gray-700 -z-10"></div>
    )}
  </div>
);

const FlowSection = ({ steps, title = "Payment Flow", className = "" }) => (
  <div className={`w-full ${className}`}>
    <div className="flex items-center gap-2 mb-4 opacity-60">
      <div className="h-[1px] bg-gray-700 flex-1"></div>
      <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">{title}</span>
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

const TimelineCard = ({ title, era, icon: Icon, mainText, subText, question, answer, theme = "blue", image, children }) => {
  const themes = {
    blue: "from-blue-900/50 to-gray-900 border-blue-500/30 text-blue-400",
    purple: "from-purple-900/50 to-gray-900 border-purple-500/30 text-purple-400",
    yellow: "from-yellow-900/50 to-gray-900 border-yellow-500/30 text-yellow-400",
    green: "from-green-900/50 to-gray-900 border-green-500/30 text-green-400",
  };

  return (
    <div className={`flex flex-col justify-center min-h-full w-full max-w-7xl mx-auto py-4`}>
      <div className={`flex flex-col lg:flex-row gap-6 items-stretch bg-gradient-to-br ${themes[theme]} p-6 md:p-8 rounded-2xl border w-full`}>
        <div className="flex-1 space-y-4 flex flex-col">
          <div>
            <span className="font-mono text-sm tracking-widest opacity-80 mb-1 block">{era}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h2>
          </div>
          
          <div className="bg-gray-900/40 p-4 rounded-xl border border-white/5 shrink-0">
             <div className="flex items-start gap-3 mb-2">
               <div className="bg-white/10 p-1.5 rounded text-xs font-bold text-white">Q</div>
               <p className="text-gray-300 italic text-sm md:text-base">"{question}"</p>
             </div>
             <div className="flex items-start gap-3">
               <div className={`bg-${theme}-500/20 p-1.5 rounded text-xs font-bold text-${theme}-400`}>A</div>
               <p className={`text-${theme}-200 font-medium text-sm md:text-base`}>{answer}</p>
             </div>
          </div>

          {image && (
            <div className="w-full rounded-xl overflow-hidden border border-white/10 relative group shrink-0">
               <img src={image} alt={title} className="w-full h-auto max-h-64 object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          )}

          <div className={`p-4 rounded-xl bg-gray-900/50 border border-white/10 flex-grow`}>
            {!image && <Icon className="w-10 h-10 mb-3 opacity-80" />}
            <p className="text-base md:text-lg text-gray-200 leading-relaxed font-light">{mainText}</p>
          </div>
        </div>
        
        <div className="flex-1 lg:w-1/2 bg-black/20 p-6 rounded-xl border border-white/5 relative overflow-hidden group flex flex-col gap-6">
          <div className="relative z-10">
            <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <Icon className="w-64 h-64" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 relative z-10">
              <AlertCircle className="w-6 h-6" /> The Reality
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-line relative z-10">
              {subText}
            </p>
          </div>
          
          <div className="relative z-10 w-full mt-2">
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
  const totalSlides = 13;

  // Set Title and Favicon
  useEffect(() => {
    document.title = "Ether.fi Cash - The Evolution of Crypto Payments";
    
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'shortcut icon';
    link.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💳</text></svg>';
    document.getElementsByTagName('head')[0].appendChild(link);
  }, []);

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
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-12 min-h-full">
            <div className="mb-8">
              <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 0 (May 22, 2010)</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 flex items-center gap-4 flex-wrap text-white">
                The Day of "No Exchange" <Pizza className="text-yellow-500 w-8 h-8 md:w-10 md:h-10" />
              </h2>
              
              <div className="grid md:grid-cols-5 gap-8 mb-8">
                <div className="md:col-span-3">
                   <img 
                     src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F155a7e3a-c625-4d76-9da3-607893c001a2_1024x683.png" 
                     alt="Bitcoin Pizza" 
                     className="w-full rounded-xl border border-gray-700 mb-6 shadow-lg object-contain h-auto"
                   />
                   
                   <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
                     這個故事最重要的並不是披薩，而是<span className="text-red-400 font-bold">「那時候沒有中心化交易所」</span>。
                     幣價非常不確定，Laszlo 只能到論壇喊價。
                   </p>
                </div>
                
                <div className="md:col-span-2 flex flex-col gap-6">
                     <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-800">
                       <div className="flex justify-between border-b border-gray-800 pb-4 mb-4">
                         <span className="text-sm text-gray-500">BTC "Market" Value</span>
                         <span className="text-green-400 font-mono font-bold">~$41.00 USD</span>
                       </div>
                       <div className="flex justify-between border-b border-gray-800 pb-4 mb-4">
                         <span className="text-sm text-gray-500">Pizza Cost</span>
                         <span className="text-red-400 font-mono font-bold">~$25.00 USD</span>
                       </div>
                       <div className="flex justify-between border-b border-gray-800 pb-4 mb-4">
                         <span className="text-sm text-gray-500">Premium Paid</span>
                         <span className="text-yellow-500 font-bold font-mono">+$16.00 (64%)</span>
                       </div>
                       
                       <p className="text-gray-300 italic text-sm mb-6 leading-relaxed">
                         "這 $16 美元的價差，就是當時為了「用比特幣買東西」所付出的代價。"
                       </p>

                       <div className="space-y-4">
                          <div>
                            <h4 className="text-gray-500 text-xs uppercase tracking-wider mb-1">當時的問題</h4>
                            <p className="text-gray-300 text-sm italic">"這 10,000 顆比特幣到底值多少錢？沒人說得準，論壇上有人說大概值 $41 美金。"</p>
                          </div>
                          <div>
                            <h4 className="text-gray-500 text-xs uppercase tracking-wider mb-1">巨大的交易摩擦 (Friction)</h4>
                            <p className="text-gray-300 text-sm">披薩成本 $25 → 付出 $41 等值 BTC</p>
                            <p className="text-yellow-500 text-sm font-bold mt-1">"Laszlo 為了買 $25 美元的披薩，付了 $41 美元出去. 溢價 64%。"</p>
                          </div>
                       </div>
                     </div>
                </div>
              </div>

              {/* FLOW CHART RESTORED */}
              <div className="mt-8">
                <FlowSection steps={[
                  { icon: Wallet, title: "Laszlo", sub: "持有 10k BTC" },
                  { icon: Mail, title: "Forum", sub: "發文尋找" },
                  { icon: Activity, title: "Jercos", sub: "刷卡代付" },
                  { icon: CreditCard, title: "Bridge", sub: "法幣結算" },
                  { icon: Pizza, title: "Pizza", sub: "完成交易" }
                ]} title="Payment Flow" />
              </div>
            </div>
          </div>
        );

      // --- ERA SLIDES ---

      case 3:
        return (
          <div className="flex flex-col justify-center px-4 min-h-full w-full py-12">
            <TimelineCard 
              era="ERA 1 (2010-2012)"
              title="The Exchange Era"
              icon={Landmark}
              image="https://bitbo.io/calendar/assets/img/hacks/interface.png"
              question="比特幣可以買東西嗎？"
              answer="可以，但你要先去賣掉換錢。"
              mainText="2010 年 7 月 Mt. Gox 成立 (比披薩日晚 2 個月)。總算開始解決流動性分散問題，大家不用再上論壇貼文，而是有專門平台集中流動性，讓價格變得透明且可查詢。"
              subText={`問題：消費流程還是兩段式。雖然解決了幣換錢、報價不透明的問題，但總有一個人要麻煩。除非他願意長期持有比特幣。\n\n要嘛是消費者先把比特幣換成法幣，或是找到願意收比特幣的個人，請他幫忙用法幣代購。交易所解決了「幣變錢」的問題，但沒有解決「支付」的問題。`}
              theme="blue"
            >
              <FlowSection steps={[
                { icon: Wallet, title: "User", sub: "持有 BTC" },
                { icon: Landmark, title: "Exchange", sub: "掛單賣出 (Sell)" },
                { icon: Banknote, title: "Withdraw", sub: "法幣提現" },
                { icon: Coins, title: "Cash", sub: "領出現金" },
                { icon: Store, title: "Shop", sub: "去買東西" }
              ]} />
            </TimelineCard>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col justify-center px-4 min-h-full w-full py-12">
            <TimelineCard 
              era="ERA 2 (2013-2016)"
              title="Merchant Adoption"
              icon={Store}
              image="https://duk.tw/RCPxA0.png"
              question="比特幣可以買東西嗎？"
              answer="可以，但僅限願意收比特幣的電商平台、科技公司"
              mainText="Overstock, Newegg 等科技電商開始「願意收幣」。這簡化了使用者的流程，你可以直接把幣轉給商家。"
              subText={`問題：這變成了商家的麻煩。\n\n多虧有中心化交易所的報價，電商才知道要收多少幣。但商家收了幣之後，他們也要自己去交易所賣掉換現金。負擔只是從消費者轉移到了商家身上。`}
              theme="purple"
            >
              <FlowSection steps={[
                { icon: Wallet, title: "User", sub: "發送 BTC" },
                { icon: ArrowRight, title: "Direct", sub: "直接轉帳" },
                { icon: Store, title: "Merchant", sub: "收到 BTC" },
                { icon: Landmark, title: "Exchange", sub: "商家去賣幣" },
                { icon: Banknote, title: "Fiat", sub: "換回法幣" }
              ]} />
            </TimelineCard>
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col justify-center px-4 min-h-full w-full py-12">
            <TimelineCard 
              era="ERA  3 (2014-2018)"
              title="Payment Processors"
              icon={RefreshCw}
              image="https://techcrunch.com/wp-content/uploads/2014/01/screen-shot-2014-01-04-at-09-59-13.png?w=624"
              question="比特幣可以買東西嗎？"
              answer="可以，我們會幫店家自動換匯。"
              mainText="BitPay, Coinbase Commerce 出現。消費者付幣，中間商自動換成法幣給店家。商家終於沒有風險了。"
              subText={`問題：\n這對商家好，但對消費者還是很痛苦。\n\n1. 你要等 10 分鐘區塊確認。\n2. 你要自己付礦工費。\n3. 中間商匯率通常很差。\n\n是個「可用」但「不好用」的體驗。`}
              theme="yellow"
            >
              <FlowSection steps={[
                { icon: Wallet, title: "User", sub: "發送 BTC" },
                { icon: RefreshCw, title: "BitPay", sub: "鎖定匯率" },
                { icon: Landmark, title: "Processor", sub: "自動換匯" },
                { icon: ArrowRight, title: "Settle", sub: "法幣結算" },
                { icon: Store, title: "Merchant", sub: "收到法幣" }
              ]} />
            </TimelineCard>
          </div>
        );

      case 6:
        return (
          <div className="flex flex-col justify-center px-4 min-h-full w-full py-12">
            <TimelineCard 
              era="ERA 4 (2016-2019)"
              title="Tech Improvements"
              icon={Zap}
              question="比特幣可以買東西嗎？"
              answer="可以，而且現在變快了 (USDT/LN)。"
              mainText="Lightning Network 讓交易變快；USDT 讓價值穩定。技術一直在進步，支付不再需要等 10 分鐘。"
              subText={`問題：\n你還是只能在「支援加密貨幣」的特定店家消費。\n\n我想買咖啡、我想搭捷運、我想去便利商店。\n現實世界絕大多數的消費場景，依然只收法幣 (Visa/Mastercard)。\n\n我們需要的不是「更快的轉帳」，而是「通用的支付」。`}
              theme="green"
              image="https://images.ctfassets.net/4ua9vnmkuhzj/6ftfQVD8uXtISVdt6utFmZ/6f014da9e96d58736600190c9979a487/lightning_network_1.jpg"
            >
              <FlowSection steps={[
                { icon: Wallet, title: "User", sub: "LN 錢包" },
                { icon: Zap, title: "Channel", sub: "支付通道" },
                { icon: QrCode, title: "Invoice", sub: "掃描發票" },
                { icon: ArrowRight, title: "Instant", sub: "秒速確認" },
                { icon: Store, title: "Merchant", sub: "特定商家" }
              ]} />
            </TimelineCard>
          </div>
        );

      case 7:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-12 min-h-full">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              <div className="flex-1 w-full text-white">
                <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 1 (2019-2022)</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  The "Network" Access
                </h2>
                <div className="bg-gray-900/40 p-4 rounded-xl border border-white/5 mb-6">
                   <div className="flex items-start gap-3 mb-2">
                     <div className="bg-white/10 p-1.5 rounded text-xs font-bold text-white">Q</div>
                     <p className="text-gray-300 italic text-sm md:text-base">"比特幣可以買東西嗎？"</p>
                   </div>
                   <div className="flex items-start gap-3">
                     <div className="bg-green-500/20 p-1.5 rounded text-xs font-bold text-green-400">A</div>
                     <p className="text-green-200 font-medium text-sm md:text-base">"可以，只要店家有貼 Visa 標誌。"</p>
                   </div>
                </div>
                <p className="text-base md:text-lg text-gray-400 mb-6 leading-relaxed">
                  2019 年 Crypto.com 將加密貨幣接入 <span className="text-white font-bold">Visa 支付網絡</span>。<br/><br/>
                  使用者不再需要去尋找「願意收幣的特定商家」，而是只要認得「Visa 品牌」。這徹底解決了通路問題。
                </p>
                
                <div className="bg-red-900/10 p-5 rounded-xl border border-red-500/20 w-full mb-4">
                   <h3 className="font-bold text-red-200 mb-2 flex items-center gap-2 text-sm">
                     <AlertCircle className="w-4 h-4" />
                     The Trade-off (Custodial)
                   </h3>
                   <p className="text-red-200/70 text-xs md:text-sm leading-relaxed">
                     Visa 當時並不直接收加密貨幣，它只是讓交易所發卡。本質上是<span className="text-white font-bold">「交易所帳戶的提款卡」</span>。
                   </p>
                </div>
              </div>

              <div className="flex-1 flex justify-center w-full py-8 md:py-0 flex-col">
                {/* Fixed container height to prevent overlap */}
                <div className="relative w-full max-w-[320px] mx-auto mb-10 h-56 md:h-64">
                  <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-br from-blue-900 to-blue-600 rounded-2xl border border-blue-400/30 transform -rotate-6 shadow-2xl z-10 flex flex-col justify-between p-6">
                    <div className="text-blue-200 font-bold italic">CEX CARD</div>
                    <div className="flex justify-between items-end">
                      <div className="text-blue-100 font-mono tracking-widest">**** 8888</div>
                      <div className="text-xs text-blue-200">CUSTODIAL</div>
                    </div>
                  </div>
                </div>
                
                <FlowSection steps={[
                  { icon: Wallet, title: "Deposit", sub: "充值進交易所" },
                  { icon: Landmark, title: "CEX", sub: "託管資金 (Risk)" },
                  { icon: RefreshCw, title: "Fiat", sub: "後端換法幣" },
                  { icon: Globe, title: "Visa Net", sub: "通用網絡" },
                  { icon: Store, title: "Any Shop", sub: "全球通用" }
                ]} />
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="flex flex-col justify-center px-4 min-h-full w-full py-12">
            <TimelineCard 
              era="GEN 2 (2018-2020)"
              title="The Failed Pioneers (L1)"
              icon={Shield}
              image="https://miro.medium.com/1*kCFgcfRzore3mLX0OQnqfA.png"
              question="我可以自己保管錢並消費嗎？"
              answer="可以，但你必須先付 Gas Fee 充值法幣。"
              mainText="2018 年 Monolith (TokenCard) 試圖實現自託管支付。用戶需先將資金鎖入合約錢包，待消費前「手動充值」至法幣緩衝區，Visa 再從法幣帳戶扣款。"
              subText={`雖然解決了自託管，但代價慘重：\n1. 流程斷層：消費前要先掏手機發送交易。\n2. 成本高昂：每次充值都是一筆 L1 交易，充 $10 可能要付 $5-$10 Gas Fee。`}
              theme="purple"
            >
              <FlowSection steps={[
                { icon: Shield, title: "Contract", sub: "自託管錢包" },
                { icon: ArrowRight, title: "Manual", sub: "手動充值 (L1 Tx)", isBad: true },
                { icon: Banknote, title: "Buffer", sub: "法幣預付戶" },
                { icon: CreditCard, title: "Visa", sub: "刷卡扣法幣" },
                { icon: Store, title: "Shop", sub: "交易完成" }
              ]} />
            </TimelineCard>
          </div>
        );

      case 9:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-12 min-h-full">
            <div className="flex flex-col gap-8">
              <div className="text-white">
                <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 3 (Part 1)</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  The Infrastructure Fix (2024)
                </h2>
                <div className="bg-gray-900/40 p-4 rounded-xl border border-white/5 mb-6">
                   <div className="flex items-start gap-3">
                     <div className="bg-green-500/20 p-1.5 rounded text-xs font-bold text-green-400">A</div>
                     <p className="text-green-200 font-medium text-sm md:text-base">"Layer 2 的低費率 + 帳戶抽象化 (AA) 解決了最後一哩路。"</p>
                   </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-900/40 to-gray-900 p-6 rounded-2xl border border-blue-500/30">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-500/20 p-3 rounded-xl text-blue-400">
                      <Layers className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white">L2 Low Fees</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    從 2024 年開始，以太坊 Layer 2 (如 Arbitrum, Optimism, Scroll) 的手續費大幅下降。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span> 日常小額支付終於不用再跑在昂貴的 L1 上。
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span> 吞吐量大增，不再有 DeFi Summer 的擁堵問題。
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-900/40 to-gray-900 p-6 rounded-2xl border border-purple-500/30">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-purple-500/20 p-3 rounded-xl text-purple-400">
                      <Key className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Account Abstraction</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    支援 Passkeys 與智慧合約錢包 (Smart Accounts)。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span> 告別助記詞，用 FaceID 就能登入。
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span> 可設定自動扣款、社交恢復，體驗如 Web2 般滑順。
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center mt-4">
                <p className="text-gray-500 italic">這些技術拼圖全部串在一起，才催生了現代的加密支付卡。</p>
              </div>
            </div>
          </div>
        );

      // --- NEW SLIDE 10: MODERN EXPERIENCE ---
      case 10:
        return (
          <div className="flex flex-col justify-center px-4 max-w-6xl mx-auto w-full py-12 min-h-full">
            <div className="flex flex-col gap-8">
              <div className="text-white">
                <span className="text-purple-400 font-mono text-sm mb-2 block tracking-widest">GEN 3 (Part 2)</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  The Modern Experience
                </h2>
                <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
                  Ether.fi, Coinbase, Bybit, RedotPay 百花齊放。<br/>
                  現在的體驗是：<span className="text-white font-bold">只在儲值時接觸 Crypto，消費時完全無感。</span>
                </p>
              </div>

              <div className="w-full rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
                 <img src="https://duk.tw/aq4HNG.png" alt="Modern Crypto Card Experience" className="w-full h-auto object-contain" />
              </div>

              <div className="bg-yellow-900/10 p-6 rounded-2xl border border-yellow-500/20">
                <h3 className="text-xl font-bold text-yellow-500 mb-3 flex items-center gap-2">
                  <Landmark className="w-6 h-6" />
                  The Business Model: "Yield"
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  現在的卡片怎麼賺錢？答案是<span className="text-white font-bold">收益 (Yield)</span>。<br/>
                  就像銀行希望你存錢一樣，這些協議希望你把加密資產 (TVL) 放在他們那裡產生 DeFi 收益 (Positive Carry)。
                </p>
                <div className="mt-4 flex items-center gap-4 text-sm text-yellow-200/70">
                  <span>存款 → 產生收益</span>
                  <ArrowRight className="w-4 h-4" />
                  <span>支付補貼</span>
                  <ArrowRight className="w-4 h-4" />
                  <span>吸引更多存款</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 11:
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

      case 12:
         return (
          <div className="flex flex-col justify-center items-center text-center px-4 min-h-full py-12 overflow-y-auto">
            <h2 className="text-4xl md:text-7xl font-bold mb-8 text-white">
              Just Use It.
            </h2>
            <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mb-12 leading-relaxed px-2">
              這條路走了 15 年，現在終於通了。<br/>
              去樓下 7-11 買杯咖啡，你就懂了。
            </p>
            
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 p-8 rounded-2xl max-w-md w-full hover:border-purple-500 transition-all duration-300 cursor-pointer group">
              <p className="text-purple-400 font-bold mb-2 text-sm uppercase tracking-widest">NEXT</p>
              <h3 className="text-2xl font-bold text-white mb-4">Live Demo & Sign Up</h3>
              <p className="text-gray-400 text-sm mb-6">拿出你的手機，我們現在就來跨越這座橋。</p>
              <a 
                href="https://www.ether.fi/refer/7c8b3870" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
              >
                Let's Go <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
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

        <div className="text-xs text-gray-600 truncate max-w-[150px] md:max-w-none">
          Jan 17 • Taipei • Astro Hsu
        </div>
      </footer>
    </div>
  );
}