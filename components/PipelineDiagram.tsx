
import React, { useEffect, useState } from 'react';
import { PIPELINE_STEPS } from '../constants';
import { ArrowRight, ChevronRight, Share2 } from 'lucide-react';

export const PipelineDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PIPELINE_STEPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getColorClass = (color: string) => {
    switch(color) {
      case 'blue': return 'bg-blue-900/30 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] ring-blue-500';
      case 'purple': return 'bg-purple-900/30 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)] ring-purple-500';
      case 'indigo': return 'bg-indigo-900/30 border-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.3)] ring-indigo-400';
      case 'emerald': return 'bg-emerald-900/30 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-emerald-500';
      default: return 'bg-slate-900/30 border-slate-500 ring-slate-500';
    }
  };

  const getTextColorClass = (color: string) => {
    switch(color) {
      case 'blue': return 'text-blue-400';
      case 'purple': return 'text-purple-400';
      case 'indigo': return 'text-indigo-400';
      case 'emerald': return 'text-emerald-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-between py-16 px-4 md:flex-row gap-4 lg:gap-8">
      {PIPELINE_STEPS.map((step, idx) => (
        <React.Fragment key={step.id}>
          {/* Step Node */}
          <div className={`relative flex flex-col items-center transition-all duration-700 transform ${activeStep === idx ? 'scale-110' : 'scale-95 opacity-60'}`}>
            <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center border-2 transition-all duration-700
              ${getColorClass(step.color)}
              ${activeStep === idx ? 'border-4 ring-8 ring-opacity-10' : ''}`}>
              <div className={getTextColorClass(step.color)}>
                {step.icon}
              </div>
            </div>
            
            <div className="mt-5 text-center max-w-[160px]">
              <h3 className={`font-bold text-sm tracking-tight ${activeStep === idx ? 'text-white' : 'text-slate-400'}`}>
                {step.title}
              </h3>
              <div className="mt-2 space-y-1">
                {step.details.map((d, i) => (
                  <div key={i} className="flex items-center justify-center text-[10px] text-slate-500">
                    <span className="w-1 h-1 rounded-full bg-slate-700 mr-1.5" />
                    {d}
                  </div>
                ))}
              </div>
            </div>

            {/* Pulsing indicator */}
            {activeStep === idx && (
              <div className={`absolute -top-3 -right-3 w-6 h-6 rounded-full animate-ping opacity-40
                ${step.color === 'blue' ? 'bg-blue-400' : step.color === 'purple' ? 'bg-purple-400' : step.color === 'indigo' ? 'bg-indigo-400' : 'bg-emerald-400'}`} />
            )}
          </div>

          {/* Connectors */}
          {idx < PIPELINE_STEPS.length - 1 && (
            <div className="hidden md:flex flex-1 items-center justify-center -mt-16">
              <div className="relative w-full h-0.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`absolute h-full transition-all duration-1000 ease-in-out
                    ${getTextColorClass(step.color).replace('text', 'bg')}`}
                  style={{ 
                    width: activeStep > idx ? '100%' : activeStep === idx ? '50%' : '0%',
                    left: '0' 
                  }}
                />
              </div>
              <ArrowRight className={`w-5 h-5 ml-2 ${activeStep > idx ? getTextColorClass(PIPELINE_STEPS[idx+1].color) : 'text-slate-800'}`} />
            </div>
          )}
        </React.Fragment>
      ))}
      
      {/* Feedback Loop Line: Conscious Feedback */}
      <div className="absolute inset-x-0 bottom-4 pointer-events-none opacity-30">
        <svg className="w-full h-24" viewBox="0 0 1000 100" preserveAspectRatio="none">
           <path 
             d="M 900,50 Q 500,120 100,50" 
             fill="none" 
             stroke="#10b981" 
             strokeWidth="2" 
             strokeDasharray="8,8"
             className="animate-[dash_15s_linear_infinite]"
           />
           <text x="500" y="90" textAnchor="middle" className="text-[10px] fill-emerald-400 font-mono tracking-widest uppercase">
             Conscious Feedback Loop ↺ Adam/Parameter-Shift
           </text>
        </svg>
      </div>
      
      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -200; }
        }
      `}</style>
    </div>
  );
};
