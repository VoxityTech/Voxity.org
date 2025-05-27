import { useEffect, useState, RefObject } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useScrollAnimation(
  elementRef: RefObject<HTMLElement>,
  options: UseScrollAnimationOptions = {}
) {
  const [isVisible, setIsVisible] = useState(false);
  const { threshold = 0.1, rootMargin = "0px 0px -100px 0px" } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, threshold, rootMargin]);

  return { isVisible };
}
