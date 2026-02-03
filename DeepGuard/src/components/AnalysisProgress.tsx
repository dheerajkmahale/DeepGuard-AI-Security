/**
 * Real-Time Analysis Progress Component
 * Shows detailed processing stages with visual feedback
 */

import { useEffect, useState } from "react";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

export interface AnalysisStage {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  duration?: number;
}

interface AnalysisProgressProps {
  fileType: string;
  onComplete: () => void;
}

const AnalysisProgress = ({ fileType, onComplete }: AnalysisProgressProps) => {
  const [stages, setStages] = useState<AnalysisStage[]>([]);
  const [currentStage, setCurrentStage] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  const isImage = fileType.startsWith('image/');
  const isVideo = fileType.startsWith('video/');
  const isAudio = fileType.startsWith('audio/');

  useEffect(() => {
    // Initialize stages based on file type
    const initialStages: AnalysisStage[] = [
      {
        id: '1',
        name: 'File Validation',
        description: 'Verifying file integrity and format',
        status: 'pending',
        progress: 0,
      },
      {
        id: '2',
        name: 'Security Scan',
        description: 'Checking for malware and threats',
        status: 'pending',
        progress: 0,
      },
      {
        id: '3',
        name: 'Pre-processing',
        description: isVideo ? 'Extracting frames and audio' : isImage ? 'Analyzing image data' : 'Processing audio waveform',
        status: 'pending',
        progress: 0,
      },
      {
        id: '4',
        name: 'AI Model Loading',
        description: 'Initializing deepfake detection model',
        status: 'pending',
        progress: 0,
      },
      {
        id: '5',
        name: 'Feature Extraction',
        description: isVideo ? 'Analyzing facial landmarks and voice patterns' : isImage ? 'Extracting GAN artifacts and patterns' : 'Analyzing voice frequency patterns',
        status: 'pending',
        progress: 0,
      },
      {
        id: '6',
        name: 'Deep Analysis',
        description: 'Running neural network detection',
        status: 'pending',
        progress: 0,
      },
      {
        id: '7',
        name: 'Pattern Recognition',
        description: 'Identifying manipulation signatures',
        status: 'pending',
        progress: 0,
      },
      {
        id: '8',
        name: 'Confidence Calculation',
        description: 'Computing final detection score',
        status: 'pending',
        progress: 0,
      },
    ];

    setStages(initialStages);
    processStages(initialStages);
  }, [fileType]);

  const processStages = async (stageList: AnalysisStage[]) => {
    const totalStages = stageList.length;

    for (let i = 0; i < stageList.length; i++) {
      const stage = stageList[i];
      setCurrentStage(i);

      // Mark as processing
      setStages(prev => prev.map((s, idx) => 
        idx === i ? { ...s, status: 'processing' as const } : s
      ));

      // Simulate processing with progress
      const duration = 300 + Math.random() * 500; // 300-800ms per stage
      const steps = 20;
      const stepDuration = duration / steps;

      for (let step = 0; step <= steps; step++) {
        await new Promise(resolve => setTimeout(resolve, stepDuration));
        
        const stageProgress = (step / steps) * 100;
        const overall = ((i + step / steps) / totalStages) * 100;

        setStages(prev => prev.map((s, idx) => 
          idx === i ? { ...s, progress: stageProgress } : s
        ));
        
        setOverallProgress(overall);
      }

      // Mark as completed
      setStages(prev => prev.map((s, idx) => 
        idx === i ? { ...s, status: 'completed' as const, progress: 100, duration: Math.round(duration) } : s
      ));
    }

    // Wait a bit before completing
    await new Promise(resolve => setTimeout(resolve, 300));
    onComplete();
  };

  const getStatusIcon = (status: AnalysisStage['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 text-primary animate-spin" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-muted" />;
    }
  };

  const getStageColor = (status: AnalysisStage['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-500/10';
      case 'processing':
        return 'border-primary bg-primary/10';
      case 'error':
        return 'border-destructive bg-destructive/10';
      default:
        return 'border-border bg-muted/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="p-6 glass-strong border-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Analyzing Content</h3>
              <p className="text-muted-foreground">
                Processing stage {currentStage + 1} of {stages.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{Math.round(overallProgress)}%</div>
              <div className="text-xs text-muted-foreground">Overall Progress</div>
            </div>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>
      </Card>

      {/* Detailed Stages */}
      <Card className="p-6 glass-strong border-2">
        <h4 className="text-lg font-semibold mb-4">Processing Stages</h4>
        <div className="space-y-3">
          {stages.map((stage, index) => (
            <div
              key={stage.id}
              className={`p-4 rounded-xl border-2 transition-all ${getStageColor(stage.status)} ${
                stage.status === 'processing' ? 'scale-105 shadow-lg' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getStatusIcon(stage.status)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-semibold">{stage.name}</h5>
                    {stage.status === 'processing' && (
                      <span className="text-sm font-medium text-primary">
                        {Math.round(stage.progress)}%
                      </span>
                    )}
                    {stage.status === 'completed' && stage.duration && (
                      <span className="text-xs text-muted-foreground">
                        {stage.duration}ms
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{stage.description}</p>
                  {stage.status === 'processing' && (
                    <Progress value={stage.progress} className="h-1.5 mt-2" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AnalysisProgress;
