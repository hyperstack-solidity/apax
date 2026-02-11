"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Scan,
  UserCheck,
  Activity,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ScanningBeam } from "@/components/shared/scanning-beam";

// type definitions so that ui can't enter an undefined state
export type VerificationStatus =
  | "idle"
  | "scanning"
  | "liveness"
  | "analyzing"
  | "completed"
  | "failed";

interface VerificationProgressProps {
  status?: VerificationStatus;
  onComplete?: () => void;
  isSimulated?: boolean;
}

// stages 
const STAGES = [
  { id: "scanning", label: "ID Scan", icon: Scan },
  { id: "liveness", label: "Liveness", icon: UserCheck },
  { id: "analyzing", label: "Analysis", icon: Activity },
] as const;

export function VerificationProgress({
  status: externalStatus = "idle", //the control
  onComplete,
  isSimulated = true, //set to false for control otherwise true if automated rendering
}: VerificationProgressProps) {
    
  const [mounted, setMounted] = useState(false);
  const [internalStatus, setInternalStatus] =
    useState<VerificationStatus>("idle");
  const [resetKey, setResetKey] = useState(0);

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Determine if we listen to the simulation or an external API prop
  const currentStatus = isSimulated ? internalStatus : externalStatus;

  useEffect(() => {
    setMounted(true);
  }, []);

  // engine flow of simulation logic, this handles the automated transition of 3 stages
  useEffect(() => {
    // stop if not simulated, not mounted, or if already in completed state
    if (!isSimulated || !mounted || internalStatus === "failed" || internalStatus === "completed") return;

    const sequence: VerificationStatus[] = [
      "scanning",
      "liveness",
      "analyzing",
      "completed",
    ];

    // find current position in the sequence
    let currentIdx = sequence.indexOf(internalStatus);
    if (currentIdx === -1) currentIdx = 0;

    // instant feel
    const timer = setInterval(() => {
      const nextIdx = currentIdx + 1;
      if (nextIdx < sequence.length) {
        setInternalStatus(sequence[nextIdx]);
      } else {
        setInternalStatus("completed");
        // Accessing the stable ref ensures we don't trigger infinite loops in Next.js 16
        onCompleteRef.current?.(); 
        clearInterval(timer);
      }
    }, 800); 

    return () => clearInterval(timer);
    
    // logic simulation integrity trigger
  }, [isSimulated, mounted, resetKey, internalStatus]);

  const currentStepIndex = useMemo(() => {
    // calculates the progress bar without rerunning on every render
    const statusMap: Record<VerificationStatus, number> = {
      idle: 0,
      scanning: 0,
      liveness: 1,
      analyzing: 2,
      completed: 3,
      failed: 1, // failure visually resets the progress to the liveness step
    };
    return statusMap[currentStatus];
  }, [currentStatus]);

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-md mx-auto bg-background border-border institutional-shadow overflow-hidden shadow-none">
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            {/* Active processing state - shown during scanning, liveness, and analysis stages */}
            {currentStatus !== "completed" && currentStatus !== "failed" ? (
              <motion.div
                key="verifying"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-[10px] font-vault font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">
                      Security Protocol
                    </h3>
                    <p className="text-sm font-bold text-foreground tracking-tight">
                      Identity Verification
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-primary/30 text-primary bg-primary/5 font-mono text-[9px] px-2 py-0"
                  >
                    {currentStatus.toUpperCase()}
                  </Badge>
                </div>

                {/* Stages and progress bar */}
                <div className="space-y-4">
                  <Progress
                    value={
                      ((currentStepIndex + (currentStatus === "idle" ? 0 : 1)) /
                        (STAGES.length + 1)) *
                      100
                    }
                    className="h-1 bg-muted"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    {STAGES.map((stage, idx) => {
                      const Icon = stage.icon;
                      const isActive = idx === currentStepIndex;
                      const isPassed = idx < currentStepIndex;

                      return (
                        <div
                          key={stage.id}
                          className="flex flex-col items-center gap-2 pointer-events-none"
                        >
                          <div
                            className={`
                            relative w-12 h-12 rounded-lg border flex items-center justify-center
                            ${
                              isActive
                                ? "border-primary bg-primary/10"
                                : isPassed
                                ? "border-[#22C55E]/40 bg-[#22C55E]/5"
                                : "border-border bg-transparent"
                            }
                          `}
                          >
                            <Icon
                              className={`w-5 h-5 transition-colors duration-300 ${
                                isActive
                                  ? "text-primary"
                                  : isPassed
                                  ? "text-[#22C55E]"
                                  : "text-muted-foreground/40"
                              }`}
                            />
                          </div>
                          <span
                            className={`text-[9px] font-bold uppercase tracking-tighter transition-colors duration-300 ${
                              isActive ? "text-primary" : "text-muted-foreground/40"
                            }`}
                          >
                            {stage.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* scanner animation container */}
                <div className="relative h-16 bg-[#0A0A0A] rounded-lg border border-border overflow-hidden">
                  <ScanningBeam duration={1.2} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center font-mono text-[9px] text-muted-foreground space-y-1.5 text-center z-40 bg-background/5 backdrop-blur-[0.5px]">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin text-primary" />
                      <span className="tracking-widest">
                        {currentStatus === "scanning" && "SCANNING_DOCUMENT..."}
                        {currentStatus === "liveness" &&
                          "MATCHING_BIOMETRICS..."}
                        {currentStatus === "analyzing" &&
                          "COMPUTING_HASH_VERIFICATION..."}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : currentStatus === "completed" ? (
              /* Success state - Displays the pulsating green shield and verified status */
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.16, 1, 0.3, 1],
                  scale: { type: "spring", damping: 15, stiffness: 100 } 
                }}
                className="py-10 flex flex-col items-center text-center space-y-6 pointer-events-none"
              >
                <div className="relative">
                  {/* Removed all motion wrappers and drop-shadows that cause glowing on hover */}
                  <div 
                    className="relative w-24 h-24 rounded-full border border-[#22C55E]/30 flex items-center justify-center bg-[#22C55E]/5"
                  >
                    <ShieldCheck className="w-12 h-12 text-[#22C55E]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <motion.h2 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl font-vault font-bold text-foreground uppercase tracking-tight"
                  >
                    Verified
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xs text-muted-foreground max-w-50 mx-auto leading-relaxed"
                  >
                    Identity successfully verified.
                  </motion.p>
                </div>

                {/* Final state status badge with pulse verification */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Badge className="bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30 px-6 py-1 font-mono tracking-widest text-[10px]">
                    KYC_VERIFIED
                  </Badge>
                </motion.div>
              </motion.div>
            ) : (
              /* Failure state */
              <motion.div
                key="failed"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", damping: 10, stiffness: 200 }}
                className="py-10 flex flex-col items-center text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-destructive/5 border border-destructive/20 flex items-center justify-center pointer-events-none">
                  <AlertCircle className="w-10 h-10 text-destructive" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-foreground uppercase tracking-tight">
                    Verification Failed
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Security mismatch detected during biometrics.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer border-border hover:bg-transparent text-xs h-8 px-8"
                  onClick={() => {
                    setInternalStatus("idle");
                    setResetKey((k) => k + 1);
                  }}
                >
                  <RefreshCw className="w-3 h-3 mr-2" />
                  Retry Process
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Temporary manual testing for debugging controls */}
      <div className="flex justify-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="cursor-pointer text-[10px] text-muted-foreground/50 uppercase tracking-widest hover:bg-transparent hover:text-foreground transition-colors"
          onClick={() => {
            setInternalStatus("idle");
            setResetKey((k) => k + 1);
          }}
        >
          Force Restart
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="cursor-pointer text-[10px] text-muted-foreground/50 uppercase tracking-widest hover:bg-transparent hover:text-foreground transition-colors"
          onClick={() => setInternalStatus("failed")}
        >
          Force Error
        </Button>
      </div>
    </div>
  );
}