'use client';

import React from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';

interface MotionWrapperProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  stagger?: boolean;
}

const variants: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.05, 
      delayChildren: delay,
    }
  }),
  exit: { 
    opacity: 0, 
    y: -20, 
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const childVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

export const MotionWrapper = ({ 
  children, 
  delay = 0, 
  stagger = false,
  className, 
  ...props 
}: MotionWrapperProps) => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={delay}
      className={className}
      style={{ 
        contain: 'paint', 
        willChange: 'transform, opacity' 
      }}
      {...props}
    >
      {stagger 
        ? React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child;
            return (
              <motion.div 
                variants={childVariants}
                style={{ willChange: 'transform, opacity' }}
              >
                {child}
              </motion.div>
            );
          })
        : children}
    </motion.div>
  );
};