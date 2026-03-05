import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Zap, 
  Database, 
  Target, 
  TrendingUp, 
  AlertCircle, 
  BarChart3, 
  Layers, 
  ShoppingBag, 
  ArrowRight,
  Loader2,
  MessageSquare,
  Globe,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types for the research results
interface ResearchResults {
  productName: string;
  summary: string;
  sentimentScore: string;
  topComplaints: string[];
  pricingInsights: string;
  strategicRecommendations: string[];
}

export default function App() {
  // State Management
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'Quick' | 'Deep'>('Quick');
  const [kpis, setKpis] = useState<string[]>(['Margins']);
  const [marketplaces, setMarketplaces] = useState<string[]>(['Amazon']);
  const [category, setCategory] = useState('Electronics');
  const [goal, setGoal] = useState('Growth');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ResearchResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const kpiOptions = ['GMV', 'CAC', 'LTV', 'Margins', 'Conversion', 'AOV'];
  const marketplaceOptions = ['Amazon', 'Flipkart', 'Shopify', 'D2C', 'Meesho', 'Myntra'];
  const categoryOptions = ['Electronics', 'Fashion', 'FMCG', 'Home', 'Sports', 'Beauty'];
  const goalOptions = ['Growth', 'Retention', 'Profitability', 'Market Share'];

  const toggleKpi = (kpi: string) => {
    setKpis(prev => prev.includes(kpi) ? prev.filter(k => k !== kpi) : [...prev, kpi]);
  };

  const toggleMarketplace = (mp: string) => {
    setMarketplaces(prev => prev.includes(mp) ? prev.filter(m => m !== mp) : [...prev, mp]);
  };

  const handleResearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, mode, kpis, marketplaces, category, goal }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch research data');
      }

      const data = await response.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <span className="text-black font-bold text-xl">E</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">EcomIntel</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">Research Agent</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Live</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
            <Zap className="w-3 h-3 text-amber-500" />
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">{mode} Mode</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Goal: {goal}</span>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="w-72 border-r border-white/5 bg-[#0d0d0f] overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* Research Mode */}
          <section>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">Research Mode</h3>
            <div className="grid grid-cols-2 gap-2 p-1 bg-black/40 rounded-xl border border-white/5">
              <button 
                onClick={() => setMode('Quick')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${mode === 'Quick' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
              >
                <Zap className="w-3.5 h-3.5" /> Quick
              </button>
              <button 
                onClick={() => setMode('Deep')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${mode === 'Deep' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
              >
                <Database className="w-3.5 h-3.5" /> Deep
              </button>
            </div>
            <p className="text-[10px] text-slate-600 mt-3 italic">
              {mode === 'Quick' ? '< 2 min · Prices, complaints, sentiment' : '10 min · Full competitive analysis, demand trends'}
            </p>
          </section>

          {/* KPI Focus */}
          <section>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">KPI Focus</h3>
            <div className="flex flex-wrap gap-2">
              {kpiOptions.map(kpi => (
                <button
                  key={kpi}
                  onClick={() => toggleKpi(kpi)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${kpis.includes(kpi) ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'}`}
                >
                  {kpi}
                </button>
              ))}
            </div>
          </section>

          {/* Marketplaces */}
          <section>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">Marketplaces</h3>
            <div className="flex flex-wrap gap-2">
              {marketplaceOptions.map(mp => (
                <button
                  key={mp}
                  onClick={() => toggleMarketplace(mp)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${marketplaces.includes(mp) ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'}`}
                >
                  {mp}
                </button>
              ))}
            </div>
          </section>

          {/* Product Categories */}
          <section>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">Product Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${category === cat ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* Business Goal */}
          <section>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">Business Goal</h3>
            <div className="flex flex-wrap gap-2">
              {goalOptions.map(g => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${goal === g ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </section>

          {/* Quick Prompts */}
          <section>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">Quick Prompts</h3>
            <div className="space-y-2">
              {[
                'Top complaints for AirPods Pro',
                'Price comparison: Samsung S24',
                'Sentiment analysis for Sony WH-1000XM5',
                'Deep analysis: iPhone 15 demand'
              ].map(prompt => (
                <button
                  key={prompt}
                  onClick={() => setQuery(prompt)}
                  className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-400 hover:border-emerald-500/50 hover:text-slate-200 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-3 h-3 text-slate-600 group-hover:text-emerald-500" />
                    {prompt}
                  </div>
                </button>
              ))}
            </div>
          </section>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#0a0a0c] relative custom-scrollbar">
          <div className="max-w-5xl mx-auto p-12 pb-32">
            {!results && !isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-20"
              >
                <h2 className="text-7xl font-black tracking-tighter text-white mb-6 leading-[0.9]">
                  From <span className="text-emerald-500">Catalogs</span><br />
                  to Business Decisions
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                  Ask about product performance, competitor pricing, customer sentiment, 
                  or demand trends — and get structured insights tied to your goals.
                </p>

                <div className="grid grid-cols-2 gap-6 mt-16 text-left">
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all">
                    <Zap className="w-8 h-8 text-amber-500 mb-4" />
                    <h4 className="text-white font-bold mb-2">Quick Insights</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">Price comparisons, top complaints, sentiment scores in under 2 minutes</p>
                  </div>
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all">
                    <BarChart3 className="w-8 h-8 text-blue-500 mb-4" />
                    <h4 className="text-white font-bold mb-2">Deep Research</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">Full competitive analysis, demand trends, margin optimization in 10 min</p>
                  </div>
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all">
                    <Layers className="w-8 h-8 text-purple-500 mb-4" />
                    <h4 className="text-white font-bold mb-2">Domain Memory</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">Remembers your KPIs, preferred marketplaces, and product categories</p>
                  </div>
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all">
                    <Target className="w-8 h-8 text-rose-500 mb-4" />
                    <h4 className="text-white font-bold mb-2">Business Focus</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">Actionable recommendations tied to growth, retention, or profitability goals</p>
                  </div>
                </div>
              </motion.div>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-t-2 border-emerald-500 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-emerald-500 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mt-8">Analyzing Market Intelligence...</h3>
                <p className="text-slate-500 mt-2">Fetching live data from SerpApi and processing with Gemini 1.5 Flash</p>
                <div className="mt-12 w-full max-w-md bg-white/5 h-1 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-emerald-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 15, ease: "linear" }}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="mt-8 p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-rose-500 shrink-0" />
                <div>
                  <h4 className="text-rose-500 font-bold mb-1">Research Failed</h4>
                  <p className="text-rose-400/80 text-sm">{error}</p>
                </div>
              </div>
            )}

            {results && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="flex items-end justify-between border-b border-white/5 pb-8">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-500 font-black mb-2 block">Analysis Complete</span>
                    <h2 className="text-5xl font-black tracking-tight text-white">{results.productName}</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black text-emerald-500">{results.sentimentScore}</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Sentiment Score</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {/* Summary Card */}
                  <div className="col-span-2 p-8 rounded-3xl bg-white/5 border border-white/10">
                    <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-emerald-500" /> Executive Summary
                    </h4>
                    <p className="text-slate-200 leading-relaxed text-lg font-medium">{results.summary}</p>
                  </div>

                  {/* Pricing Insights */}
                  <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                    <h4 className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Pricing Insights
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{results.pricingInsights}</p>
                  </div>

                  {/* Top Complaints */}
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <h4 className="text-rose-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> Top Complaints
                    </h4>
                    <ul className="space-y-3">
                      {results.topComplaints.map((complaint, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                          {complaint}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Strategic Recommendations */}
                  <div className="col-span-2 p-8 rounded-3xl bg-blue-500/5 border border-blue-500/20">
                    <h4 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Strategic Recommendations
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {results.strategicRecommendations.map((rec, i) => (
                        <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/5 text-sm text-slate-300 flex gap-3">
                          <span className="text-blue-500 font-bold">{i + 1}.</span>
                          {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Search Bar Container */}
          <div className="fixed bottom-0 left-72 right-0 p-8 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c] to-transparent">
            <div className="max-w-4xl mx-auto">
              <form 
                onSubmit={handleResearch}
                className="relative group"
              >
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input 
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask anything about your products, competitors, or market... (Quick | Deep)"
                  className="w-full bg-[#16161a] border border-white/10 rounded-2xl py-5 pl-16 pr-32 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-2xl"
                />
                <div className="absolute inset-y-2 right-2 flex items-center gap-2">
                  <button 
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className="h-full px-6 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-black font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/10"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                    Research
                  </button>
                </div>
              </form>
              <div className="flex items-center justify-between mt-3 px-4">
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Zap className="w-3 h-3" /> {mode} ~{mode === 'Quick' ? '2min' : '10min'}</span>
                  <span className="flex items-center gap-1.5"><ShoppingBag className="w-3 h-3" /> {marketplaces.join(', ')}</span>
                  <span className="flex items-center gap-1.5"><Target className="w-3 h-3" /> {goal}</span>
                </div>
                <div className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                  Shift+Enter for newline
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
