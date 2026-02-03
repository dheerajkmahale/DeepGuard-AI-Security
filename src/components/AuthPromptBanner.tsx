import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

const AuthPromptBanner = () => {
  const { isAuthenticated } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the banner before
    const dismissed = localStorage.getItem("authBannerDismissed");
    
    if (!isAuthenticated && !dismissed) {
      // Show banner after 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("authBannerDismissed", "true");
  };

  // Don't show if authenticated or dismissed
  if (isAuthenticated || isDismissed || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-primary/95 to-purple-600/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 max-w-md relative overflow-hidden group">
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            <h3 className="text-white font-semibold text-lg">
              Ready to Get Started?
            </h3>
          </div>
          
          <p className="text-white/90 text-sm">
            Create a free account to unlock advanced deepfake detection, batch analysis, and detailed analytics.
          </p>

          <div className="flex gap-3">
            <Link to="/signup" className="flex-1">
              <Button 
                className="w-full bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 gap-2 group/btn shadow-lg"
              >
                Sign Up Free
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute -top-2 -left-2 w-20 h-20 bg-purple-300/10 rounded-full blur-xl"></div>
      </div>
    </div>
  );
};

export default AuthPromptBanner;
