
import React from 'react';

const QUBIT_COUNT = 4;
const TIME_STEPS = 10;

export const CircuitVisualizer: React.FC = () => {
  return (
    <div className="bg-slate-900/50 rounded-2xl border border-slate-800/80 p-8 overflow-x-auto relative">
      <div className="absolute top-4 right-6 text-[10px] font-mono text-cyan-500/50 uppercase tracking-widest">
        MKone Cognition substrate: ψ(θ)
      </div>
      
      <div className="min-w-[600px] py-4">
        {Array.from({ length: QUBIT_COUNT }).map((_, qIdx) => (
          <div key={qIdx} className="relative h-16 flex items-center">
            {/* Qubit Label */}
            <div className="w-28 font-mono text-sm">
              <span className="text-cyan-400">q({qIdx})</span>
              <span className="text-slate-600 mx-1">|ψ⟩</span>
              <span className="text-slate-500">——</span>
            </div>
            
            {/* Horizontal Wire */}
            <div className="absolute left-28 right-0 h-[1px] bg-slate-800" />
            
            {/* Gates */}
            <div className="flex-1 flex justify-around ml-4">
              {Array.from({ length: TIME_STEPS }).map((_, tIdx) => {
                const isRotGate = tIdx === 1;
                const isEntangle = tIdx > 1 && tIdx < 6 && (tIdx + qIdx) % 3 === 0;
                const isTimeCrystal = tIdx === 7;
                const isMeasure = tIdx === TIME_STEPS - 1;
                
                if (isMeasure) {
                  return (
                    <div key={tIdx} className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/40 rounded-lg flex items-center justify-center text-[10px] font-bold text-emerald-400 z-10 hover:bg-emerald-500/20 transition-all">
                      M
                    </div>
                  );
                }

                if (isRotGate) {
                  return (
                    <div key={tIdx} className="w-14 h-10 bg-blue-500/10 border border-blue-500/40 rounded-lg flex flex-col items-center justify-center text-[9px] font-bold text-blue-200 z-10 shadow-lg shadow-blue-500/5">
                      <span>Rx</span>
                      <span className="text-[7px] opacity-60">θ({qIdx})</span>
                    </div>
                  );
                }

                if (isTimeCrystal) {
                   return (
                    <div key={tIdx} className="w-14 h-10 bg-amber-500/10 border border-amber-500/40 rounded-lg flex flex-col items-center justify-center text-[9px] font-bold text-amber-200 z-10 animate-pulse">
                      <span>Rz(t)</span>
                    </div>
                  );
                }

                if (isEntangle) {
                  return (
                    <div key={tIdx} className="w-8 h-8 rounded-full border border-purple-500/40 bg-purple-500/5 flex items-center justify-center text-[8px] text-purple-400 z-10">
                      •
                    </div>
                  );
                }

                return <div key={tIdx} className="w-10" />;
              })}
            </div>
          </div>
        ))}

        {/* CNOT Vertical Lines */}
        <div className="absolute inset-0 pointer-events-none mt-10 ml-28 pl-4 pr-10">
           {/* Visual CNOT connections */}
           <div className="absolute left-[28%] top-8 bottom-40 w-[1px] bg-purple-500/30">
             <div className="absolute top-0 -left-1 w-2 h-2 rounded-full bg-purple-500" />
             <div className="absolute bottom-0 -left-2 w-4 h-4 rounded-full border border-purple-500 flex items-center justify-center bg-slate-900">
                <span className="text-[10px] text-purple-500">+</span>
             </div>
           </div>
           
           <div className="absolute left-[42%] top-24 bottom-24 w-[1px] bg-purple-500/30">
             <div className="absolute top-0 -left-1 w-2 h-2 rounded-full bg-purple-500" />
             <div className="absolute bottom-0 -left-2 w-4 h-4 rounded-full border border-purple-500 flex items-center justify-center bg-slate-900">
                <span className="text-[10px] text-purple-500">+</span>
             </div>
           </div>

           <div className="absolute left-[56%] top-40 bottom-8 w-[1px] bg-purple-500/30">
             <div className="absolute top-0 -left-1 w-2 h-2 rounded-full bg-purple-500" />
             <div className="absolute bottom-0 -left-2 w-4 h-4 rounded-full border border-purple-500 flex items-center justify-center bg-slate-900">
                <span className="text-[10px] text-purple-500">+</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
