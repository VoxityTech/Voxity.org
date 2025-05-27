import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [showReopenButton, setShowReopenButton] = useState(false);

  useEffect(() => {
    let stationaryTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // Check if at top or bottom
      const atTop = scrollY <= 100;
      const atBottom = scrollY >= maxScroll - 100;
      
      // Clear previous timeout
      if (stationaryTimeout) {
        clearTimeout(stationaryTimeout);
      }

      // Show floating nav when scrolling and not at top/bottom
      if (!atTop && !atBottom && scrollY > 80) {
        if (!isClosed) {
          setIsVisible(true);
        }
        
        // Show reopen button if nav was closed
        if (isClosed) {
          setShowReopenButton(true);
        }

        // Hide floating nav after being stationary for 5 seconds
        stationaryTimeout = setTimeout(() => {
          setIsVisible(false);
          setShowReopenButton(false);
        }, 5000);
      } else {
        setIsVisible(false);
        setShowReopenButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (stationaryTimeout) {
        clearTimeout(stationaryTimeout);
      }
    };
  }, [isClosed]);

  const handleSmoothScroll = (href: string) => {
    if (href && href !== '#') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleClose = () => {
    setIsClosed(true);
    setIsVisible(false);
  };

  const handleReopen = () => {
    setIsClosed(false);
    setShowReopenButton(false);
  };

  return (
    <>
      {/* Main Floating Navigation */}
      <AnimatePresence>
        {isVisible && !isClosed && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 floating-menu px-4 sm:px-6 py-3 rounded-full shadow-xl w-auto max-w-[95vw]"
          >
            <div className="flex items-center justify-center space-x-3 sm:space-x-4">
              {/* Logo */}
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.1 }}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 40 40" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="sm:w-7 sm:h-7"
                >
                  <rect width="40" height="40" rx="8" fill="hsl(var(--voxity-primary))"/>
                  <path d="M12 20C12 16.13 15.13 13 19 13V27C15.13 27 12 23.87 12 20Z" fill="hsl(var(--voxity-secondary))"/>
                  <path d="M19 13C22.87 13 26 16.13 26 20C26 23.87 22.87 27 19 27V13Z" fill="white"/>
                </svg>
                <span className="text-sm sm:text-base font-bold text-[hsl(var(--voxity-primary))]">
                  Vox<span className="text-[hsl(var(--voxity-secondary))]">ity</span>
                </span>
              </motion.div>
              
              {/* Navigation Links - Hidden on mobile */}
              <div className="hidden md:flex space-x-3">
                {[
                  { href: "#mission", label: "Mission" },
                  { href: "#features", label: "Features" },
                  { href: "#languages", label: "Languages" }
                ].map((item) => (
                  <motion.button
                    key={item.href}
                    onClick={() => handleSmoothScroll(item.href)}
                    className="text-sm font-medium text-[hsl(var(--voxity-dark))] hover:text-[hsl(var(--voxity-primary))] transition-colors duration-150"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.1 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
              
              {/* Download Button */}
              <motion.button
                onClick={() => handleSmoothScroll("#download")}
                className="btn-voxity btn-voxity-primary text-xs sm:text-sm px-3 sm:px-4 py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
              >
                Download
              </motion.button>
              
              {/* Close Button */}
              <motion.button
                onClick={handleClose}
                className="text-[hsl(var(--voxity-dark))] hover:text-[hsl(var(--voxity-primary))] transition-colors duration-150 p-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.1 }}
              >
                <X size={16} />
              </motion.button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Reopen Button - Shows when nav is closed and user is scrolling */}
      <AnimatePresence>
        {showReopenButton && (
          <motion.button
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={handleReopen}
            className="fixed top-6 right-6 z-50 bg-[hsl(var(--voxity-primary))] text-white p-3 rounded-full shadow-lg hover:bg-[hsl(var(--voxity-primary-light))] transition-colors duration-150"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}