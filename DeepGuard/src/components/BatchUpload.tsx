import { useState, useCallback } from "react";
import { Upload, FileVideo, FileAudio, FileImage, X, Loader2, Sparkles, Shield, AlertTriangle, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { performSecurityScan } from "@/lib/securityScanner";

interface FileWithPreview {
  file: File;
  preview?: string;
  securityStatus: 'safe' | 'warning' | 'threat' | 'scanning' | null;
  scanResult?: any;
}

interface BatchUploadProps {
  onAnalyze: (files: File[]) => void;
}

const BatchUpload = ({ onAnalyze }: BatchUploadProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    processFiles(selectedFiles);
  };

  const validateFile = (file: File): boolean => {
    const validTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/tiff',
      'video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo', 
      'video/avi', 'video/x-matroska', 'video/mkv', 'video/x-flv', 'video/mpeg',
      'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3', 'audio/x-m4a', 'audio/mp4'
    ];
    const maxSize = 100 * 1024 * 1024; // 100MB

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const validExtensions = [
      'jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'tif',
      'mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv', 'flv', 'mpeg', 'mpg', 
      'mp3', 'wav', 'm4a'
    ];
    
    if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension || '')) {
      toast.error(`Invalid file type: ${file.name}`);
      return false;
    }

    if (file.size > maxSize) {
      toast.error(`File too large: ${file.name} (max 100MB)`);
      return false;
    }

    return true;
  };

  const processFiles = async (newFiles: File[]) => {
    const validFiles = newFiles.filter(validateFile);
    
    if (validFiles.length === 0) return;
    
    if (files.length + validFiles.length > 10) {
      toast.error("Maximum 10 files allowed per batch");
      return;
    }

    const filesWithPreview: FileWithPreview[] = await Promise.all(
      validFiles.map(async (file) => {
        let preview: string | undefined;
        
        if (file.type.startsWith('image/')) {
          preview = URL.createObjectURL(file);
        }
        
        return {
          file,
          preview,
          securityStatus: 'scanning' as const,
        };
      })
    );

    setFiles(prev => [...prev, ...filesWithPreview]);
    
    // Scan files in background
    filesWithPreview.forEach(async (fileWithPreview, index) => {
      const scanResult = await performSecurityScan(fileWithPreview.file);
      
      setFiles(prev => prev.map((f, i) => {
        if (f.file === fileWithPreview.file) {
          return {
            ...f,
            securityStatus: scanResult.isSafe 
              ? (scanResult.warnings.length > 0 ? 'warning' : 'safe')
              : 'threat',
            scanResult,
          };
        }
        return f;
      }));
    });

    toast.success(`${validFiles.length} file(s) added`);
  };

  const removeFile = (index: number) => {
    setFiles(prev => {
      const updated = [...prev];
      const removed = updated.splice(index, 1)[0];
      if (removed.preview) {
        URL.revokeObjectURL(removed.preview);
      }
      return updated;
    });
  };

  const removeAll = () => {
    files.forEach(f => {
      if (f.preview) URL.revokeObjectURL(f.preview);
    });
    setFiles([]);
  };

  const handleBatchAnalyze = async () => {
    const safeFiles = files.filter(f => f.securityStatus === 'safe' || f.securityStatus === 'warning');
    
    if (safeFiles.length === 0) {
      toast.error("No safe files to analyze");
      return;
    }

    setIsProcessing(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 200);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    clearInterval(interval);
    setUploadProgress(100);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onAnalyze(safeFiles.map(f => f.file));
    setIsProcessing(false);
    toast.success(`Analyzing ${safeFiles.length} file(s)`);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <FileImage className="w-5 h-5" />;
    if (type.startsWith('video/')) return <FileVideo className="w-5 h-5" />;
    if (type.startsWith('audio/')) return <FileAudio className="w-5 h-5" />;
    return <FileImage className="w-5 h-5" />;
  };

  const getSecurityBadge = (status: FileWithPreview['securityStatus']) => {
    switch (status) {
      case 'safe':
        return <Badge variant="default" className="gap-1"><Shield className="w-3 h-3" /> Safe</Badge>;
      case 'warning':
        return <Badge variant="outline" className="gap-1 border-yellow-500 text-yellow-500"><AlertTriangle className="w-3 h-3" /> Warning</Badge>;
      case 'threat':
        return <Badge variant="destructive" className="gap-1"><X className="w-3 h-3" /> Threat</Badge>;
      case 'scanning':
        return <Badge variant="secondary" className="gap-1"><Loader2 className="w-3 h-3 animate-spin" /> Scanning</Badge>;
      default:
        return null;
    }
  };

  const safeFilesCount = files.filter(f => f.securityStatus === 'safe' || f.securityStatus === 'warning').length;

  return (
    <div className="space-y-6">
      <Card className="p-8 glass-strong border-2">
        <div
          className={`relative border-3 border-dashed rounded-2xl p-12 transition-all duration-500 ${
            dragActive 
              ? "border-primary bg-primary/10 scale-105" 
              : "border-border/50 hover:border-primary/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative p-6 bg-gradient-primary rounded-full">
                  <Upload className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Drop multiple files here</h3>
              <p className="text-muted-foreground">
                or click to browse • Max 10 files per batch
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
              <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-lg">
                <FileImage className="w-4 h-4 text-accent" />
                <span>Images</span>
              </div>
              <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-lg">
                <FileVideo className="w-4 h-4 text-primary" />
                <span>Videos</span>
              </div>
              <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-lg">
                <FileAudio className="w-4 h-4 text-secondary" />
                <span>Audio</span>
              </div>
            </div>

            <input
              type="file"
              accept="image/*,video/*,audio/*"
              onChange={handleFileInput}
              multiple
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </Card>

      {files.length > 0 && (
        <Card className="p-6 glass-strong border-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold">Selected Files ({files.length})</h3>
              <p className="text-sm text-muted-foreground">
                {safeFilesCount} file(s) ready for analysis
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={removeAll} className="gap-2">
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {files.map((fileItem, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 glass-card rounded-xl"
              >
                {fileItem.preview ? (
                  <img
                    src={fileItem.preview}
                    alt={fileItem.file.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center">
                    {getFileIcon(fileItem.file.type)}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{fileItem.file.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {(fileItem.file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                    {getSecurityBadge(fileItem.securityStatus)}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  className="rounded-lg hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>

          {isProcessing && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Processing files...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          <Button
            variant="hero"
            size="lg"
            onClick={handleBatchAnalyze}
            disabled={isProcessing || safeFilesCount === 0}
            className="w-full mt-6 gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing {files.length} files...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Analyze {safeFilesCount} File{safeFilesCount !== 1 ? 's' : ''}
              </>
            )}
          </Button>
        </Card>
      )}
    </div>
  );
};

export default BatchUpload;
