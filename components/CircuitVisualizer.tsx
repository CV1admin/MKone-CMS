
import React from 'react';

const QUBIT_COUNT = 4;
const TIME_STEPS = 12;

export const CircuitVisualizer: React.FC = () => {
  return (
    <div className="bg-slate-900/50 rounded-2xl border border-slate-800/80 p-8 overflow-x-auto relative">
      <div className="absolute top-4 right-6 text-[10px] font-mono text-cyan-500/50 uppercase tracking-widest">
        MKone Cognition substrate: ψ(θ) — Evolution Mode
      </div>
      
      <div className="min-w-[700px] py-4">
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
                const isRxIntent = tIdx === 1;
                const isRzPhase = tIdx === 2;
                const isCZAuchor = tIdx === 4 && (qIdx === 0 || qIdx === 1);
                const isRXXCoherence = tIdx === 7 && (qIdx === 2 || qIdx === 3);
                const isProjection = tIdx === 9;
                const isMeasure = tIdx === TIME_STEPS - 1;
                
                if (isMeasure) {
                  return (
                    <div key={tIdx} className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/40 rounded-lg flex items-center justify-center text-[10px] font-bold text-emerald-400 z-10 hover:bg-emerald-500/20 transition-all">
                      M
                    </div>
                  );
                }

                if (isRxIntent) {
                  return (
                    <div key={tIdx} className="w-12 h-10 bg-blue-500/10 border border-blue-500/40 rounded-lg flex flex-col items-center justify-center text-[8px] font-bold text-blue-200 z-10 shadow-sm">
                      <span>Rx(θ)</span>
                    </div>
                  );
                }

                if (isRzPhase) {
                  return (
                    <div key={tIdx} className="w-12 h-10 bg-amber-500/10 border border-amber-500/40 rounded-lg flex flex-col items-center justify-center text-[8px] font-bold text-amber-200 z-10">
                      <span>Rz(θ)</span>
                    </div>
                  );
                }

                if (isCZAuchor) {
                   return (
                    <div key={tIdx} className="w-10 h-10 border border-purple-500/30 flex items-center justify-center z-10">
                       {qIdx === 0 ? <div className="w-2 h-2 rounded-full bg-purple-500" /> : <div className="w-4 h-4 rounded-full border border-purple-500" />}
                    </div>
                  );
                }

                if (isRXXCoherence) {
                  return (
                    <div key={tIdx} className="w-14 h-10 bg-indigo-500/10 border border-indigo-500/40 rounded-lg flex items-center justify-center text-[8px] font-bold text-indigo-300 z-10">
                      RXX
                    </div>
                  );
                }

                if (isProjection) {
                   return (
                    <div key={tIdx} className="w-16 h-12 bg-pink-500/20 border border-pink-500/40 rounded flex items-center justify-center text-[7px] font-bold text-pink-200 z-10 shadow-lg shadow-pink-500/10">
                      Ψ⊗Ψ†
                    </div>
                  );
                }

                return <div key={tIdx} className="w-10" />;
              })}
            </div>
          </div>
        ))}

        {/* CNOT/CZ Connectors */}
        <div className="absolute inset-0 pointer-events-none mt-10 ml-28 pl-4 pr-10">
           {/* Visual CZ link */}
           <div className="absolute left-[34%] top-8 h-16 w-[1px] bg-purple-500/30" />
           {/* Visual RXX link */}
           <div className="absolute left-[60%] top-40 h-16 w-[1px] bg-indigo-500/30" />
        </div>
      </div>
    </div>
  );
};
