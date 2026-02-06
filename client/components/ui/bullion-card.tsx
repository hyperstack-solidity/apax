import React from "react";
import { cn } from "@/lib/utils";

interface BullionCardProps {
  type: "gold" | "silver" | "platinum";
  weight: string;
  purity: string;
  price: string;
  className?: string;
}

const BullionCard: React.FC<BullionCardProps> = ({ 
  type, 
  weight, 
  purity, 
  price, 
  className 
}) => {
  
  // REFINED METAL STYLES USING RADIAL GRADIENT
  const metalStyles = {
    gold: {
      // Custom Modal Gradient
      face: "radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)",
      border: "border-[#b38728]",
      text: "text-[#5e430c]",
      shadow: "shadow-[#5E430C]/50",
      glow: "from-[#FFED8A]/50",
  
      engrave: "1px 1px 0px rgba(255,255,255,0.5), -1px -1px 1px rgba(0,0,0,0.4)"
    },
    silver: {

      face: "radial-gradient(ellipse farthest-corner at right bottom, #FFFFFF 0%, #F0F0F0 8%, #A8A8A8 30%, #808080 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #E6E6E6 8%, #B0B0B0 25%, #666666 62.5%, #444444 100%)",
      border: "border-[#a0a0a0]",
      text: "text-[#333333]",
      shadow: "shadow-[#444444]/50",
      glow: "from-white/50",
      engrave: "1px 1px 0px rgba(255,255,255,0.8), -1px -1px 1px rgba(0,0,0,0.2)"
    },
    platinum: {
    
      face: "radial-gradient(ellipse farthest-corner at right bottom, #EEF2F5 0%, #E6EDF5 8%, #8593A8 30%, #6B7687 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #F0F4F8 8%, #98A6BA 25%, #475569 62.5%, #2D3642 100%)",
      border: "border-[#6b7687]",
      text: "text-[#1a2330]",
      shadow: "shadow-[#2D3642]/50",
      glow: "from-[#CDD9E8]/50",
      engrave: "1px 1px 0px rgba(255,255,255,0.6), -1px -1px 1px rgba(0,0,0,0.3)"
    },
  };

  const theme = metalStyles[type];

  return (
    <>
      {/* Animation Style Block */}
      <style jsx global>{`
       @keyframes pure-shimmer-loop {
          0% { transform: translateX(-150%) skewX(-45deg); }
          100% { transform: translateX(300%) skewX(-45deg); }
        }
        .group:hover .shimmer-effect {
  /* A 1.5s loop where the shimmer takes 0.75s to cross, and waits 0.75s */
  animation: pure-shimmer-loop 1.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
}
      `}</style>

      <div
        className={cn(
          "group relative w-full h-[340px]",
          className
        )}
        style={{ perspective: "1000px" }}
      >
        {/* MAIN CARD SLAB */}
        <div 
          className={cn(
            "relative h-full w-full rounded-xl border transition-all duration-500 ease-out",
            "transform-gpu group-hover:-translate-y-3 shadow-xl group-hover:shadow-2xl overflow-hidden",
            theme.border,
            theme.shadow
          )}
          style={{
            background: theme.face,
            boxShadow: "0px 10px 20px -5px rgba(0,0,0,0.4)"
          }}
        >
          {/* Layer A: Texture (Noise) */}
          <div 
              className="absolute inset-0 opacity-20 pointer-events-none rounded-xl mix-blend-multiply"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }} 
          />

          {/* Layer B: Glass Reflection (Static) */}
          <div className="absolute inset-0 z-20 rounded-xl bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-80 mix-blend-soft-light pointer-events-none" />
          
          {/* Layer C: Moving Sheen (Holographic Loop) */}
          <div 
  className={cn(
    "shimmer-effect absolute inset-0 z-20 -translate-x-[140%] skew-x-[-45deg]",
   
    "bg-gradient-to-r from-transparent via-white/10 via-30% via-white/70 via-50% to-transparent",
    "mix-blend-overlay"
  )}
/>
          {/* Layer D: Sharp Edge Highlights */}
          <div className="absolute inset-0 z-20 border-t border-l border-white/50 rounded-xl mix-blend-overlay pointer-events-none" />

          {/* INNER FACE (Minted Area) */}
          <div className="absolute inset-4 z-10 rounded-lg border border-white/10 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),_inset_-1px_-1px_2px_rgba(255,255,255,0.4)] flex flex-col items-center justify-between p-6">
              
            {/* Purity Mark */}
            <div className={cn("text-xs font-black tracking-[0.2em] uppercase flex flex-col items-center gap-1 opacity-90", theme.text)}>
              <span className="opacity-70 text-[10px]" style={{ textShadow: theme.engrave }}>
                Fine {type}
              </span>
              <span className="text-lg font-bold" style={{ textShadow: theme.engrave }}>
                {purity}
              </span>
            </div>

            {/* Weight (Deep Engraving Effect) */}
            <div className="flex flex-col items-center">
              <div className={cn("w-12 h-12 rounded-full border-2 mb-4 opacity-30 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]", theme.border)} />
              
              <h3 
                className={cn("text-5xl font-serif font-bold italic tracking-tighter", theme.text)}
                style={{
                  textShadow: theme.engrave, // Applies the "pressed in" look
                  opacity: 0.85 
                }}
              >
                {weight}
              </h3>
            </div>

            {/* Price Tag */}
            <div className="w-full pt-4 border-t border-black/10 flex justify-between items-end">
              <div className="flex flex-col">
                <span 
                  className="text-[9px] uppercase font-bold text-black/50 tracking-wider"
                  style={{ textShadow: "0px 1px 0px rgba(255,255,255,0.3)" }}
                >
                  Spot Price
                </span>
                <span 
                  className={cn("text-xl font-mono font-bold", theme.text)}
                  style={{ textShadow: theme.engrave }}
                >
                  {price}
                </span>
              </div>
              <div className={cn("h-6 w-6 rounded-full border flex items-center justify-center opacity-50", theme.border)}>
                <div className="h-1 w-1 bg-current rounded-full" />
              </div>
            </div>

          </div>

          {/* THICKNESS (Side Edge) */}
          <div className="absolute -bottom-1 left-1 right-1 h-2 rounded-b-lg bg-black/30 blur-md transition-all duration-300 group-hover:h-4 group-hover:blur-xl group-hover:opacity-70" />
          
        </div>
      </div>
    </>
  );
};

export default BullionCard;