import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AnalysisUpload from "@/components/AnalysisUpload";
import HowItWorks from "@/components/HowItWorks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AuthPromptBanner from "@/components/AuthPromptBanner";

import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    if (window.location.hash === "#contact") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        setTimeout(() => {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }, 100); // Wait for DOM to render
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <AnalysisUpload />
      <HowItWorks />
      <Contact />
      <Footer />
      <AuthPromptBanner />
    </div>
  );
};

export default Index;
