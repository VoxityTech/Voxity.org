import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Mic, Phone, FileText, Edit, Image, Package } from "lucide-react";

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isVisible } = useScrollAnimation(sectionRef);

  const features = [
    {
      icon: Mic,
      title: "Live Call Captioning",
      description: "See phone conversations in real-time with advanced speech recognition optimized for Indian accents and languages."
    },
    {
      icon: Phone,
      title: "Voice-to-Text Conversations",
      description: "Converts speech into readable text instantly in your local language with your existing phone number."
    },
    {
      icon: FileText,
      title: "Text-to-Speech Replies",
      description: "Type what you want to say, and the app speaks it out loud in natural-sounding voice."
    },
    {
      icon: Edit,
      title: "Personal Dictionary",
      description: "Add custom words, names, and terminology to improve transcription accuracy for your needs."
    },
    {
      icon: Image,
      title: "Visual Alerts",
      description: "Get notified through vibrations, flashing lights, and visual cues for incoming calls and messages."
    },
    {
      icon: Package,
      title: "Offline Mode",
      description: "Essential features work without internet connection for uninterrupted communication anywhere."
    }
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
    hidden: { y: 50, opacity: 0, rotateY: 15 },
    visible: {
      y: 0,
      opacity: 1,
      rotateY: 0,
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
      className="py-20 bg-[hsl(var(--voxity-light))] relative overflow-hidden" 
      id="features"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(var(--voxity-primary))] opacity-5 rounded-full transform translate-x-48 -translate-y-48" />
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--voxity-dark))] mb-4">
            Communication Without <span className="text-[hsl(var(--voxity-secondary))]">Limits</span>
          </h2>
          <p className="text-xl text-[hsl(var(--voxity-gray))] max-w-3xl mx-auto leading-relaxed">
            Our accessibility solution transforms communication for people with hearing impairments across India's diverse linguistic landscape.
          </p>
        </motion.div>
        
        {/* Features Grid with Enhanced Cards */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const gradientClasses = [
              "from-[hsl(var(--voxity-primary))] to-[hsl(var(--voxity-secondary))]",
              "from-[hsl(var(--voxity-secondary))] to-[hsl(var(--voxity-primary))]",
              "from-[hsl(var(--voxity-accent))] to-[hsl(var(--voxity-secondary))]",
              "from-[hsl(var(--voxity-primary))] to-[hsl(var(--voxity-accent))]",
              "from-[hsl(var(--voxity-secondary))] to-[hsl(var(--voxity-accent))]",
              "from-[hsl(var(--voxity-accent))] to-[hsl(var(--voxity-primary))]"
            ];
            
            return (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-br ${gradientClasses[index % gradientClasses.length]} rounded-xl flex items-center justify-center mb-6`}
                  whileHover={{ rotate: 12 }}
                  transition={{ duration: 0.3 }}
                >
                  <IconComponent size={32} className="text-white" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-[hsl(var(--voxity-dark))] mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-[hsl(var(--voxity-gray))] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
