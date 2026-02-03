import { Shield, Scan, AlertTriangle, Sparkles, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToAnalysis = () => {
    const element = document.getElementById("analysis");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="AI Neural Network Background"
          className="w-full h-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/98 to-primary/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Animated Grid Pattern with Glow */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.15) 2px, transparent 2px),
            linear-gradient(90deg, hsl(var(--primary) / 0.15) 2px, transparent 2px),
            linear-gradient(hsl(var(--secondary) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--secondary) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          backgroundPosition: '0 0, 0 0, 0 0, 0 0'
        }} />
      </div>

      {/* Floating Orbs with Enhanced Effects */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute top-40 right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-32 left-1/4 w-36 h-36 bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-primary/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }} />

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          {/* Enhanced Badge with Animation */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card animate-pulse-glow animate-slide-up border border-primary/30">
            <Shield className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-foreground">
              AI-Powered Verification System
            </span>
            <Sparkles className="w-4 h-4 text-secondary" />
          </div>

          {/* Main Heading with Enhanced Gradient */}
          <h1 className="text-6xl md:text-8xl font-black tracking-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-gradient-primary block mb-4">
              Deepfake Detection
            </span>
            <span className="text-foreground block text-5xl md:text-7xl">
              & Mitigation Platform
            </span>
          </h1>

          {/* Enhanced Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Real-time AI analysis to detect and verify deepfake content with 
            <span className="text-primary font-semibold"> 99.4% accuracy</span>. 
            Protect against misinformation with explainable, scalable alerts.
          </p>

          {/* Enhanced Stats Grid */}
                    {/* Stats Grid with enhanced animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            {[
              { icon: Shield, label: "99.4% Accuracy", value: "Industry Leading", color: "text-primary", delay: "0s" },
              { icon: Zap, label: "Real-time Detection", value: "< 2 seconds", color: "text-secondary", delay: "0.1s" },
              { icon: Lock, label: "Secure & Private", value: "End-to-End", color: "text-accent", delay: "0.2s" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="glass-card p-8 rounded-3xl hover-lift hover-glow group cursor-pointer animate-fade-in-left"
                style={{ animationDelay: stat.delay }}
              >
                <stat.icon className={`w-12 h-12 ${stat.color} mb-4 mx-auto group-hover:scale-125 transition-transform duration-300 group-hover:rotate-12`} />
                <h3 className="text-2xl font-bold mb-2 group-hover:text-gradient-primary transition-all duration-300">{stat.label}</h3>
                <p className="text-muted-foreground text-lg">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Buttons */}
                    {/* CTA Buttons with enhanced hover effects */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <Button 
              onClick={scrollToAnalysis}
              variant="hero" 
              size="lg" 
              className="w-full sm:w-auto px-10 py-7 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-[0_0_60px_rgba(147,51,234,0.6)] transform hover:scale-110 transition-all duration-300 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Scan className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                Start Analysis
                <span className="group-hover-slide-right">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Button>
            
            <Button 
              onClick={scrollToHowItWorks}
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto px-10 py-7 text-lg font-semibold rounded-2xl glass-strong border-2 hover:border-primary/50 hover:bg-primary/10 transform hover:scale-105 transition-all duration-300 group"
            >
              <Shield className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              How It Works
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 opacity-60 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Enterprise Grade Security</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium">GDPR Compliant</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Lightning Fast</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
