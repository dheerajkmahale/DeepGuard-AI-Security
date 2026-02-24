import { useState } from "react";
import { BarChart3, CheckCircle, XCircle, Calendar, FileText, TrendingUp, Download, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { mockAnalysisHistory, type AnalysisRecord } from "../../../src/data/mockAnalysisData";

const Dashboard = () => {
  const [analysisHistory] = useState<AnalysisRecord[]>(mockAnalysisHistory);

  const stats = {
    totalAnalyses: analysisHistory.length,
    deepfakesDetected: analysisHistory.filter(a => a.isDeepfake).length,
    authenticContent: analysisHistory.filter(a => !a.isDeepfake).length,
    avgConfidence: (analysisHistory.reduce((acc, a) => acc + a.confidenceScore, 0) / analysisHistory.length).toFixed(1)
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case "CRITICAL": return "destructive";
      case "HIGH": return "destructive";
      case "MEDIUM": return "default";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Analysis <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Monitor and review all deepfake detection analyses performed on the platform
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border">
              <div className="flex items-center justify-between mb-2">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">{stats.totalAnalyses}</div>
              <div className="text-sm text-muted-foreground">Total Analyses</div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <div className="flex items-center justify-between mb-2">
                <XCircle className="w-8 h-8 text-destructive" />
              </div>
              <div className="text-3xl font-bold mb-1">{stats.deepfakesDetected}</div>
              <div className="text-sm text-muted-foreground">Deepfakes Detected</div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-secondary" />
              </div>
              <div className="text-3xl font-bold mb-1">{stats.authenticContent}</div>
              <div className="text-sm text-muted-foreground">Authentic Content</div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
              <div className="text-3xl font-bold mb-1">{stats.avgConfidence}%</div>
              <div className="text-sm text-muted-foreground">Avg Confidence</div>
            </Card>
          </div>

          {/* Filters and Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
                All Results
              </Button>
              <Button variant="ghost" size="sm">
                Deepfakes Only
              </Button>
              <Button variant="ghost" size="sm">
                Authentic Only
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
              Export Data
            </Button>
          </div>

          {/* Analysis History Table */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Recent Analyses
            </h2>
            <div className="space-y-4">
              {analysisHistory.map((record) => (
                <div
                  key={record.id}
                  className="p-4 bg-muted/20 rounded-lg border border-border hover:border-primary/50 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 rounded-lg ${record.isDeepfake ? 'bg-destructive/10' : 'bg-secondary/10'}`}>
                        {record.isDeepfake ? (
                          <XCircle className="w-6 h-6 text-destructive" />
                        ) : (
                          <CheckCircle className="w-6 h-6 text-secondary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold truncate">{record.fileName}</h3>
                          <Badge variant={getThreatColor(record.threatLevel)}>
                            {record.threatLevel}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span>{record.fileType.split('/')[1].toUpperCase()}</span>
                          <span>•</span>
                          <span>{record.date}</span>
                          <span>•</span>
                          <span className="font-medium text-foreground">
                            {record.confidenceScore}% confidence
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4" />
                        View Report
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
