import { useEffect } from "react";
import ParticleSystem from "@/components/enhanced/ParticleSystem";
import Navbar from "@/components/enhanced/Navbar";
import FloatingNav from "@/components/enhanced/FloatingNav";
import HeroSection from "@/components/enhanced/HeroSection";
import MissionSection from "@/components/enhanced/MissionSection";
import FeaturesSection from "@/components/enhanced/FeaturesSection";
import LanguagesSection from "@/components/enhanced/LanguagesSection";
import DownloadSection from "@/components/enhanced/DownloadSection";
import Footer from "@/components/enhanced/Footer";
import ScrollProgress from "@/components/enhanced/ScrollProgress";
import AccessibilityControl from "@/components/enhanced/AccessibilityControl";

export default function Home() {
  useEffect(() => {
    // Set page title and meta description
    document.title = "Voxity Hearable - Enhanced Accessible Communication App";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        "Voxity Hearable - India's first complete accessibility solution for deaf and hard of hearing. Real-time transcription in Hindi, English, Tamil, and Telugu with advanced animations and user experience."
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-[hsl(var(--voxity-dark))] overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <FloatingNav />
      <ParticleSystem />
      
      <main className="pt-16">
        <HeroSection />
        <MissionSection />
        <FeaturesSection />
        <LanguagesSection />
        <DownloadSection />
      </main>
      
      <Footer />
      <AccessibilityControl />
    </div>
  );
}
