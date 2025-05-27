import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isVisible } = useScrollAnimation(sectionRef);

  const stats = [
    { number: "63M+", label: "Indians with hearing impairment" },
    { number: "4+", label: "Indian languages supported" },
    { number: "90%", label: "Transcription accuracy" },
    { number: "100%", label: "Made in India" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  const animationVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay: 0.3
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-white relative overflow-hidden" 
      id="mission"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-[hsl(var(--voxity-dark))] mb-6"
              variants={itemVariants}
            >
              Every Voice <span className="text-[hsl(var(--voxity-secondary))]">Matters</span>
            </motion.h2>
            
            <motion.div 
              className="w-16 h-1 bg-[hsl(var(--voxity-secondary))] mb-6"
              variants={itemVariants}
            />
            
            <motion.p 
              className="text-lg text-[hsl(var(--voxity-gray))] mb-6 leading-relaxed"
              variants={itemVariants}
            >
              In India, over 63 million people live with significant hearing loss. Yet, few digital tools truly speak their language—literally and emotionally.
            </motion.p>
            
            <motion.p 
              className="text-lg text-[hsl(var(--voxity-gray))] mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Our mission is simple: inclusion without exception. We're building technology that empowers, not just assists.
            </motion.p>
            
            {/* Stats Grid with Staggered Animation */}
            <motion.div 
              className="grid grid-cols-2 gap-6"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-[hsl(var(--voxity-light))] p-6 rounded-xl"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="text-3xl font-bold text-[hsl(var(--voxity-primary))] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-[hsl(var(--voxity-gray))]">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Enhanced Connection Animation */}
          <motion.div
            variants={animationVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <div className="relative w-80 h-80 mx-auto">
              <svg width="320" height="320" viewBox="0 0 320 320" className="absolute inset-0">
                {/* Connection Animation */}
                <motion.circle 
                  cx="100" 
                  cy="160" 
                  r="40" 
                  fill="hsl(var(--voxity-primary))"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle 
                  cx="220" 
                  cy="160" 
                  r="40" 
                  fill="hsl(var(--voxity-secondary))"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                
                {/* Animated Connection Line */}
                <motion.line 
                  x1="140" 
                  y1="160" 
                  x2="180" 
                  y2="160" 
                  stroke="hsl(var(--voxity-accent))" 
                  strokeWidth="4" 
                  strokeDasharray="8 4"
                  animate={{ strokeDashoffset: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Floating Data Points */}
                {[150, 160, 170].map((x, index) => (
                  <motion.circle
                    key={x}
                    cx={x}
                    cy="160"
                    r="3"
                    fill="hsl(var(--voxity-accent))"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      delay: index * 0.2,
                      ease: "easeInOut" 
                    }}
                  />
                ))}
                
                {/* Labels */}
                <text x="100" y="165" textAnchor="middle" fill="white" fontWeight="bold" fontSize="18">A</text>
                <text x="220" y="165" textAnchor="middle" fill="hsl(var(--voxity-accent))" fontWeight="bold" fontSize="18">B</text>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
