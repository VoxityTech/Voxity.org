import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";

export default function DownloadSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isVisible } = useScrollAnimation(sectionRef);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate newsletter subscription
    setTimeout(() => {
      toast({
        title: "Subscribed!",
        description: "You'll be the first to know about new features and updates.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

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
      className="py-20 bg-gradient-to-br from-[hsl(var(--voxity-primary))] via-[hsl(var(--voxity-primary-light))] to-[hsl(var(--voxity-accent))] text-white relative overflow-hidden" 
      id="download"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full transform translate-x-48 -translate-y-48" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[hsl(var(--voxity-secondary))] opacity-10 rounded-full transform -translate-x-32 translate-y-32" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            variants={itemVariants}
          >
            Ready to <span className="text-[hsl(var(--voxity-secondary))]">Break Barriers?</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed"
            variants={itemVariants}
          >
            Join thousands of users already experiencing seamless communication. Download Voxity Hearable and step into a world where every voice is heard.
          </motion.p>
          
          {/* Download Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            variants={itemVariants}
          >
            <motion.button 
              onClick={() => window.open('https://play.google.com/store', '_blank')}
              className="bg-white text-[hsl(var(--voxity-primary))] px-8 py-4 rounded-2xl font-bold text-lg flex items-center space-x-3"
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)" 
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              {/* Google Play Store Icon */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-70">Get it on</div>
                <div className="text-sm font-bold">Google Play</div>
              </div>
            </motion.button>
            
            <motion.button 
              onClick={() => window.open('https://apps.apple.com', '_blank')}
              className="bg-white text-[hsl(var(--voxity-primary))] px-8 py-4 rounded-2xl font-bold text-lg flex items-center space-x-3"
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)" 
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              {/* App Store Icon */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-70">Download on the</div>
                <div className="text-sm font-bold">App Store</div>
              </div>
            </motion.button>
          </motion.div>
          
          {/* Newsletter Signup */}
          <motion.div 
            className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="mb-6 opacity-90">Be the first to know about new features and updates.</p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-3 rounded-xl text-[hsl(var(--voxity-dark))] bg-white focus:outline-none focus:ring-4 focus:ring-[hsl(var(--voxity-secondary))] transition-all duration-300"
                required 
              />
              <motion.button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-voxity btn-voxity-secondary px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
