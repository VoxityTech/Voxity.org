import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import PhoneCallAnimation from "./PhoneCallAnimation";

export default function LanguagesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isVisible } = useScrollAnimation(sectionRef);

  const languages = [
    { name: "Hindi - हिंदी", description: "Advanced support for Devanagari script", char: "अ" },
    { name: "English", description: "Indian English accent optimization", char: "A" },
    { name: "Tamil - தமிழ்", description: "Regional dialect recognition", char: "த" },
    { name: "Telugu - తెలుగు", description: "Cultural context understanding", char: "త" }
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
      id="languages"
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
              Speak in Your <span className="text-[hsl(var(--voxity-secondary))]">Native Tongue</span>
            </motion.h2>
            
            <motion.div 
              className="w-16 h-1 bg-[hsl(var(--voxity-secondary))] mb-6"
              variants={itemVariants}
            />
            
            <motion.p 
              className="text-lg text-[hsl(var(--voxity-gray))] mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Experience seamless communication in the languages you're most comfortable with. Our AI understands regional accents and cultural nuances.
            </motion.p>
            
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
            >
              {languages.map((language, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-[hsl(var(--voxity-light))] rounded-xl"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div 
                    className="w-3 h-3 rounded-full"
                    style={{ 
                      backgroundColor: `hsl(var(--voxity-${index % 2 === 0 ? 'primary' : index % 3 === 0 ? 'secondary' : 'accent'}))` 
                    }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: index * 0.5,
                      ease: "easeInOut" 
                    }}
                  />
                  <span className="font-semibold text-[hsl(var(--voxity-dark))]">
                    {language.name}
                  </span>
                  <span className="text-sm text-[hsl(var(--voxity-gray))]">
                    {language.description}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Phone Call Animation */}
          <motion.div
            variants={animationVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="flex justify-center"
          >
            <PhoneCallAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
