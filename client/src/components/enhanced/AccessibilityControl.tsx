import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Type, Plus, Minus, RotateCcw } from "lucide-react";

export default function AccessibilityControl() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get saved font size from localStorage or use default
    const savedFontSize = localStorage.getItem('voxity-font-size');
    if (savedFontSize) {
      const size = parseInt(savedFontSize);
      setFontSize(size);
      applyFontSize(size);
    }
  }, []);

  useEffect(() => {
    // Close options when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const applyFontSize = (size: number) => {
    document.documentElement.style.fontSize = `${size}px`;
    localStorage.setItem('voxity-font-size', size.toString());
  };

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 2, 24); // Max 24px
    setFontSize(newSize);
    applyFontSize(newSize);
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 2, 12); // Min 12px
    setFontSize(newSize);
    applyFontSize(newSize);
  };

  const resetFontSize = () => {
    const defaultSize = 16;
    setFontSize(defaultSize);
    applyFontSize(defaultSize);
  };

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ duration: 0.2 }}
            className="mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2"
          >
            <div className="flex space-x-2">
              <motion.button
                onClick={decreaseFontSize}
                className="flex items-center justify-center w-12 h-12 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={fontSize <= 12}
                title="Decrease font size"
              >
                <Minus size={20} />
              </motion.button>
              
              <motion.button
                onClick={resetFontSize}
                className="flex items-center justify-center w-12 h-12 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Reset font size"
              >
                <RotateCcw size={20} />
              </motion.button>
              
              <motion.button
                onClick={increaseFontSize}
                className="flex items-center justify-center w-12 h-12 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={fontSize >= 24}
                title="Increase font size"
              >
                <Plus size={20} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[hsl(var(--voxity-primary))] hover:bg-[hsl(var(--voxity-secondary))] text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Font size accessibility controls"
        title="Adjust font size"
      >
        <Type size={24} />
      </motion.button>
    </div>
  );
}