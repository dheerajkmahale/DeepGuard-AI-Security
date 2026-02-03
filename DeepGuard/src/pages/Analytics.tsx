import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Download,
  TrendingUp,
  AlertTriangle,
  Shield,
  FileText,
  Calendar,
  Filter,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner";

interface AnalysisHistory {
  id: string;
  date: string;
  fileName: string;
  fileType: string;
  confidence: number;
  isDeepfake: boolean;
  processingTime: number;
}

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [fileTypeFilter, setFileTypeFilter] = useState("all");

  // Mock historical data
  const analysisHistory: AnalysisHistory[] = useMemo(() => [
    { id: "1", date: "2025-11-09", fileName: "video1.mp4", fileType: "video", confidence: 92.5, isDeepfake: true, processingTime: 3200 },
    { id: "2", date: "2025-11-09", fileName: "audio1.mp3", fileType: "audio", confidence: 15.3, isDeepfake: false, processingTime: 1800 },
    { id: "3", date: "2025-11-08", fileName: "image1.jpg", fileType: "image", confidence: 88.7, isDeepfake: true, processingTime: 1200 },
    { id: "4", date: "2025-11-08", fileName: "video2.mp4", fileType: "video", confidence: 8.2, isDeepfake: false, processingTime: 3500 },
    { id: "5", date: "2025-11-07", fileName: "audio2.wav", fileType: "audio", confidence: 94.1, isDeepfake: true, processingTime: 2100 },
    { id: "6", date: "2025-11-07", fileName: "image2.png", fileType: "image", confidence: 12.5, isDeepfake: false, processingTime: 900 },
    { id: "7", date: "2025-11-06", fileName: "video3.mkv", fileType: "video", confidence: 76.3, isDeepfake: true, processingTime: 4200 },
    { id: "8", date: "2025-11-06", fileName: "image3.jpg", fileType: "image", confidence: 91.8, isDeepfake: true, processingTime: 1100 },
    { id: "9", date: "2025-11-05", fileName: "audio3.mp3", fileType: "audio", confidence: 6.7, isDeepfake: false, processingTime: 1900 },
    { id: "10", date: "2025-11-05", fileName: "video4.mp4", fileType: "video", confidence: 85.2, isDeepfake: true, processingTime: 3800 },
    { id: "11", date: "2025-11-04", fileName: "image4.webp", fileType: "image", confidence: 19.4, isDeepfake: false, processingTime: 850 },
    { id: "12", date: "2025-11-04", fileName: "audio4.wav", fileType: "audio", confidence: 87.6, isDeepfake: true, processingTime: 2300 },
    { id: "13", date: "2025-11-03", fileName: "video5.mp4", fileType: "video", confidence: 11.8, isDeepfake: false, processingTime: 3300 },
    { id: "14", date: "2025-11-03", fileName: "image5.png", fileType: "image", confidence: 93.2, isDeepfake: true, processingTime: 1050 },
    { id: "15", date: "2025-11-02", fileName: "audio5.m4a", fileType: "audio", confidence: 14.1, isDeepfake: false, processingTime: 2000 },
  ], []);

  // Filter data
  const filteredData = useMemo(() => {
    let filtered = [...analysisHistory];
    
    // Filter by file type
    if (fileTypeFilter !== "all") {
      filtered = filtered.filter(item => item.fileType === fileTypeFilter);
    }
    
    // Filter by time range
    const now = new Date("2025-11-09");
    const daysMap: Record<string, number> = { "7d": 7, "30d": 30, "90d": 90, "all": 999 };
    const days = daysMap[timeRange];
    
    filtered = filtered.filter(item => {
      const itemDate = new Date(item.date);
      const diffTime = now.getTime() - itemDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= days;
    });
    
    return filtered;
  }, [analysisHistory, timeRange, fileTypeFilter]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredData.length;
    const deepfakes = filteredData.filter(d => d.isDeepfake).length;
    const authentic = total - deepfakes;
    const avgConfidence = filteredData.reduce((sum, d) => sum + d.confidence, 0) / total || 0;
    const avgProcessingTime = filteredData.reduce((sum, d) => sum + d.processingTime, 0) / total || 0;

    return {
      total,
      deepfakes,
      authentic,
      avgConfidence: avgConfidence.toFixed(1),
      avgProcessingTime: Math.round(avgProcessingTime),
      detectionRate: total > 0 ? ((deepfakes / total) * 100).toFixed(1) : "0",
    };
  }, [filteredData]);

  // Chart data preparation
  const trendData = useMemo(() => {
    const groupedByDate = filteredData.reduce((acc, item) => {
      const date = item.date;
      if (!acc[date]) {
        acc[date] = { date, deepfakes: 0, authentic: 0, total: 0 };
      }
      acc[date].total++;
      if (item.isDeepfake) {
        acc[date].deepfakes++;
      } else {
        acc[date].authentic++;
      }
      return acc;
    }, {} as Record<string, any>);

    return Object.values(groupedByDate).sort((a: any, b: any) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [filteredData]);

  const fileTypeData = useMemo(() => {
    const grouped = filteredData.reduce((acc, item) => {
      const type = item.fileType;
      if (!acc[type]) {
        acc[type] = { type, count: 0, deepfakes: 0 };
      }
      acc[type].count++;
      if (item.isDeepfake) {
        acc[type].deepfakes++;
      }
      return acc;
    }, {} as Record<string, any>);

    return Object.values(grouped);
  }, [filteredData]);

  const pieData = [
    { name: "Deepfakes", value: stats.deepfakes, color: "#ef4444" },
    { name: "Authentic", value: stats.authentic, color: "#22c55e" },
  ];

  const confidenceDistribution = useMemo(() => {
    const ranges = [
      { range: "0-20%", count: 0, color: "#22c55e" },
      { range: "20-40%", count: 0, color: "#84cc16" },
      { range: "40-60%", count: 0, color: "#eab308" },
      { range: "60-80%", count: 0, color: "#f97316" },
      { range: "80-100%", count: 0, color: "#ef4444" },
    ];

    filteredData.forEach(item => {
      const conf = item.confidence;
      if (conf < 20) ranges[0].count++;
      else if (conf < 40) ranges[1].count++;
      else if (conf < 60) ranges[2].count++;
      else if (conf < 80) ranges[3].count++;
      else ranges[4].count++;
    });

    return ranges;
  }, [filteredData]);

  const exportToCSV = () => {
    const headers = ["Date", "File Name", "File Type", "Confidence", "Result", "Processing Time (ms)"];
    const rows = filteredData.map(item => [
      item.date,
      item.fileName,
      item.fileType,
      `${item.confidence}%`,
      item.isDeepfake ? "Deepfake" : "Authentic",
      item.processingTime.toString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `deepguard-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
    
    toast.success("CSV exported successfully!");
  };

  const exportToPDF = () => {
    // In a real implementation, you'd use a library like jsPDF
    toast.info("PDF export coming soon! For now, use CSV export.");
  };

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 animate-slide-up">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-5xl font-black mb-4">
                Analytics <span className="text-gradient-primary">Dashboard</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Comprehensive insights into your deepfake detection history
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={exportToCSV} className="gap-2">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
              <Button variant="outline" onClick={exportToPDF} className="gap-2">
                <FileText className="w-4 h-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-6 glass-strong border-2 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold">Filters:</span>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            <Select value={fileTypeFilter} onValueChange={setFileTypeFilter}>
              <SelectTrigger className="w-40">
                <BarChart3 className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 glass-strong border-2 hover-lift animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Total Analyses</span>
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div className="text-4xl font-black">{stats.total}</div>
            <div className="text-sm text-muted-foreground mt-1">files scanned</div>
          </Card>

          <Card className="p-6 glass-strong border-2 hover-lift animate-slide-up" style={{ animationDelay: '0.25s' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Deepfakes Detected</span>
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div className="text-4xl font-black text-destructive">{stats.deepfakes}</div>
            <div className="text-sm text-muted-foreground mt-1">{stats.detectionRate}% detection rate</div>
          </Card>

          <Card className="p-6 glass-strong border-2 hover-lift animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Avg Confidence</span>
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div className="text-4xl font-black">{stats.avgConfidence}%</div>
            <div className="text-sm text-muted-foreground mt-1">detection accuracy</div>
          </Card>

          <Card className="p-6 glass-strong border-2 hover-lift animate-slide-up" style={{ animationDelay: '0.35s' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Avg Processing</span>
              <Shield className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-4xl font-black">{(stats.avgProcessingTime / 1000).toFixed(1)}s</div>
            <div className="text-sm text-muted-foreground mt-1">per analysis</div>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="glass-card p-1">
            <TabsTrigger value="trends" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="distribution" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Distribution
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <FileText className="w-4 h-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <Card className="p-6 glass-strong border-2 animate-slide-up">
              <h3 className="text-xl font-bold mb-6">Detection Trends Over Time</h3>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorDeepfakes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAuthentic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }} />
                  <Legend />
                  <Area type="monotone" dataKey="deepfakes" stroke="#ef4444" fillOpacity={1} fill="url(#colorDeepfakes)" name="Deepfakes" />
                  <Area type="monotone" dataKey="authentic" stroke="#22c55e" fillOpacity={1} fill="url(#colorAuthentic)" name="Authentic" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 glass-strong border-2 animate-slide-up">
              <h3 className="text-xl font-bold mb-6">Analysis by File Type</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={fileTypeData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }} />
                  <Legend />
                  <Bar dataKey="count" fill="#8b5cf6" name="Total" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="deepfakes" fill="#ef4444" name="Deepfakes" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 glass-strong border-2 animate-slide-up">
                <h3 className="text-xl font-bold mb-6">Detection Results</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 glass-strong border-2 animate-slide-up">
                <h3 className="text-xl font-bold mb-6">Confidence Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={confidenceDistribution}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }} />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                      {confidenceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card className="p-6 glass-strong border-2 animate-slide-up">
              <h3 className="text-xl font-bold mb-6">Analysis History</h3>
              <div className="space-y-3">
                {filteredData.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 glass-card rounded-xl hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold truncate">{item.fileName}</span>
                          <Badge variant={item.isDeepfake ? "destructive" : "default"}>
                            {item.isDeepfake ? "Deepfake" : "Authentic"}
                          </Badge>
                          <Badge variant="outline">{item.fileType}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{item.date}</span>
                          <span>•</span>
                          <span>{item.confidence}% confidence</span>
                          <span>•</span>
                          <span>{(item.processingTime / 1000).toFixed(1)}s processing</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-16 h-16 rounded-lg"
                          style={{
                            background: `linear-gradient(135deg, ${
                              item.isDeepfake ? "#ef4444" : "#22c55e"
                            } 0%, ${item.isDeepfake ? "#dc2626" : "#16a34a"} 100%)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "18px",
                          }}
                        >
                          {item.confidence.toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
