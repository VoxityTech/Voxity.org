import { useEffect, useRef } from "react";
import { useParticles } from "@/hooks/useParticles";

export default function ParticleSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  useParticles(containerRef, 20);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
