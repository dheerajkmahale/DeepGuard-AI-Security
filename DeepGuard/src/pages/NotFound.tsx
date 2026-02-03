import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="p-8 bg-card/50 backdrop-blur-sm border-border max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-destructive/10 rounded-full">
            <AlertCircle className="w-16 h-16 text-destructive" />
          </div>
        </div>
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <h2 className="text-2xl font-semibold mb-3">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button variant="hero" size="lg" className="w-full">
            <Home className="w-5 h-5" />
            Return to Home
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default NotFound;
