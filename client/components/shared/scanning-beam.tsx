"use client";

import React from "react";
import { motion } from "framer-motion";

interface ScanningBeamProps {
  duration?: number;
  className?: string;
}

export function ScanningBeam({
  duration = 1.2,
  className = "",
}: ScanningBeamProps) {
  return (
    <motion.div
      animate={{ top: ["-100%", "100%"] }}
      transition={{
        repeat: Infinity,
        duration: duration,
        ease: "linear",
      }}
      className={`absolute inset-x-0 h-full z-30 pointer-events-none ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="w-full h-full relative">
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-linear-to-t from-[#D4AF37]/20 via-[#D4AF37]/5 to-transparent" />

        <div className="absolute bottom-0 w-full h-0.5 bg-[#D4AF37] shadow-[0_0_20px_2px_#D4AF37]">
          <div className="absolute inset-0 bg-white/40 blur-[0.5px]" />
          <div className="absolute left-1/2 -translate-x-1/2 w-[120%] h-px bg-[#D4AF37] opacity-20 blur-[3px]" />
        </div>

        <div className="absolute top-full inset-x-0 h-10 bg-linear-to-b from-[#D4AF37]/15 to-transparent blur-md" />
      </div>
    </motion.div>
  );
}
