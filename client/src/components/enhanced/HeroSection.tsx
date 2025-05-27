import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isVisible } = useScrollAnimation(sectionRef);

  const handleSmoothScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(var(--voxity-primary))] via-[hsl(var(--voxity-primary-light))] to-[hsl(var(--voxity-accent))] overflow-hidden" 
      id="hero"
    >
      {/* Morphing Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-[hsl(var(--voxity-primary))] to-[hsl(var(--voxity-secondary))] opacity-20 rounded-full morphing-bg" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-[hsl(var(--voxity-secondary))] to-[hsl(var(--voxity-primary))] opacity-15 rounded-full morphing-bg delay-2000" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="text-white space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold leading-tight"
              variants={itemVariants}
            >
              Bridge the <span className="text-[hsl(var(--voxity-secondary))]">Silence.</span><br />
              Embrace Every <span className="text-[hsl(var(--voxity-secondary))]">Word.</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl opacity-90 leading-relaxed"
              variants={itemVariants}
            >
              Our Indian-made assistive app empowers the Deaf, Hard of Hearing, and Speech-Impaired community to communicate effortlessly in real-time.
            </motion.p>
            
            {/* Language Badges with Floating Animation */}
            <motion.div 
              className="flex flex-wrap gap-3"
              variants={itemVariants}
            >
              {["Hindi", "English", "Tamil", "Telugu"].map((language, index) => (
                <motion.button
                  key={language}
                  className="px-4 py-2 glass-effect rounded-full text-sm font-medium hover:bg-white/20 transition-colors duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {language}
                </motion.button>
              ))}
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => handleSmoothScroll("#download")}
                className="btn-voxity btn-voxity-secondary px-8 py-4 text-lg"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                Experience the Change
              </motion.button>
              
              <motion.button
                onClick={() => handleSmoothScroll("#features")}
                className="btn-voxity btn-voxity-outline px-8 py-4 text-lg"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                Explore Features
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Enhanced Hero Animation */}
          <motion.div 
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring", 
              damping: 15, 
              stiffness: 100, 
              delay: 0.5 
            }}
          >
            <div className="w-80 h-80 mx-auto relative">
              {/* Main Circle with Morphing Effect */}
              <motion.div 
                className="absolute inset-0 bg-[hsl(var(--voxity-light))] rounded-full opacity-90"
                animate={{ 
                  borderRadius: ["30% 70% 50% 50%", "50% 50% 70% 30%", "70% 30% 50% 50%", "50% 50% 30% 70%", "30% 70% 50% 50%"] 
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Floating Speech Waves */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.svg 
                  width="300" 
                  height="300" 
                  viewBox="0 0 300 300" 
                  className="animate-rotate-slow"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <defs>
                    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--voxity-primary))" />
                      <stop offset="100%" stopColor="hsl(var(--voxity-secondary))" />
                    </linearGradient>
                  </defs>
                  
                  {[
                    { d: "M90 150 C 90 130, 170 130, 170 150", delay: 0 },
                    { d: "M80 130 C 80 110, 180 110, 180 130", delay: 0.5 },
                    { d: "M70 110 C 70 90, 190 90, 190 110", delay: 1 },
                    { d: "M60 90 C 60 70, 200 70, 200 90", delay: 1.5 }
                  ].map((wave, index) => (
                    <motion.path
                      key={index}
                      d={wave.d}
                      stroke="url(#waveGradient)"
                      strokeWidth="4"
                      fill="none"
                      animate={{ scaleY: [1, 1.5, 1] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: wave.delay,
                        ease: "easeInOut" 
                      }}
                    />
                  ))}
                </motion.svg>
              </div>
              
              {/* Floating Text Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="text-center space-y-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="text-2xl font-bold text-[hsl(var(--voxity-accent))]">अ आ</div>
                  <div className="text-2xl font-bold text-[hsl(var(--voxity-accent))]">A B</div>
                </motion.div>
              </div>
              
              {/* Orbiting Elements */}
              <motion.div 
                className="absolute top-8 right-8 w-6 h-6 bg-[hsl(var(--voxity-secondary))] rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute bottom-8 left-8 w-4 h-4 bg-[hsl(var(--voxity-primary))] rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
