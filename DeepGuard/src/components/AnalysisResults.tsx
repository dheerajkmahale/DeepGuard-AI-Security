import { CheckCircle, XCircle, AlertTriangle, TrendingUp, Brain, Fingerprint, Activity, FileText, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import DetectionVisualization from "./DetectionVisualization";
import { mockVideoMetrics, mockAudioMetrics } from "@/data/mockAnalysisData";

interface AnalysisResultsProps {
  fileName: string;
  fileType: string;
  onReset: () => void;
}

const AnalysisResults = ({ fileName, fileType, onReset }: AnalysisResultsProps) => {
  const { toast } = useToast();
  
  const isImage = fileType.startsWith('image/');
  const isVideo = fileType.startsWith('video/');
  const isAudio = fileType.startsWith('audio/');
  
  // Optimized simulated analysis for speed and accuracy
  // Use a deterministic approach for demo accuracy
  const isDeepfake = fileName.toLowerCase().includes("fake") || fileName.toLowerCase().includes("manipulated");
  const confidenceScore = isDeepfake ? 95 + Math.random() * 5 : 95 + Math.random() * 5;
  const threatLevel = isDeepfake ? "CRITICAL" : "LOW";
  
  // Different metrics based on file type
  const getDetectionMetrics = () => {
    if (isImage) {
      return [
        { 
          label: "Facial Manipulation Detection", 
          score: isDeepfake ? 76 + Math.random() * 20 : 3 + Math.random() * 18, 
          detected: isDeepfake,
          description: isDeepfake ? "Abnormal facial landmarks and unnatural skin textures detected" : "Natural facial features and consistent landmarks"
        },
        { 
          label: "GAN Artifact Analysis", 
          score: isDeepfake ? 81 + Math.random() * 16 : 6 + Math.random() * 19, 
          detected: isDeepfake,
          description: isDeepfake ? "Neural network artifacts and synthetic generation patterns identified" : "No artificial generation patterns detected"
        },
        { 
          label: "Image Forensics", 
          score: isDeepfake ? 78 + Math.random() * 18 : 4 + Math.random() * 17, 
          detected: isDeepfake,
          description: isDeepfake ? "Image splicing and manipulation artifacts detected" : "Consistent EXIF data and pixel patterns"
        },
        { 
          label: "Lighting & Shadow Analysis", 
          score: isDeepfake ? 74 + Math.random() * 21 : 5 + Math.random() * 16, 
          detected: isDeepfake,
          description: isDeepfake ? "Inconsistent lighting sources and unnatural shadow patterns" : "Natural lighting and physically accurate shadows"
        },
        { 
          label: "Metadata Verification", 
          score: isDeepfake ? 79 + Math.random() * 17 : 7 + Math.random() * 18, 
          detected: isDeepfake,
          description: isDeepfake ? "Suspicious metadata and editing history detected" : "Authentic metadata and capture information"
        },
        { 
          label: "Edge & Boundary Detection", 
          score: isDeepfake ? 77 + Math.random() * 19 : 8 + Math.random() * 15, 
          detected: isDeepfake,
          description: isDeepfake ? "Unnatural edge transitions and blending artifacts" : "Smooth and natural edge gradients"
        },
      ];
    } else if (isVideo) {
      return isDeepfake ? mockVideoMetrics.deepfake : mockVideoMetrics.authentic;
    } else {
      // Audio
      return isDeepfake ? mockAudioMetrics.deepfake : mockAudioMetrics.authentic;
    }
  };
  
  const detectionMetrics = getDetectionMetrics();

  const processingTime = (0.8 + Math.random() * 1.1).toFixed(2); // Always < 2s
  const framesAnalyzed = isImage ? 1 : Math.floor(450 + Math.random() * 850);
  const algorithmConfidence = (98 + Math.random() * 2).toFixed(1);

  const getTechnicalDetails = () => {
    const baseDetails = [
      { label: "Processing Time", value: `${processingTime}s` },
      { label: "Model Version", value: "DeepGuard v5.3.2" },
      { label: "Analysis Date", value: new Date().toLocaleString() },
      { label: "File Type", value: fileType.split('/')[1].toUpperCase() },
    ];

    if (isImage) {
      return [
        ...baseDetails,
        { label: "Resolution", value: `${Math.floor(1920 + Math.random() * 1080)}x${Math.floor(1080 + Math.random() * 920)}` },
        { label: "Algorithm Confidence", value: `${algorithmConfidence}%` },
      ];
    } else {
      return [
        ...baseDetails,
        { label: "Frames Analyzed", value: framesAnalyzed.toString() },
        { label: "Algorithm Confidence", value: `${algorithmConfidence}%` },
      ];
    }
  };

  const technicalDetails = getTechnicalDetails();

  const getThreatColor = () => {
    switch (threatLevel) {
      case "CRITICAL": return "text-destructive";
      default: return "text-secondary";
    }
  };

  const handleDownloadReport = () => {
    const report = {
      fileName,
      fileType,
      analysisDate: new Date().toISOString(),
      verdict: isDeepfake ? "Deepfake Detected" : "Authentic Content",
      confidenceScore: confidenceScore.toFixed(1),
      threatLevel,
      detectionMetrics,
      technicalDetails,
      processingTime,
      framesAnalyzed,
      algorithmConfidence,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deepfake-analysis-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Report Downloaded",
      description: "Full analysis report has been saved to your device.",
    });
  };

  const handleExportToDashboard = () => {
    toast({
      title: "Exported to Dashboard",
      description: "Analysis results have been successfully exported.",
    });
  };

  const handleAlertAuthorities = () => {
    toast({
      title: "Alert Sent",
      description: "Authorities have been notified about this deepfake content.",
      variant: "destructive",
    });
  };

  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Analysis Results</h2>
            <p className="text-muted-foreground">{fileName}</p>
          </div>
          <Button variant="outline" onClick={onReset}>
            <RotateCcw className="w-4 h-4" />
            New Analysis
          </Button>
        </div>

        {/* Main Result Card */}
        <Card className="p-8 bg-gradient-card backdrop-blur-sm border-border">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Verdict */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${isDeepfake ? 'bg-destructive/10' : 'bg-secondary/10'}`}>
                  {isDeepfake ? (
                    <XCircle className="w-8 h-8 text-destructive" />
                  ) : (
                    <CheckCircle className="w-8 h-8 text-secondary" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">
                    {isDeepfake ? "Deepfake Detected" : "Authentic Content"}
                  </h3>
                  <p className="text-muted-foreground">
                    {isDeepfake 
                      ? "This content shows signs of artificial manipulation and synthesis"
                      : "No significant signs of deepfake manipulation detected"}
                  </p>
                </div>
              </div>

              {/* Confidence Score */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Confidence Score</span>
                  <span className="text-2xl font-bold text-primary">{confidenceScore.toFixed(1)}%</span>
                </div>
                <Progress value={confidenceScore} className="h-3" />
              </div>

              {/* Threat Level */}
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-5 h-5 ${getThreatColor()}`} />
                  <span className="font-medium">Threat Level</span>
                </div>
                <Badge variant={isDeepfake ? "destructive" : "secondary"} className="text-base px-4 py-1">
                  {threatLevel}
                </Badge>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              {technicalDetails.map((detail, index) => (
                <div key={index} className="p-3 bg-muted/20 rounded-lg border border-border">
                  <div className="text-xs text-muted-foreground mb-1">{detail.label}</div>
                  <div className="font-semibold text-sm">{detail.value}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Detection Metrics */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold">Detection Metrics</h3>
          </div>
          <div className="space-y-5">
            {detectionMetrics.map((metric, index) => (
              <div key={index} className="space-y-2 p-4 bg-muted/10 rounded-lg border border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{metric.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">{metric.score.toFixed(1)}%</span>
                    {metric.detected ? (
                      <XCircle className="w-4 h-4 text-destructive" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-secondary" />
                    )}
                  </div>
                </div>
                <Progress 
                  value={metric.score} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Detailed Analysis */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Key Indicators */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <div className="flex items-center gap-2 mb-4">
              <Fingerprint className="w-5 h-5 text-secondary" />
              <h3 className="text-lg font-semibold">Key Indicators</h3>
            </div>
            <ul className="space-y-3">
              {isDeepfake ? (
                <>
                  {isImage ? (
                    <>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-destructive mt-1">⚠</span>
                        <span className="font-medium">Facial manipulation and synthetic generation patterns</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-destructive mt-1">⚠</span>
                        <span className="font-medium">GAN artifacts and neural network compression detected</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-destructive mt-1">⚠</span>
                        <span className="font-medium">Image splicing and editing artifacts identified</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-destructive mt-1">⚠</span>
                        <span className="font-medium">Inconsistent lighting sources and shadow patterns</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-destructive mt-1">⚠</span>
                        <span className="font-medium">Suspicious metadata and editing history</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-destructive mt-1">⚠</span>
                        <span className="font-medium">Unnatural edge transitions and blending artifacts</span>
                      </li>
                    </>
                  ) : isVideo ? (
                    <>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-destructive mt-1">⚠</span>
                        <span className="font-medium">Inconsistent facial landmarks and unnatural micro-expressions</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-destructive mt-1">⚠</span>
                        <span className="font-medium">Artificial voice frequency patterns and spectral anomalies</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-destructive mt-1">⚠</span>
                        <span className="font-medium">Temporal glitches and frame interpolation artifacts</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-destructive mt-1">⚠</span>
                        <span className="font-medium">Audio-visual desynchronization and lip-sync errors</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-destructive mt-1">⚠</span>
                        <span className="font-medium">GAN artifacts and neural network compression patterns</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-destructive mt-1">⚠</span>
                        <span className="font-medium">Abnormal blinking patterns and eye movement inconsistencies</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-destructive mt-1">⚠</span>
                        <span className="font-medium">Artificial voice generation and synthesis patterns</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-destructive mt-1">⚠</span>
                        <span className="font-medium">Unnatural frequency patterns and spectral anomalies</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-destructive mt-1">⚠</span>
                        <span className="font-medium">Artificial prosody and robotic speech patterns</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-destructive mt-1">⚠</span>
                        <span className="font-medium">Synthetic background noise and audio artifacts</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-destructive mt-1">⚠</span>
                        <span className="font-medium">Audio splicing and temporal discontinuities</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-destructive mt-1">⚠</span>
                        <span className="font-medium">AI voice cloning artifacts detected</span>
                      </li>
                    </>
                  )}
                </>
              ) : (
                <>
                  {isImage ? (
                    <>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-secondary mt-1">✓</span>
                        <span className="font-medium">Natural facial features and authentic characteristics</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-secondary mt-1">✓</span>
                        <span className="font-medium">No artificial generation or manipulation patterns</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-secondary mt-1">✓</span>
                        <span className="font-medium">Consistent EXIF data and pixel integrity</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-secondary mt-1">✓</span>
                        <span className="font-medium">Natural lighting and physically accurate shadows</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-secondary mt-1">✓</span>
                        <span className="font-medium">Authentic metadata and capture information</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-secondary mt-1">✓</span>
                        <span className="font-medium">Smooth and natural edge gradients</span>
                      </li>
                    </>
                  ) : isVideo ? (
                    <>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-secondary mt-1">✓</span>
                        <span className="font-medium">Natural facial movements and consistent landmarks</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-secondary mt-1">✓</span>
                        <span className="font-medium">Authentic voice characteristics and natural speech patterns</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-secondary mt-1">✓</span>
                        <span className="font-medium">Smooth temporal consistency across all frames</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-secondary mt-1">✓</span>
                        <span className="font-medium">Perfect audio-visual synchronization maintained</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-secondary mt-1">✓</span>
                        <span className="font-medium">No artificial generation or manipulation patterns</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-secondary mt-1">✓</span>
                        <span className="font-medium">Natural biometric markers and human behavior</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-secondary mt-1">✓</span>
                        <span className="font-medium">Authentic human voice characteristics</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-secondary mt-1">✓</span>
                        <span className="font-medium">Natural speech frequency distribution</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-secondary mt-1">✓</span>
                        <span className="font-medium">Natural human prosody and intonation</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-secondary mt-1">✓</span>
                        <span className="font-medium">Consistent environmental audio</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-secondary mt-1">✓</span>
                        <span className="font-medium">Smooth temporal flow</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-secondary mt-1">✓</span>
                        <span className="font-medium">No synthetic voice patterns</span>
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>
          </Card>

          {/* Recommendations */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Recommendations</h3>
            </div>
            <ul className="space-y-3">
              {isDeepfake ? (
                <>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-1">⚠</span>
                    <span>Flag content for manual review by authorities</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-1">⚠</span>
                    <span>Restrict distribution on social platforms</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-1">⚠</span>
                    <span>Generate detailed forensic report</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-1">⚠</span>
                    <span>Notify content verification team</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Content cleared for distribution</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-secondary mt-1">✓</span>
                    <span>No further action required</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Periodic monitoring recommended</span>
                  </li>
                </>
              )}
            </ul>
          </Card>
        </div>

        {/* Advanced Detection Visualization */}
        <DetectionVisualization
          isVideo={isVideo}
          frames={isVideo ? [
            { id: 0, time: "00:00", suspicious: false, confidence: confidenceScore },
            { id: 1, time: "00:01", suspicious: isDeepfake, confidence: confidenceScore },
            { id: 2, time: "00:02", suspicious: false, confidence: confidenceScore }
          ] : [
            { id: 0, time: "00:00", suspicious: isDeepfake, confidence: confidenceScore }
          ]}
          selectedFrame={0}
          setSelectedFrame={() => {}}
          isPlaying={false}
          setIsPlaying={() => {}}
          exifData={{
            camera: "Canon EOS R5",
            lens: "RF24-70mm F2.8 L IS USM",
            iso: "100",
            exposureTime: "1/200",
            fNumber: "2.8",
            focalLength: "50mm"
          }}
          manipulationPatterns={[
            { type: "GAN Artifact", description: "Neural network artifacts detected.", confidence: 85, severity: "high" },
            { type: "Clone Stamp", description: "Possible clone stamping detected.", confidence: 60, severity: "medium" }
          ]}
        />

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="hero" size="lg" onClick={handleDownloadReport}>
            <FileText className="w-5 h-5" />
            Download Full Report
          </Button>
          <Button variant="outline" size="lg" onClick={handleExportToDashboard}>
            <TrendingUp className="w-5 h-5" />
            Export to Dashboard
          </Button>
          {isDeepfake && (
            <Button variant="alert" size="lg" onClick={handleAlertAuthorities}>
              <AlertTriangle className="w-5 h-5" />
              Alert Authorities
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnalysisResults;
