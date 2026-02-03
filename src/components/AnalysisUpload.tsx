import { useState, useCallback } from "react";
import { Upload, FileVideo, FileAudio, FileImage, X, Loader2, Sparkles, CheckCircle2, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import AnalysisResults from "./AnalysisResults";
import AnalysisProgress from "./AnalysisProgress";
import { performSecurityScan, sanitizeFileName } from "@/lib/securityScanner";

const AnalysisUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [securityStatus, setSecurityStatus] = useState<'safe' | 'warning' | 'threat' | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && validateFile(droppedFile)) {
      scanAndSetFile(droppedFile);
    }
  }, []);

  const validateFile = (file: File): boolean => {
    const maxSize = 5 * 1024 * 1024 * 1024; // 5GB

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/') && !file.type.startsWith('audio/')) {
      toast.error("Invalid file type. Please upload an image, video, or audio file.");
      return false;
    }

    if (file.size > maxSize) {
      toast.error("File size exceeds 10GB limit.");
      return false;
    }

    return true;
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      scanAndSetFile(selectedFile);
    }
  };

  const scanAndSetFile = async (selectedFile: File) => {
    setIsScanning(true);
    setSecurityStatus(null);
    
    try {
      // Perform security scan
      const scanResult = await performSecurityScan(selectedFile);
      
      if (!scanResult.isSafe) {
        // File has threats - reject it
        toast.error("Security Threat Detected!", {
          description: scanResult.threats.join('. '),
          duration: 5000,
        });
        setSecurityStatus('threat');
        setIsScanning(false);
        return;
      }
      
      if (scanResult.warnings.length > 0) {
        // File has warnings but is relatively safe
        toast.warning("Security Warning", {
          description: `File passed security scan with ${scanResult.warnings.length} warning(s). Proceed with caution.`,
          duration: 4000,
        });
        setSecurityStatus('warning');
      } else {
        // File is completely safe
        toast.success("Security Scan Passed", {
          description: `File verified safe in ${scanResult.scanTime}ms. Ready for analysis.`,
          duration: 3000,
        });
        setSecurityStatus('safe');
      }
      
      setFile(selectedFile);
      setShowResults(false);
      
    } catch (error) {
      toast.error("Security scan failed. Please try again.");
      setSecurityStatus(null);
    } finally {
      setIsScanning(false);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    setIsAnalyzing(true);
    setShowProgress(true);
  };

  const handleAnalysisComplete = () => {
    setIsAnalyzing(false);
    setShowProgress(false);
    setShowResults(true);
    toast.success("Analysis complete!");
  };

  const removeFile = () => {
    setFile(null);
    setShowResults(false);
    setShowProgress(false);
    setSecurityStatus(null);
  };

  if (showResults && file) {
    return <AnalysisResults fileName={file.name} fileType={file.type} onReset={removeFile} />;
  }

  if (showProgress && file) {
    return (
      <section className="py-24 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Analyzing <span className="text-gradient-primary">{file.name}</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Our AI is working hard to detect any manipulation
            </p>
          </div>
          <AnalysisProgress 
            fileType={file.type}
            onComplete={handleAnalysisComplete}
          />
        </div>
      </section>
    );
  }

  return (
    <section id="analysis" className="py-24 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">AI-Powered Analysis</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Upload Content for <span className="text-gradient-primary">Analysis</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload image, video, or audio files for real-time deepfake detection with comprehensive AI-powered analysis
          </p>
        </div>

        <Card className="p-8 md:p-12 glass-strong border-2 hover-lift animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div
            className={`relative border-3 border-dashed rounded-2xl p-16 transition-all duration-500 ${
              dragActive 
                ? "border-primary bg-primary/10 scale-105 shadow-2xl" 
                : "border-border/50 hover:border-primary/50 hover:bg-card/30"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!file ? (
              <div className="text-center space-y-8">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                    <div className="relative p-8 bg-gradient-primary rounded-full">
                      <Upload className="w-16 h-16 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">Drop your file here</h3>
                  <p className="text-muted-foreground text-lg">
                    or click to browse from your device
                  </p>
                </div>

                <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
                  <div className="flex items-center gap-3 px-6 py-3 glass-card rounded-xl">
                    <FileImage className="w-5 h-5 text-accent" />
                    <span className="font-medium">Image Files</span>
                  </div>
                  <div className="w-px h-8 bg-border hidden sm:block" />
                  <div className="flex items-center gap-3 px-6 py-3 glass-card rounded-xl">
                    <FileVideo className="w-5 h-5 text-primary" />
                    <span className="font-medium">Video Files</span>
                  </div>
                  <div className="w-px h-8 bg-border hidden sm:block" />
                  <div className="flex items-center gap-3 px-6 py-3 glass-card rounded-xl">
                    <FileAudio className="w-5 h-5 text-secondary" />
                    <span className="font-medium">Audio Files</span>
                  </div>
                </div>

                <input
                  type="file"
                  accept="*/*"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center justify-between p-6 glass-strong rounded-xl">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-4 bg-gradient-primary rounded-xl">
                      {file.type.startsWith('image/') ? (
                        <FileImage className="w-8 h-8 text-white" />
                      ) : file.type.startsWith('video/') ? (
                        <FileVideo className="w-8 h-8 text-white" />
                      ) : (
                        <FileAudio className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg">{file.name}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-2">
                          {securityStatus === 'safe' && (
                            <>
                              <Shield className="w-4 h-4 text-green-500" />
                              <span className="text-green-500">Secure</span>
                            </>
                          )}
                          {securityStatus === 'warning' && (
                            <>
                              <AlertTriangle className="w-4 h-4 text-yellow-500" />
                              <span className="text-yellow-500">Warning</span>
                            </>
                          )}
                          {securityStatus === 'threat' && (
                            <>
                              <X className="w-4 h-4 text-destructive" />
                              <span className="text-destructive">Threat Detected</span>
                            </>
                          )}
                        </div>
                        <span>•</span>
                        <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                        <span>•</span>
                        <span className="text-accent">Ready for analysis</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={removeFile}
                    disabled={isAnalyzing || isScanning}
                    className="rounded-xl hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || isScanning || securityStatus === 'threat'}
                  className="w-full text-lg py-7 rounded-xl hover-lift shadow-2xl"
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Scanning for threats...
                    </>
                  ) : isAnalyzing ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6" />
                      Start AI Analysis
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Supported formats:</span> JPG, PNG, WebP, GIF, BMP, TIFF (image) | MP4, AVI, MKV, MOV, WebM, FLV, MPEG (video) | MP3, WAV, M4A, OGG (audio)
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Maximum file size: 5GB • All uploads are encrypted and secure • <Shield className="w-3 h-3 inline" /> Automatic virus & malware scanning
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AnalysisUpload;
