import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <HeroSection />
      
      <div className="relative bg-sky-100">
        {/* Seamless Fade Top from Background */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent pointer-events-none z-10"></div>
        
        {/* Seamless Fade Bottom to Background */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-10"></div>
        
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <ContactSection />
      </div>

      <Footer />
      <Chatbot />
    </main>
  );
}
