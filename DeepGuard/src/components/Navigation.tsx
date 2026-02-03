import { useState } from "react";
import { Menu, X, Home, LayoutDashboard, Mail, Shield, LogIn, UserPlus, LogOut, User as UserIcon, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const scrollToContact = () => {
    window.location.href = "/#contact";
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center hover-lift">
                <Shield className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-gradient-primary">
                DeepGuard
              </span>
              <span className="text-xs text-muted-foreground font-medium -mt-1">
                AI Security
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-medium ${
                    isActive
                      ? "bg-gradient-primary text-white shadow-lg hover-lift"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
            <button
              onClick={scrollToContact}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-card/50 transition-all font-medium"
            >
              <Mail className="w-5 h-5" />
              Contact
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Auth Buttons/User Menu */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 rounded-xl hover-lift">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary text-white text-xs">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-semibold">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <UserIcon className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3 animate-fade-in">
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    className="gap-2 rounded-xl hover:bg-primary/10 hover:scale-105 transition-all duration-300 border border-transparent hover:border-primary/20"
                  >
                    <LogIn className="w-5 h-5" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    variant="hero" 
                    className="gap-2 rounded-xl relative overflow-hidden group animate-pulse-slow shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                    <UserPlus className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Sign Up</span>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-xl hover-lift"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 animate-slide-up">
            <div className="flex flex-col gap-2 pt-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all font-medium ${
                      isActive
                        ? "bg-gradient-primary text-white shadow-lg"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
              <button
                onClick={scrollToContact}
                className="flex items-center gap-3 px-6 py-4 rounded-xl text-muted-foreground hover:text-foreground hover:bg-card/50 transition-all font-medium"
              >
                <Mail className="w-5 h-5" />
                Contact
              </button>
              
              {/* Mobile Auth Buttons */}
              {isAuthenticated && user ? (
                <>
                  <div className="px-6 py-2 text-sm">
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-6 py-4 rounded-xl text-destructive hover:bg-destructive/10 transition-all font-medium"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2 animate-fade-in">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full flex items-center gap-3 px-6 py-4 rounded-xl text-muted-foreground hover:text-foreground hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-300 font-medium">
                      <LogIn className="w-5 h-5" />
                      Login
                    </button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-primary text-white shadow-lg hover:shadow-primary/50 hover:scale-[1.02] transition-all duration-300 font-medium relative overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                      <UserPlus className="w-5 h-5 relative z-10" />
                      <span className="relative z-10">Sign Up - Get Started</span>
                      <span className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
