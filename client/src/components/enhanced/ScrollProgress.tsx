import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrolled = window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50 pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-[hsl(var(--voxity-primary))] to-[hsl(var(--voxity-secondary))] transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
