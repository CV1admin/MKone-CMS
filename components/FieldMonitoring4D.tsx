
import React, { useEffect, useRef } from 'react';

export const FieldMonitoring4D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const rows = 20;
      const cols = 20;
      const spacingX = canvas.width / cols;
      const spacingY = canvas.height / rows;

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.lineWidth = 1;

      // Draw grid lines and points with 3D-like perspective
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * spacingX;
          const y = j * spacingY;
          
          // Pseudo-3D transformation
          const offsetX = (y - canvas.height / 2) * 0.2;
          
          // Field fluctuations (The 4th Dimension: Time-based evolution)
          const z = Math.sin(time + i * 0.3 + j * 0.2) * 20 + 
                    Math.cos(time * 0.8 + (i + j) * 0.4) * 10;
          
          const finalX = x + offsetX;
          const finalY = y - z;

          if (j === 0) ctx.moveTo(finalX, finalY);
          else ctx.lineTo(finalX, finalY);

          // Draw "quanta" points
          if (i % 2 === 0 && j % 2 === 0) {
            const intensity = (z + 30) / 60;
            ctx.fillStyle = `rgba(129, 140, 248, ${intensity * 0.8})`;
            ctx.beginPath();
            ctx.arc(finalX, finalY, 2 + intensity * 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Subtle glow for high amplitude areas
            if (intensity > 0.7) {
              ctx.shadowBlur = 10;
              ctx.shadowColor = '#818cf8';
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        }
      }
      
      time += 0.05;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] bg-slate-950/50 rounded-2xl border border-slate-800/60 overflow-hidden group">
      <canvas ref={canvasRef} className="w-full h-full opacity-60" />
      
      {/* HUD Overlays */}
      <div className="absolute top-4 left-4 flex flex-col space-y-2 pointer-events-none">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></div>
          <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Live ψ-Field Stream</span>
        </div>
        <div className="text-[9px] font-mono text-slate-500 uppercase">
          Coord: [X, Y, Z, T]
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col items-end space-y-1 pointer-events-none text-right">
        <div className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest font-bold">Ξα Symmetry Lock</div>
        <div className="text-[8px] font-mono text-slate-600">Phase: {(Math.random() * Math.PI).toFixed(4)} rad</div>
      </div>

      {/* Grid scanning effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent h-1/2 w-full animate-[scan_4s_linear_infinite] pointer-events-none" />
      
      <style>{`
        @keyframes scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(200%); }
        }
      `}</style>
    </div>
  );
};
