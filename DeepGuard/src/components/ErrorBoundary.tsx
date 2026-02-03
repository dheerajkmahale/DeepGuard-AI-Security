import React, { Component, ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
    
    // Log to error reporting service
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService = (error: Error, errorInfo: React.ErrorInfo) => {
    // In production, send to error tracking service like Sentry
    const errorLog = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };
    
    console.error('Error Log:', errorLog);
    
    // Store in localStorage for debugging
    try {
      const existingLogs = JSON.parse(localStorage.getItem('error_logs') || '[]');
      existingLogs.push(errorLog);
      // Keep only last 10 errors
      const recentLogs = existingLogs.slice(-10);
      localStorage.setItem('error_logs', JSON.stringify(recentLogs));
    } catch (e) {
      console.error('Failed to store error log:', e);
    }
  };

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
          <Card className="max-w-2xl w-full p-8 glass-strong border-2 border-destructive/50">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-destructive/10 rounded-full">
                  <AlertTriangle className="w-16 h-16 text-destructive" />
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-black">Something went wrong</h1>
                <p className="text-muted-foreground">
                  We encountered an unexpected error. Don't worry, we've logged it and will fix it soon.
                </p>
              </div>

              {this.state.error && (
                <Card className="p-4 bg-muted/50 text-left">
                  <h3 className="font-semibold text-sm mb-2">Error Details:</h3>
                  <pre className="text-xs text-destructive overflow-x-auto">
                    {this.state.error.message}
                  </pre>
                  {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                    <details className="mt-3">
                      <summary className="cursor-pointer text-xs font-medium text-muted-foreground">
                        Component Stack
                      </summary>
                      <pre className="mt-2 text-xs text-muted-foreground overflow-x-auto max-h-40">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </Card>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={this.handleReset}
                  className="gap-2 w-full sm:w-auto"
                >
                  <RefreshCcw className="w-5 h-5" />
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="gap-2 w-full sm:w-auto"
                >
                  <Link to="/">
                    <Home className="w-5 h-5" />
                    Go Home
                  </Link>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                If this problem persists, please contact support at support@deepguardai.com
              </p>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
