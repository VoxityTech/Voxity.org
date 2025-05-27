import { useEffect, RefObject } from "react";

interface Particle {
  element: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export function useParticles(
  containerRef: RefObject<HTMLDivElement>,
  particleCount: number = 20
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const particles: Particle[] = [];
    let animationId: number;

    function createParticle(): Particle {
      const element = document.createElement('div');
      element.className = 'particle';
      
      const size = Math.random() * 4 + 2;
      const x = Math.random() * window.innerWidth;
      const y = window.innerHeight + 10;
      const vx = (Math.random() - 0.5) * 2;
      const vy = -(Math.random() * 3 + 1);
      const maxLife = Math.random() * 300 + 200;
      
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.opacity = '0';
      
      container.appendChild(element);
      
      return {
        element,
        x,
        y,
        vx,
        vy,
        size,
        opacity: 0,
        life: 0,
        maxLife
      };
    }

    function updateParticle(particle: Particle) {
      particle.life++;
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Fade in, then out
      if (particle.life < particle.maxLife * 0.1) {
        particle.opacity = particle.life / (particle.maxLife * 0.1);
      } else if (particle.life > particle.maxLife * 0.9) {
        particle.opacity = 1 - (particle.life - particle.maxLife * 0.9) / (particle.maxLife * 0.1);
      } else {
        particle.opacity = 1;
      }
      
      particle.element.style.left = `${particle.x}px`;
      particle.element.style.top = `${particle.y}px`;
      particle.element.style.opacity = particle.opacity.toString();
      
      // Remove particle if it's dead or off screen
      if (particle.life >= particle.maxLife || particle.y < -10) {
        particle.element.remove();
        return false;
      }
      
      return true;
    }

    function animate() {
      // Add new particles
      while (particles.length < particleCount) {
        particles.push(createParticle());
      }
      
      // Update existing particles
      for (let i = particles.length - 1; i >= 0; i--) {
        if (!updateParticle(particles[i])) {
          particles.splice(i, 1);
        }
      }
      
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      particles.forEach(particle => particle.element.remove());
    };
  }, [containerRef, particleCount]);
}
