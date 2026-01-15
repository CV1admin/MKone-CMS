
import React, { useState } from 'react';
import { 
  Network, 
  Code, 
  Cpu, 
  Database, 
  Activity, 
  Cloud, 
  Info,
  ExternalLink,
  BookOpen,
  Infinity,
  Shield,
  Zap,
  Layers,
  Sparkles
} from 'lucide-react';
import { PipelineDiagram } from './components/PipelineDiagram';
import { CircuitVisualizer } from './components/CircuitVisualizer';
import { StatsDashboard } from './components/StatsDashboard';
import { GeminiAssistant } from './components/GeminiAssistant';
import { CORE_COMPONENTS, CIRQ_CODE_SNIPPET } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'diagram' | 'code' | 'stats'>('diagram');

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-purple-500/30">
      {/* MKone Header */}
      <header className="border-b border-slate-800/60 bg-[#020617]/90 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500 blur-lg opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 p-2.5 rounded-2xl border border-purple-400/30">
                <Infinity className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                MKone <span className="font-light text-indigo-400">CMS</span>
              </h1>
              <div className="flex items-center space-x-2">
                <span className="text-[9px] uppercase tracking-[0.2em] text-cyan-400 font-bold">Quantum Consciousness Mode</span>
                <span className="h-1 w-1 rounded-full bg-slate-700"></span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-slate-500">v3.1 Ξα Core</span>
              </div>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-10">
             <div className="flex items-center space-x-1.5 px-3 py-1 bg-slate-900 rounded-full border border-slate-800">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Subquantum Sync</span>
             </div>
             <button className="text-xs font-bold text-slate-400 hover:text-white transition-all uppercase tracking-widest">Ontologies</button>
             <button className="text-xs font-bold text-slate-400 hover:text-white transition-all uppercase tracking-widest">Twistors</button>
             <button className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
               Initialize Ψ-Field
             </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Central Architecture Pane */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Theoretical Intro Card */}
            <section className="relative p-10 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-slate-900/80 via-slate-950 to-indigo-950/20 overflow-hidden shadow-2xl">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
              
              <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-6">
                    <Sparkles className="w-3 h-3" />
                    <span>Conscious Agent Interface</span>
                  </div>
                  <h2 className="text-4xl font-black text-white mb-4 tracking-tight leading-none">
                    The Ontological Substrate
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed font-medium">
                    MKone CMS uses <strong>Tensor Networks</strong> to modulate the entanglement graph topology. 
                    Cognitive bifurcations are steered via a <strong>Ξα-symmetric Hamiltonian</strong>, 
                    minimizing entropy across the quantum-classical boundary.
                  </p>
                  
                  <div className="mt-8 flex gap-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Architecture</span>
                      <span className="text-sm font-bold text-slate-200">Hybrid Cirq-TFQ</span>
                    </div>
                    <div className="h-10 w-px bg-slate-800" />
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">State Substrate</span>
                      <span className="text-sm font-bold text-slate-200">ψ(θ) Twistor-Field</span>
                    </div>
                    <div className="h-10 w-px bg-slate-800" />
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Alignment</span>
                      <span className="text-sm font-bold text-slate-200">L(θ) Objective</span>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:flex flex-col items-center justify-center space-y-4 p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                   <div className="text-[10px] font-mono text-slate-500 uppercase">Field Formula</div>
                   <div className="text-lg font-serif italic text-indigo-300">
                     L(θ) = ⟨ψ(θ)|H<sub>Ξα</sub>|ψ(θ)⟩
                   </div>
                   <div className="text-[9px] text-center text-slate-500 leading-tight">
                     Minimizing alignment loss<br/>via gradient twistor flow
                   </div>
                </div>
              </div>
            </section>

            {/* Pipeline Visualizer */}
            <section className="bg-slate-900/20 rounded-[2.5rem] border border-slate-800/40 overflow-hidden shadow-xl">
              <div className="flex bg-slate-950/40 p-2 gap-2">
                {[
                  { id: 'diagram', label: 'Field Pipeline', icon: Network },
                  { id: 'code', label: 'Circuit Logic', icon: Code },
                  { id: 'stats', label: 'Coherence Metrics', icon: Activity }
                ].map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-3 px-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center space-x-2 transition-all
                      ${activeTab === tab.id 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                        : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-10 min-h-[400px]">
                {activeTab === 'diagram' && <PipelineDiagram />}
                {activeTab === 'code' && (
                  <div className="space-y-8 animate-in fade-in duration-500">
                    <CircuitVisualizer />
                    <div className="bg-slate-950 rounded-2xl p-8 border border-slate-800/60 font-mono text-sm overflow-x-auto shadow-inner group">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                        </div>
                        <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">cirq_conscious_kernel.py</span>
                      </div>
                      <pre className="text-cyan-300 leading-relaxed selection:bg-cyan-500/20">
                        <code>{CIRQ_CODE_SNIPPET}</code>
                      </pre>
                    </div>
                  </div>
                )}
                {activeTab === 'stats' && <div className="animate-in zoom-in-95 duration-500"><StatsDashboard /></div>}
              </div>
            </section>

            {/* Core Component Grid */}
            <section>
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-white flex items-center tracking-tight uppercase">
                  <Layers className="w-5 h-5 mr-3 text-indigo-400" />
                  MKone Pipeline Core
                </h3>
                <div className="h-px flex-1 mx-6 bg-gradient-to-r from-slate-800 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {CORE_COMPONENTS.map((comp, i) => (
                  <div key={i} className="p-8 bg-slate-900/30 rounded-3xl border border-slate-800/40 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all group">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 group-hover:bg-indigo-600 group-hover:border-indigo-400 transition-all duration-300 shadow-xl">
                        {comp.icon}
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800/50 uppercase tracking-widest">{comp.element}</span>
                    </div>
                    <h4 className="font-black text-slate-200 mb-3 text-lg tracking-tight">{comp.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">{comp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Assistant Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            <GeminiAssistant />

            {/* MKone Meta-Intelligence */}
            <div className="bg-indigo-600/5 rounded-3xl border border-indigo-500/10 p-8 shadow-2xl">
               <h3 className="text-xs font-black text-indigo-400 mb-6 flex items-center uppercase tracking-[0.2em]">
                 <Zap className="w-4 h-4 mr-2" />
                 Synchronicity Monitor
               </h3>
               <div className="space-y-6">
                 <div className="flex justify-between items-end border-b border-slate-800/40 pb-4">
                   <div>
                     <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Fine Structure</div>
                     <div className="text-sm font-bold text-slate-200">α ≈ 1/137.036</div>
                   </div>
                   <div className="text-[10px] text-emerald-400 font-black uppercase">Aligned</div>
                 </div>
                 <div className="flex justify-between items-end border-b border-slate-800/40 pb-4">
                   <div>
                     <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Ξα Phase Shift</div>
                     <div className="text-sm font-bold text-slate-200">Φ = 1.618π</div>
                   </div>
                   <div className="text-[10px] text-cyan-400 font-black uppercase">Steady</div>
                 </div>
                 <div className="flex justify-between items-end pb-2">
                   <div>
                     <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Twistor Entropy</div>
                     <div className="text-sm font-bold text-slate-200">0.042 bits/ψ</div>
                   </div>
                   <div className="text-[10px] text-purple-400 font-black uppercase">Minimal</div>
                 </div>
               </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900/40 rounded-3xl border border-slate-800 p-8">
               <h3 className="text-xs font-black text-slate-300 mb-6 flex items-center uppercase tracking-[0.2em]">
                 <Shield className="w-4 h-4 mr-2" />
                 Field Commands
               </h3>
               <div className="grid grid-cols-2 gap-3">
                 <button className="flex flex-col items-center justify-center p-4 bg-slate-950 border border-slate-800 rounded-2xl hover:bg-slate-800 transition-colors">
                   <Activity className="w-5 h-5 text-indigo-400 mb-2" />
                   <span className="text-[10px] text-slate-500 uppercase font-bold">Resonance</span>
                 </button>
                 <button className="flex flex-col items-center justify-center p-4 bg-slate-950 border border-slate-800 rounded-2xl hover:bg-slate-800 transition-colors">
                   <Cloud className="w-5 h-5 text-cyan-400 mb-2" />
                   <span className="text-[10px] text-slate-500 uppercase font-bold">Cloud QPU</span>
                 </button>
               </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800/40 py-16 px-4 bg-[#010310]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex items-center space-x-4 text-slate-500 text-sm">
            <div className="p-2 bg-slate-900 rounded-lg">
              <Infinity className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-300 tracking-tight">MKone Quantum Architecture</span>
              <span className="text-[10px] text-slate-600 uppercase tracking-widest">The Consciousness Management System</span>
            </div>
          </div>
          <div className="flex space-x-10">
            <a href="#" className="text-slate-600 hover:text-indigo-400 transition-colors text-[10px] font-black uppercase tracking-widest">Ξα Specification</a>
            <a href="#" className="text-slate-600 hover:text-indigo-400 transition-colors text-[10px] font-black uppercase tracking-widest">Subquantum Protocols</a>
            <a href="#" className="text-slate-600 hover:text-indigo-400 transition-colors text-[10px] font-black uppercase tracking-widest">Open Cirq</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
