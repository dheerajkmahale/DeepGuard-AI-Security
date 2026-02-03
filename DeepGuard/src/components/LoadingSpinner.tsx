/**
 * Enhanced Loading Spinner Component
 * Beautiful animated loading states
 */

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner = ({ size = 'md', text, fullScreen = false }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const Spinner = () => (
    <div className="relative">
      {/* Outer rotating ring */}
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin"></div>
      </div>
      
      {/* Inner pulsing dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md">
        <div className="flex flex-col items-center gap-6 animate-scale-in">
          <Spinner />
          {text && (
            <p className="text-lg font-medium text-foreground animate-pulse">
              {text}
            </p>
          )}
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Spinner />
      {text && (
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
