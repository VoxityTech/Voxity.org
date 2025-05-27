import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isStationary, setIsStationary] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // Check if at top or bottom
      const atTop = scrollY <= 100;
      const atBottom = scrollY >= maxScroll - 100;
      
      // Clear previous timeout
      if (timeout) {
        clearTimeout(timeout);
      }
      
      // Show navbar if at top, bottom, or if stationary for 5 seconds
      if (atTop || atBottom) {
        setIsVisible(true);
        setIsStationary(false);
      } else {
        setIsVisible(false);
        setIsStationary(false);
        
        // Set timeout for stationary detection
        timeout = setTimeout(() => {
          setIsStationary(true);
          setIsVisible(true);
        }, 5000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  const handleSmoothScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  const menuItems = [
    { href: "#mission", label: "Mission" },
    { href: "#features", label: "Features" },
    { href: "#languages", label: "Languages" },
    { href: "#download", label: "Download" }
  ];

  return (
    <motion.nav 
      className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50"
      initial={{ y: 0, opacity: 1 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 40 40" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="8" fill="hsl(var(--voxity-primary))"/>
              <path d="M12 20C12 16.13 15.13 13 19 13V27C15.13 27 12 23.87 12 20Z" fill="hsl(var(--voxity-secondary))"/>
              <path d="M19 13C22.87 13 26 16.13 26 20C26 23.87 22.87 27 19 27V13Z" fill="white"/>
            </svg>
            <span className="text-xl font-bold text-[hsl(var(--voxity-primary))]">
              Vox<span className="text-[hsl(var(--voxity-secondary))]">ity</span>
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <motion.button
                key={item.href}
                onClick={() => handleSmoothScroll(item.href)}
                className="text-[hsl(var(--voxity-dark))] hover:text-[hsl(var(--voxity-primary))] font-medium transition-colors duration-300 relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {item.label}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-[hsl(var(--voxity-secondary))]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
            
            <motion.button
              onClick={() => handleSmoothScroll("#download")}
              className="btn-voxity btn-voxity-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              Download Now
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[hsl(var(--voxity-dark))] hover:text-[hsl(var(--voxity-primary))] transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-4 border-t border-gray-200">
            {menuItems.map((item) => (
              <motion.button
                key={item.href}
                onClick={() => handleSmoothScroll(item.href)}
                className="block w-full text-left py-2 text-[hsl(var(--voxity-dark))] hover:text-[hsl(var(--voxity-primary))] font-medium transition-colors duration-300"
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
              </motion.button>
            ))}
            
            <motion.button
              onClick={() => handleSmoothScroll("#download")}
              className="btn-voxity btn-voxity-primary w-full justify-center mt-4"
              whileTap={{ scale: 0.98 }}
            >
              Download Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}