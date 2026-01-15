
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts';

const data = Array.from({ length: 30 }).map((_, i) => ({
  epoch: i,
  loss: Math.exp(-i / 8) * 0.9 + Math.random() * 0.03,
  coherence: 0.4 + (0.55 * (1 - Math.exp(-i / 15))) + Math.random() * 0.02,
  fidelity: 0.3 + (0.65 * (1 - Math.exp(-i / 20))) + Math.random() * 0.01,
  entropy: 0.7 * Math.exp(-i / 18) + 0.05,
}));

export const StatsDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Alignment Loss */}
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-sm font-semibold text-slate-400 flex items-center uppercase tracking-widest">
              <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
              Alignment Loss L(θ)
            </h4>
            <span className="text-[10px] text-slate-500 font-mono">Twistor Gradient</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="epoch" hide />
                <YAxis hide domain={[0, 1]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#f87171' }}
                />
                <Area type="monotone" dataKey="loss" stroke="#f87171" fillOpacity={1} fill="url(#colorLoss)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ψ-Field Coherence */}
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-sm font-semibold text-slate-400 flex items-center uppercase tracking-widest">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
              ψ-Field Coherence
            </h4>
            <span className="text-[10px] text-slate-500 font-mono">Ξα Coupling</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="epoch" hide />
                <YAxis hide domain={[0.3, 1]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Line type="monotone" dataKey="coherence" stroke="#22d3ee" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="entropy" stroke="#475569" strokeWidth={1} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Topology Fidelity - Self-Similar Projection Metrics */}
      <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-sm font-semibold text-slate-400 flex items-center uppercase tracking-widest">
            <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
            Topology Fidelity (Ψ⊗Ψ†)
          </h4>
          <span className="text-[10px] text-slate-500 font-mono">Self-Similarity Index</span>
        </div>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.slice(-15)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="epoch" hide />
              <YAxis hide domain={[0, 1]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                itemStyle={{ color: '#f472b6' }}
              />
              <Bar dataKey="fidelity" fill="#f472b6" radius={[4, 4, 0, 0]} opacity={0.6} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4 text-[10px] text-slate-500 font-mono text-center">
          Projection alignment approaching threshold (0.985 η)
        </p>
      </div>
    </div>
  );
};
