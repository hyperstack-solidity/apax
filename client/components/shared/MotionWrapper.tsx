'use client';

import React from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';

interface MotionWrapperProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  stagger?: boolean; // prop for orchestration
}

const variants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
      // if this is a container, stagger the children
      staggerChildren: 0.05, 
      delayChildren: delay,
    }
  }),
  exit: { 
    opacity: 0, 
    y: -20, 
    transition: { duration: 0.2 } 
  }
};

// item variant for children so they can inherit the stagger
export const childVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
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
      {...props}
    >
      {stagger 
        ? React.Children.map(children, (child) => (
            <motion.div variants={childVariants}>{child}</motion.div>
          ))
        : children}
    </motion.div>
  );
};