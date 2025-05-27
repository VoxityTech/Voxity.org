// Animation utility functions and configurations

export const easeInOutCubic = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
export const easeOutBack = "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
export const easeInOutQuart = "cubic-bezier(0.77, 0, 0.175, 1)";

export const springConfig = {
  type: "spring" as const,
  damping: 15,
  stiffness: 100
};

export const buttonSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 10
};

export const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: springConfig
  }
};

export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: springConfig
  }
};

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: springConfig
  }
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: springConfig
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
};

// Utility function to check if animations should be reduced
export const shouldReduceMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Conditional animation helper
export const conditionalAnimation = (animation: any) => {
  return shouldReduceMotion() ? {} : animation;
};
