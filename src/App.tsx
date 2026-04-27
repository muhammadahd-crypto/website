/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Menu, Activity, BarChart3, Newspaper, Trophy, History, PlusCircle, Share2, TrendingUp, BrainCircuit, Grid3X3, Radar, BookOpen, Star, Verified, Eye, MessageSquare, AlertTriangle, Link, Combine, Globe, LayoutDashboard, Settings, Rss, ArrowUpRight, Maximize2, Zap } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Sub-component imports would go here in a larger project, 
// for now we'll maintain the logic in specialized render functions.

export default function App() {
  const [activeTab, setActiveTab] = useState<'live' | 'stats' | 'news' | 'awards' | 'history'>('live');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200]);
  const backgroundOpacity = useTransform(scrollY, [0, 300], [0.3, 0.1]);

  // Mouse tracking for glimmer effects
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Initial values
    if (containerRef.current) {
      containerRef.current.style.setProperty('--x', '50%');
      containerRef.current.style.setProperty('--y', '50%');
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      containerRef.current.style.setProperty('--x', `${clientX}px`);
      containerRef.current.style.setProperty('--y', `${clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navigation = [
    { id: 'live', label: 'LIVE', icon: Activity },
    { id: 'stats', label: 'STATS', icon: BarChart3 },
    { id: 'news', label: 'NEWS', icon: Newspaper },
    { id: 'awards', label: 'AWARDS', icon: Trophy },
    { id: 'history', label: 'HISTORY', icon: History },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-background text-zinc-100 font-sans selection:bg-primary selection:text-black overflow-x-hidden"
    >
      <div className="data-glimmer fixed inset-0 pointer-events-none z-0" />
      <motion.div 
        style={{ y: backgroundY, opacity: backgroundOpacity }}
        className="fixed inset-0 grid-overlay z-0" 
      />
      <BackgroundParticles />
      <LiquidMesh />
      <div className="scanline" />
      
      {/* Background Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-[#0A0A0A]/70 backdrop-blur-xl border-b border-primary/20 shadow-xl">
        <div className="flex items-center gap-4">
          <Menu 
            className="text-primary cursor-pointer active:scale-95 duration-150" 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
          />
          <h1 className="text-2xl font-black italic text-primary drop-shadow-[0_0_8px_rgba(0,209,255,0.6)] font-display tracking-tighter uppercase">
            STRIKER_OS
          </h1>
        </div>
        
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={cn(
                  "font-display tracking-widest text-[12px] font-bold uppercase transition-all",
                  activeTab === item.id ? "text-primary shadow-[0_0_10px_rgba(0,209,255,0.4)]" : "text-slate-400 hover:text-white"
                )}
              >
                {item.id === 'live' ? 'LIVE HUB' : item.label}
              </button>
            ))}
          </nav>
          <div className="h-10 w-10 rounded-full border border-primary/40 overflow-hidden bg-zinc-800">
            <img 
              alt="User profile avatar" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" 
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative pt-24 pb-32 px-4 md:px-margin-desktop max-w-7xl mx-auto z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'live' && <LiveHub />}
            {activeTab === 'stats' && <StatsAnalysis />}
            {activeTab === 'news' && <NewsIntel />}
            {activeTab === 'awards' && <AwardsHub />}
            {activeTab === 'history' && <TeamHistory />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe h-20 bg-[#0A0A0A]/80 backdrop-blur-2xl border-t border-primary/20 rounded-t-2xl shadow-2xl">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "flex flex-col items-center justify-center pt-2 pb-1 transition-all duration-200 active:translate-y-0.5",
                isActive ? "text-primary border-t-2 border-primary bg-primary/5" : "text-slate-500"
              )}
            >
              <Icon size={20} />
              <span className="font-display text-[10px] font-bold tracking-widest uppercase mt-1">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* FAB */}
      <button className="fixed right-6 bottom-24 md:bottom-10 z-50 w-14 h-14 bg-primary-container text-black rounded-full shadow-[0_0_20px_rgba(0,209,255,0.6)] flex items-center justify-center active:scale-90 transition-transform">
        <PlusCircle size={24} />
      </button>

      {/* Side Menu Drawer Placeholder */}
      {isMenuOpen && (
        <motion.aside 
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          className="fixed inset-y-0 left-0 w-80 bg-[#050505] border-r border-primary/10 shadow-2xl z-[60] p-8"
        >
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-primary font-display font-black tracking-tighter italic">DIRECTOR_01</h2>
            <button onClick={() => setIsMenuOpen(false)} className="text-slate-500 hover:text-white">✕</button>
          </div>
          <div className="space-y-4">
            <div className="text-primary bg-primary/10 border-l-4 border-primary p-4 cursor-pointer font-display">TACTICAL_HUB</div>
            <div className="text-slate-400 hover:text-white p-4 cursor-pointer font-display">SQUAD_MANAGEMENT</div>
            <div className="text-slate-400 hover:text-white p-4 cursor-pointer font-display">MARKET_WATCH</div>
          </div>
        </motion.aside>
      )}
    </div>
  );
}

function LiquidMesh() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ y: y1 }}
        className="mesh-blob w-[600px] h-[600px] bg-primary/20 top-[-10%] left-[-10%]" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, -40, 0],
          y: [0, 60, 0] 
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{ y: y2 }}
        className="mesh-blob w-[500px] h-[500px] bg-secondary/15 bottom-[-5%] right-[-5%]" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, 180, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="mesh-blob w-[400px] h-[400px] bg-tertiary/10 top-[20%] right-[10%]" 
      />
    </div>
  );
}

function BackgroundParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: Math.random() * 0.5, 
            scale: Math.random() * 0.5 + 0.5,
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%"
          }}
          animate={{ 
            y: [null, "-200px"],
            opacity: [null, 0],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: Math.random() * 20 + 20, 
            repeat: Infinity, 
            ease: "linear",
            delay: -Math.random() * 20
          }}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
        />
      ))}
    </div>
  );
}

// View Components simplified for direct inclusion to avoid multi-file complexity in initial setup

function LiveHub() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-gutter"
    >
      {/* Ticker */}
      <motion.section variants={item} className="glass-card p-4 rounded-xl flex items-center gap-4 overflow-hidden">
        <div className="bg-secondary-container px-3 py-1 rounded-sm text-black font-display text-[10px] font-bold whitespace-nowrap animate-pulse flex items-center gap-2">
          <Activity size={14} /> LIVE NOW
        </div>
        <div className="ticker-wrap flex-1">
          <div className="flex gap-12 whitespace-nowrap animate-marquee items-center text-primary-container font-mono text-sm">
            <span>REAL MADRID 2 - 2 MAN CITY (88')</span>
            <span className="text-white/20">|</span>
            <span>ARSENAL 1 - 0 BAYERN (FT)</span>
            <span className="text-white/20">|</span>
            <span>PSG 1 - 3 DORTMUND (FT)</span>
            <span className="text-white/20">|</span>
            <span>INTER 2 - 1 AC MILAN (62')</span>
          </div>
        </div>
      </motion.section>

      {/* Main Focus Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <motion.div variants={item} className="md:col-span-8 space-y-gutter">
          <div className="glass-card rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
              <motion.img 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
                src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=2000" 
              />
            </div>
            <div className="p-8 relative z-10 bg-gradient-to-t from-background via-transparent to-transparent">
              <div className="flex justify-between items-center mb-8">
                <span className="text-primary font-display font-bold text-[10px] bg-primary/10 px-4 py-1 rounded-full border border-primary/20 tracking-widest uppercase backdrop-blur-md">
                  CHAMPIONS LEAGUE • SEMI-FINAL
                </span>
                <div className="flex items-center gap-2 text-secondary-container">
                  <Activity size={16} className="live-pulse" />
                  <span className="font-mono font-bold text-sm">88:14 LIVE</span>
                </div>
              </div>
              
              <div className="flex justify-around items-center py-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10 p-4 transition-transform group-hover:scale-110">
                    <img 
                      alt="Real Madrid Logo" 
                      className="w-full h-full object-contain" 
                      referrerPolicy="no-referrer"
                      src="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" 
                    />
                  </div>
                  <h3 className="font-display font-bold text-xl uppercase tracking-widest text-white/80">R. MADRID</h3>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="text-[80px] font-black italic tracking-tighter font-display flex items-baseline gap-2">
                    <span className="text-primary-container">2</span>
                    <span className="text-white/20 text-4xl mb-4">-</span>
                    <span>2</span>
                  </div>
                  <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Protocol: Agg_4-5</div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10 p-4 transition-transform group-hover:scale-110">
                    <img 
                      alt="Man City Logo" 
                      className="w-full h-full object-contain" 
                      referrerPolicy="no-referrer"
                      src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" 
                    />
                  </div>
                  <h3 className="font-display font-bold text-xl uppercase tracking-widest text-white/80">MAN CITY</h3>
                </div>
              </div>
              
              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="flex justify-between items-center text-slate-400 font-display font-bold text-[10px] tracking-widest mb-4">
                  <span>TACTICAL PERFORMANCE INDEX</span>
                  <span className="text-primary flex items-center gap-2">
                    <Zap size={12} className="fill-primary" /> 88% INTENSITY
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "88%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-primary-container shadow-[0_0_15px_#00D1FF]" 
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {[{ league: 'LA LIGA', time: "12'", teamA: 'RMA', teamB: 'BAR', score: '0 - 0', logoA: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg', logoB: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' },
              { league: 'BUNDESLIGA', time: "HT", teamA: 'FCB', teamB: 'BVB', score: '1 - 1', logoA: 'https://upload.wikimedia.org/wikipedia/en/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg', logoB: 'https://upload.wikimedia.org/wikipedia/en/6/67/Borussia_Dortmund_logo.svg' }].map((match, i) => (
              <motion.div 
                key={i} 
                variants={item}
                whileHover={{ y: -4, borderColor: 'rgba(0, 209, 255, 0.5)' }}
                className="glass-card p-6 rounded-2xl transition-colors cursor-pointer group"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-500 font-display font-bold text-[10px] tracking-widest uppercase">{match.league}</span>
                  <span className={cn("font-mono font-bold text-sm bg-white/5 px-2 py-0.5 rounded", match.time.includes("'") ? "text-secondary-container" : "text-slate-500")}>{match.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={match.logoA} referrerPolicy="no-referrer" className="w-8 h-8 object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span className="font-display font-bold text-lg">{match.teamA}</span>
                  </div>
                  <span className="font-black text-2xl tracking-tighter shadow-primary-container/20 drop-shadow-sm">{match.score}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-display font-bold text-lg">{match.teamB}</span>
                    <img src={match.logoB} referrerPolicy="no-referrer" className="w-8 h-8 object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="md:col-span-4 space-y-gutter">
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/5 blur-3xl -mr-16 -mt-16 group-hover:bg-tertiary/10 transition-colors" />
            <h2 className="font-display font-bold text-lg uppercase italic flex items-center gap-2 mb-6">
              <TrendingUp className="text-tertiary" size={20} /> MARKET INTEL
            </h2>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="text-tertiary font-display font-bold text-[10px] tracking-widest">PREDICTION_HIT_RATE: 94%</span>
              <p className="mt-2 text-sm leading-relaxed">Next Goal Scorer: <span className="text-primary-container font-bold">Erling Haaland</span> (76.4%)</p>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-primary-container text-black font-display font-bold text-[10px] py-2 rounded-sm uppercase hover:brightness-110 active:scale-[0.98] transition-all">BACK BET</button>
                <button className="w-10 border border-primary/40 flex items-center justify-center rounded-sm text-primary transition-colors hover:bg-primary/20">
                  <Share2 size={14} />
                </button>
              </div>
            </div>
            <div className="border-t border-white/5 my-6" />
            <h2 className="font-display font-bold text-lg uppercase italic flex items-center gap-2 mb-4 text-white/90">
              <AlertTriangle className="text-error" size={20} /> TRANSFER LEAKS
            </h2>
            <div className="space-y-4">
              {[ { name: 'Kylian Mbappé', club: 'REAL MADRID', prob: '99%', img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=100' },
                 { name: 'Bernardo Silva', club: 'FC BARCELONA', prob: '65%', img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=100' } ].map((leak, i) => (
                <div key={i} className="flex gap-4 items-center p-2 hover:bg-white/5 rounded-lg transition-all cursor-pointer group/item">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 overflow-hidden shrink-0 border border-white/10 group-hover/item:border-primary/40">
                    <img referrerPolicy="no-referrer" src={leak.img} className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all" />
                  </div>
                  <div>
                    <p className="text-sm font-bold group-hover/item:text-primary transition-colors">{leak.name}</p>
                    <p className="text-[10px] text-zinc-500 font-display font-bold uppercase tracking-widest">{leak.club} · <span className="text-secondary-container">{leak.prob} LIKELY</span></p>
                  </div>
                  <ArrowUpRight className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity text-primary" size={14} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-6 aspect-square flex flex-col group">
            <h2 className="font-display font-bold text-sm uppercase mb-4 tracking-widest text-primary/60 flex justify-between">
              TACTICAL_RADAR <Maximize2 size={12} className="cursor-pointer hover:text-primary transition-colors" />
            </h2>
            <div className="flex-1 relative flex items-center justify-center">
              <RadarIcon className="w-full h-full text-primary/20 transition-transform duration-700 group-hover:rotate-12" />
              <div className="absolute inset-0 flex flex-col justify-between p-2 font-display text-[8px] font-bold text-primary italic opacity-60">
                <div className="text-center">ATTACK</div>
                <div className="flex justify-between">
                  <span>PRESS</span>
                  <span>DEFENSE</span>
                </div>
                <div className="text-center">SPEED</div>
              </div>
            </div>
            <div className="mt-4 text-center">
               <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">LIVE_PLAYER: DE_BRUYNE_K</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function StatsAnalysis() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-gutter"
    >
      <motion.div variants={item} className="mb-12 border-l-4 border-primary pl-6">
        <div className="flex items-center gap-2 mb-2 text-secondary-container">
          <Activity size={14} className="animate-pulse" />
          <span className="font-display font-bold text-[10px] uppercase tracking-[0.2em]">Quantum Analysis Active</span>
        </div>
        <h2 className="font-display text-4xl font-bold uppercase text-white mb-2 tracking-tight flex items-center gap-4">
          EL_CLÁSICO_PROTOCOL <span className="text-primary/20 text-xl font-mono">// 2024.04</span>
        </h2>
        <p className="font-mono text-primary/60 uppercase text-xs">Hash: 882-QX-90-ALPHA | Strat_Depth: Level_9</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <motion.div variants={item} className="md:col-span-4 glass-card p-6 flex flex-col justify-between min-h-[460px] relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
            <BrainCircuit size={80} className="text-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white mb-8 uppercase flex items-center gap-2 tracking-widest">
              <BrainCircuit className="text-primary" size={20} /> AI_PROBABILITY
            </h3>
            <div className="space-y-8">
              {[ { label: 'REAL MADRID CF', val: 64, color: 'bg-primary' },
                 { label: 'STALEMATE_SYNC', val: 21, color: 'bg-zinc-600' },
                 { label: 'FC BARCELONA', val: 15, color: 'bg-zinc-400' } ].map((elem, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between font-display font-bold text-[10px] tracking-widest uppercase">
                    <span className="text-white/60">{elem.label}</span>
                    <span className={elem.val > 50 ? 'text-primary' : 'text-slate-500'}>{elem.val}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${elem.val}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 * i }}
                      className={cn("h-full", elem.color, elem.val > 50 && "shadow-[0_0_15px_rgba(0,209,255,0.6)]")} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 space-y-4">
             <div className="p-3 bg-white/5 border border-white/5 rounded text-[10px] font-mono text-zinc-500 italic">
                SENSORY_INPUT: Crowd noise peaking at 104dB. Neural net suggests home advantage +12.4%.
             </div>
             <button className="w-full bg-gradient-to-r from-primary to-primary-container text-black font-display font-bold text-[10px] tracking-[0.2em] py-4 rounded shadow-lg transition-all hover:scale-[1.02] active:scale-95 uppercase">
                Download Live Intel Pack
             </button>
          </div>
        </motion.div>

        <motion.div variants={item} className="md:col-span-8 glass-card p-6 min-h-[460px] flex flex-col group">
          <div className="flex justify-between items-start mb-8">
            <h3 className="font-display font-bold text-lg text-white uppercase flex items-center gap-2 tracking-widest">
              <Grid3X3 className="text-primary" size={20} /> POSITIONAL_HEATMAP
            </h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-primary/20 text-primary font-display font-bold text-[10px] border border-primary/30 uppercase tracking-widest">MADRID</span>
              <span className="px-3 py-1 bg-white/10 text-slate-400 font-display font-bold text-[10px] border border-white/10 uppercase tracking-widest">BARCA</span>
            </div>
          </div>
          <div className="flex-1 relative rounded-xl border border-primary/10 overflow-hidden bg-black/40 group-hover:border-primary/30 transition-colors">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-10 grayscale group-hover:scale-105 transition-transform duration-1000" />
             <div className="absolute top-[30%] left-[40%] w-32 h-32 bg-primary/40 blur-[50px] rounded-full animate-pulse" />
             <div className="absolute top-[50%] left-[65%] w-48 h-48 bg-primary/20 blur-[70px] rounded-full" />
             
             {/* Player Markers */}
             <motion.div 
               animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute top-1/2 left-1/4 flex flex-col items-center"
             >
                <div className="w-5 h-5 rounded-full bg-primary border-2 border-background shadow-[0_0_15px_#00D1FF] flex items-center justify-center font-bold text-[8px] text-black">07</div>
                <span className="mt-2 font-mono text-[8px] bg-black/80 px-2 py-0.5 border border-primary/20 backdrop-blur-sm text-primary uppercase">Vinícius_J</span>
             </motion.div>

             <motion.div 
               animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
               transition={{ duration: 5, repeat: Infinity }}
               className="absolute bottom-1/4 right-1/3 flex flex-col items-center"
             >
                <div className="w-5 h-5 rounded-full bg-secondary-container border-2 border-background shadow-[0_0_15px_#2FF801] flex items-center justify-center font-bold text-[8px] text-black">19</div>
                <span className="mt-2 font-mono text-[8px] bg-black/80 px-2 py-0.5 border border-secondary/20 backdrop-blur-sm text-secondary uppercase">Yamal_L</span>
             </motion.div>

             <div className="absolute bottom-4 right-4 flex gap-4 uppercase text-[8px] font-mono text-zinc-500">
                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-primary" /> DRIBBLE_ZONE</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-secondary" /> RECOVERY_STREAK</span>
             </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function NewsIntel() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const articleItem = {
    hidden: { opacity: 0, scale: 0.98 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-gutter"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6">
        <motion.div variants={articleItem}>
          <h1 className="font-display text-4xl font-black uppercase text-zinc-100 tracking-tighter mb-2 italic">Intelligence Terminal</h1>
          <p className="text-slate-500 font-display text-sm uppercase tracking-[0.2em]">Real-time market surveillance & data leaks</p>
        </motion.div>
        <motion.div variants={articleItem} className="flex items-center gap-4 mt-6 md:mt-0">
          <div className="flex items-center gap-2 bg-secondary-container/10 text-secondary-container px-4 py-1.5 rounded border border-secondary-container/30">
            <Activity size={14} className="animate-pulse" />
            <span className="font-display font-bold text-[10px] tracking-[0.2em] uppercase">LINK_ESTABLISHED</span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg text-primary uppercase italic tracking-widest">SURVEILLANCE_FEED</h2>
            <div className="flex gap-2">
              <button className="text-primary border border-primary/30 px-4 py-1.5 rounded-sm text-[10px] font-display font-bold bg-primary/10 tracking-widest uppercase">ENCRYPTED</button>
              <button className="text-slate-500 border border-white/10 px-4 py-1.5 rounded-sm text-[10px] font-display font-bold tracking-widest uppercase hover:bg-white/5 transition-colors">RAW_DATA</button>
            </div>
          </div>

          {[ { id: 1, type: 'OFFICIAL', title: 'MAN CITY SECURE WIRTZ_FLORIAN', time: '08:42 AM', isVerified: true, img: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=600' },
             { id: 2, type: 'LEAK', title: 'MADRID TRACKING SALIBA_PROTOCOL', time: '07:15 AM', isRumor: true, img: 'https://images.unsplash.com/photo-1431324155629-1a6eda1dc150?auto=format&fit=crop&q=80&w=600' } ].map((report) => (
            <motion.article 
              key={report.id} 
              variants={articleItem}
              whileHover={{ x: 4, borderColor: 'rgba(0, 209, 255, 0.4)' }}
              className="glass-card p-6 rounded-2xl group transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <Newspaper size={120} className="text-primary" />
              </div>
              <div className="flex gap-8">
                <div className="w-32 h-32 bg-zinc-800 rounded-lg border border-white/10 overflow-hidden shrink-0 group-hover:border-primary/50 transition-all duration-700">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    src={report.img} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-mono text-primary text-[10px] uppercase tracking-[0.3em]">{report.time} · {report.type}_INTEL</p>
                    <div className="flex gap-2">
                      {report.isVerified && <span className="bg-primary/20 text-primary text-[8px] font-bold px-2 py-0.5 border border-primary/20 rounded-sm tracking-widest uppercase">SECURE</span>}
                      {report.isRumor && <span className="bg-tertiary/20 text-tertiary text-[8px] font-bold px-2 py-0.5 border border-tertiary/20 rounded-sm tracking-widest uppercase">UNSTABLE</span>}
                    </div>
                  </div>
                  <h3 className="font-display font-black text-2xl text-white mb-3 group-hover:text-primary-container transition-colors uppercase tracking-tight">{report.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 font-display max-w-2xl">Transfer protocols initiated for €105m. Biometric medical scanners stand by. Market volatility projected +8.4%.</p>
                  <div className="flex items-center gap-6 text-slate-500 font-mono text-[10px] tracking-widest uppercase">
                    <span className="flex items-center gap-1.5 group-hover:text-primary transition-colors"><MessageSquare size={14} /> 2.1K_COMS</span>
                    <span className="flex items-center gap-1.5 group-hover:text-secondary transition-colors"><Share2 size={14} /> 842_NODES</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div variants={articleItem} className="lg:col-span-4 space-y-gutter">
           <h2 className="font-display font-bold text-lg text-primary uppercase italic tracking-widest mb-4">Target Spotlights</h2>
           <div className="glass-card rounded-2xl overflow-hidden border-t-2 border-primary group">
              <div className="h-56 bg-zinc-800 relative overflow-hidden">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  src="https://images.unsplash.com/photo-1510511459019-5dee9952da31?auto=format&fit=crop&q=80&w=800" 
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <h4 className="text-white font-display font-black text-2xl uppercase italic tracking-tighter">ERLING HAALAND</h4>
                  <p className="text-primary font-mono text-[10px] tracking-[0.5em] uppercase">STRIKER_MODEL_V9</p>
                </div>
                <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-xl px-4 py-3 border border-white/10 text-center rounded-lg">
                  <p className="text-[8px] text-zinc-500 font-display font-bold tracking-[0.3em] uppercase mb-1">VALUATION</p>
                  <p className="text-primary font-bold text-2xl tracking-tighter">€180M+</p>
                </div>
              </div>
              <div className="p-8 space-y-6 bg-zinc-900/50">
                 {[ { label: 'VELOCITY', val: 96 }, { label: 'PRECISION', val: 92 }, { label: 'PHYSICAL_SYNC', val: 98 } ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between items-center font-display text-[10px] tracking-widest uppercase">
                          <span className="text-slate-500">{stat.label}</span>
                          <span className="text-primary font-bold">{stat.val}</span>
                       </div>
                       <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${stat.val}%` }}
                            viewport={{ once: true }}
                            className="h-full bg-primary" 
                          />
                       </div>
                    </div>
                 ))}
                 <button className="w-full mt-4 py-3 border border-primary/30 text-primary font-display font-bold text-[10px] uppercase tracking-widest hover:bg-primary/5 transition-colors">Generate Scout_Data</button>
              </div>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function AwardsHub() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-gutter"
    >
      <div className="flex items-center justify-between mb-12">
        <motion.div variants={item}>
          <span className="font-display font-bold text-tertiary text-[10px] tracking-[0.3em] uppercase">Global Recognition</span>
          <h2 className="font-display text-4xl font-black uppercase text-white mt-1 tracking-tight">Ballon d'Or Hub</h2>
        </motion.div>
        <motion.div variants={item} className="flex items-center gap-2 px-4 py-2 bg-secondary-container/10 border border-secondary/30 rounded-full">
          <Activity size={14} className="text-secondary-container animate-pulse" />
          <span className="font-mono text-secondary-container text-xs tracking-widest">LIVE TRACKER</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div variants={item} className="lg:col-span-8 glass-card border border-tertiary/20 p-8 rounded-xl relative shadow-[0_0_30px_rgba(255,216,100,0.1)]">
           <h3 className="font-display font-bold text-2xl text-tertiary mb-10 uppercase italic tracking-widest">Power Rankings</h3>
           <div className="space-y-12">
              {[ { rank: '01', name: 'VINÍCIUS JÚNIOR', club: 'REAL MADRID', prob: '42.8%', img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=200' },
                  { rank: '02', name: 'JUDE BELLINGHAM', club: 'REAL MADRID', prob: '31.5%', img: 'https://images.unsplash.com/photo-1511447333015-45b65e60f64b?auto=format&fit=crop&q=80&w=200' } ].map((p, i) => (
                <div key={i} className="relative group cursor-pointer">
                   <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-6">
                         <span className="text-5xl font-black font-display text-tertiary/20 italic group-hover:text-tertiary/40 transition-colors uppercase">{p.rank}</span>
                         <div className="w-16 h-16 rounded-xl bg-zinc-800 border border-tertiary/30 overflow-hidden shrink-0 transform group-hover:scale-110 transition-transform duration-500">
                            <img src={p.img} referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
                         </div>
                         <div>
                            <p className="font-display font-bold text-lg tracking-tight group-hover:text-tertiary transition-colors">{p.name}</p>
                            <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">{p.club}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="font-display font-bold text-3xl text-tertiary">{p.prob}</p>
                         <p className="text-[9px] text-slate-500 font-display font-bold tracking-widest">WIN PROBABILITY</p>
                      </div>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: p.prob }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-tertiary shadow-[0_0_10px_#ffd864]" 
                      />
                   </div>
                </div>
              ))}
           </div>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-4 flex flex-col gap-6">
           <div className="glass-card p-6 border-l-4 border-tertiary rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-tertiary/5 blur-2xl -mr-12 -mt-12 group-hover:bg-tertiary/10 transition-colors" />
              <span className="font-display font-bold text-[10px] text-tertiary uppercase mb-2 block tracking-widest">Next Ceremony</span>
              <h4 className="font-display font-bold text-xl mb-1 tracking-tight">THE GALA</h4>
              <p className="text-slate-500 text-xs mb-8">THÉÂTRE DU CHÂTELET, PARIS</p>
              <div className="grid grid-cols-3 gap-2 text-center text-zinc-100">
                <div className="bg-white/5 rounded p-2"><p className="font-bold text-lg">12</p><p className="text-[8px] text-slate-500 font-display font-bold uppercase">DAYS</p></div>
                <div className="bg-white/5 rounded p-2"><p className="font-bold text-lg">08</p><p className="text-[8px] text-slate-500 font-display font-bold uppercase">HRS</p></div>
                <div className="bg-white/5 rounded p-2"><p className="font-bold text-lg">44</p><p className="text-[8px] text-slate-500 font-display font-bold uppercase">MINS</p></div>
              </div>
              <button className="w-full mt-8 py-3 bg-tertiary text-black font-display font-bold text-[11px] rounded uppercase tracking-widest shadow-[0_0_20px_rgba(255,216,100,0.3)] hover:brightness-110 active:scale-95 transition-all">Book VR Access</button>
           </div>
           
           <div className="glass-card rounded-xl overflow-hidden aspect-[4/3] relative group cursor-pointer">
              <motion.img 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 15, repeat: Infinity }}
                src="https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=600" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <div className="absolute bottom-6 left-6 z-20">
                <span className="text-primary font-display font-bold text-[10px] uppercase tracking-widest block mb-1">Category Spotlight</span>
                <h4 className="font-display font-bold text-xl uppercase tracking-tighter text-white">RISING STAR</h4>
                <p className="text-zinc-400 text-xs tracking-wide">LAMINE YAMAL LEADS KOPA TROPHY INDEX</p>
              </div>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function TeamHistory() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-gutter"
    >
      <motion.div variants={item} className="flex items-end justify-between border-b border-white/10 pb-4 mb-12">
        <div>
          <span className="font-display font-bold text-primary text-[10px] tracking-[0.3em] uppercase">ARCHIVE_DEPT</span>
          <h2 className="font-display font-black text-4xl text-zinc-100 mt-2 tracking-tight uppercase">Team History</h2>
        </div>
        <div className="flex items-center gap-2 text-secondary-container">
           <Activity size={14} className="animate-pulse" />
           <span className="font-mono text-xs tracking-widest uppercase">Live_Analysis</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative">
        <div className="absolute left-6 md:left-[33.3%] top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/5 to-transparent" />
        
        <motion.div variants={item} className="md:col-span-4 space-y-6">
           <div className="glass-card p-6 rounded-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <h3 className="font-display font-bold text-[10px] text-primary mb-6 border-b border-white/5 pb-2 tracking-widest uppercase">SEASON_METRICS</h3>
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center"><span className="text-slate-500 text-sm uppercase">Current Rank</span><span className="font-display font-bold text-2xl text-primary">02</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-500 text-sm uppercase">Win Prob</span><span className="font-mono text-secondary-container">74.2%</span></div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "74%" }}
                    viewport={{ once: true }}
                    className="h-full bg-primary shadow-[0_0_10px_#a4e6ff]" 
                  />
                </div>
              </div>
           </div>
        </motion.div>

        <div className="md:col-span-8 space-y-12">
           {[ { gw: 'GW 24', date: 'MAR 15', title: 'Derby Victory Spike', icon: Trophy, trend: '+1 Position', desc: 'Historical win against cross-town rivals propelled team to 2nd place. Form index reached seasonal peak of 9.2.' },
              { gw: 'GW 20', date: 'FEB 02', title: 'The Mid-Season Slump', icon: TrendingUp, streak: '3 Games', desc: 'Critical injuries to key defenders led to a significant drop in clean sheet probability.' } ].map((event, i) => {
             const Icon = event.icon;
             return (
              <motion.div key={i} variants={item} className="relative pl-12 md:pl-16">
                 <div className="absolute left-[21px] md:left-[-5px] top-1 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_#a4e6ff] z-10" />
                 <div className="glass-card p-6 rounded-xl hover:border-primary/40 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <p className="font-mono text-primary text-[10px] uppercase tracking-widest mb-1">{event.gw} • {event.date}</p>
                          <h4 className="font-display font-bold text-xl text-white uppercase tracking-tight">{event.title}</h4>
                       </div>
                       <Icon className="text-primary/60 group-hover:scale-125 transition-transform" size={20} />
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">{event.desc}</p>
                    {event.trend && (
                      <div className="bg-black/60 p-4 rounded-lg border border-white/5 flex items-center justify-between">
                        <span className="font-display font-bold text-[8px] text-slate-500 uppercase tracking-widest">Ranking_Trend</span>
                        <span className="text-secondary-container font-mono text-xs">{event.trend}</span>
                      </div>
                    )}
                 </div>
              </motion.div>
             );
           })}
        </div>
      </div>
    </motion.div>
  );
}

// Custom Icons for Radar
function RadarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
      <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
      <polygon points="50,20 80,40 70,80 30,70 20,35" fill="rgba(164, 230, 255, 0.4)" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
