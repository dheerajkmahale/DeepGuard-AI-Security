import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BatchUpload from "@/components/BatchUpload";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layers, Zap } from "lucide-react";

const BatchAnalysis = () => {
  const [analyzing, setAnalyzing] = useState(false);

  const handleBatchAnalyze = (files: File[]) => {
    setAnalyzing(true);
    // Here you would handle the actual batch analysis
    // Files ready for processing
    setTimeout(() => setAnalyzing(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-32 pb-24 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Layers className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">Batch Processing</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              Analyze <span className="text-gradient-primary">Multiple Files</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload and analyze up to 10 files simultaneously with our advanced batch processing system
            </p>
          </div>

          <Tabs defaultValue="upload" className="space-y-6">
            <TabsList className="glass-card p-1">
              <TabsTrigger value="upload" className="gap-2">
                <Layers className="w-4 h-4" />
                Batch Upload
              </TabsTrigger>
              <TabsTrigger value="advanced" className="gap-2">
                <Zap className="w-4 h-4" />
                Advanced Options
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <BatchUpload onAnalyze={handleBatchAnalyze} />
            </TabsContent>

            <TabsContent value="advanced">
              <Card className="p-8 glass-strong border-2">
                <h3 className="text-2xl font-bold mb-4">Advanced Processing Options</h3>
                <p className="text-muted-foreground mb-6">
                  Configure advanced settings for batch analysis (Coming Soon)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4 glass-card">
                    <h4 className="font-semibold mb-2">Priority Processing</h4>
                    <p className="text-sm text-muted-foreground">Process critical files first</p>
                  </Card>
                  <Card className="p-4 glass-card">
                    <h4 className="font-semibold mb-2">Custom AI Models</h4>
                    <p className="text-sm text-muted-foreground">Select specialized detection models</p>
                  </Card>
                  <Card className="p-4 glass-card">
                    <h4 className="font-semibold mb-2">Detailed Reports</h4>
                    <p className="text-sm text-muted-foreground">Generate comprehensive analysis reports</p>
                  </Card>
                  <Card className="p-4 glass-card">
                    <h4 className="font-semibold mb-2">API Integration</h4>
                    <p className="text-sm text-muted-foreground">Automate with our REST API</p>
                  </Card>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BatchAnalysis;
