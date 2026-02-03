
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Layers, Info, Activity, PauseCircle, PlayCircle, AlertTriangle, CheckCircle } from "lucide-react";

type Frame = {
	id: number;
	time: string;
	suspicious: boolean;
	confidence: number;
};

type ExifData = {
	camera: string;
	lens: string;
	iso: string;
	exposureTime: string;
	fNumber: string;
	focalLength: string;
};

type ManipulationPattern = {
	type: string;
	description: string;
	confidence: number;
	severity: string;
};

function getSeverityColor(severity: string) {
	switch (severity) {
		case "high":
			return "border-red-500";
		case "medium":
			return "border-yellow-500";
		case "low":
			return "border-green-500";
		default:
			return "border-border";
	}
}

interface Props {
	isVideo: boolean;
	frames: Frame[];
	selectedFrame: number;
	setSelectedFrame: (id: number) => void;
	isPlaying: boolean;
	setIsPlaying: (playing: boolean) => void;
	exifData: ExifData;
	manipulationPatterns: ManipulationPattern[];
}

const DetectionVisualization: React.FC<Props> = ({
	isVideo,
	frames,
	selectedFrame,
	setSelectedFrame,
	isPlaying,
	setIsPlaying,
	exifData,
	manipulationPatterns,
}) => {
	return (
		<div className="space-y-6">
			<Tabs defaultValue={isVideo ? "frames" : "exif"} className="w-full">
				<TabsList className="glass-card p-1">
					{isVideo && (
						<TabsTrigger value="frames" className="gap-2">
							<Layers className="w-4 h-4" /> Frame Analysis
						</TabsTrigger>
					)}
					<TabsTrigger value="exif" className="gap-2">
						<Info className="w-4 h-4" /> EXIF Data
					</TabsTrigger>
					<TabsTrigger value="patterns" className="gap-2">
						<Activity className="w-4 h-4" /> Patterns
					</TabsTrigger>
				</TabsList>

				{isVideo && (
					<TabsContent value="frames" className="space-y-4">
						<Card className="p-6 glass-strong border-2">
							<div className="flex items-center justify-between mb-6">
								<h3 className="text-xl font-bold">Frame-by-Frame Analysis</h3>
								<div className="flex items-center gap-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => setIsPlaying(!isPlaying)}
										className="gap-2"
									>
										{isPlaying ? (
											<><PauseCircle className="w-4 h-4" /> Pause</>
										) : (
											<><PlayCircle className="w-4 h-4" /> Play</>
										)}
									</Button>
								</div>
							</div>
							<div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-6">
								{frames.map((frame) => (
									<div
										key={frame.id}
										onClick={() => setSelectedFrame(frame.id)}
										className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
											selectedFrame === frame.id
												? 'border-primary scale-110 shadow-lg'
												: 'border-border hover:border-primary/50'
										}`}
									>
										<div
											className={`aspect-video ${
												frame.suspicious ? 'bg-red-500/20' : 'bg-green-500/20'
											} flex items-center justify-center`}
										>
											<span className="text-xs font-bold">{frame.time}</span>
										</div>
										{frame.suspicious && (
											<div className="absolute top-1 right-1">
												<AlertTriangle className="w-3 h-3 text-red-500" />
											</div>
										)}
									</div>
								))}
							</div>
							<Card className="p-4 glass-card">
								<div className="flex items-center justify-between mb-4">
									<div>
										<h4 className="font-semibold">Frame {selectedFrame + 1} - {frames[selectedFrame]?.time}</h4>
										<p className="text-sm text-muted-foreground">
											{frames[selectedFrame]?.suspicious ? 'Suspicious activity detected' : 'No anomalies detected'}
										</p>
									</div>
									<div className="flex items-center gap-2">
										{frames[selectedFrame]?.suspicious ? (
											<><AlertTriangle className="w-5 h-5 text-red-500" /><Badge variant="destructive">{frames[selectedFrame]?.confidence}% Risk</Badge></>
										) : (
											<><CheckCircle className="w-5 h-5 text-green-500" /><Badge variant="default">Clean</Badge></>
										)}
									</div>
								</div>
								<Progress value={frames[selectedFrame]?.confidence || 0} className="h-2" />
							</Card>
						</Card>
					</TabsContent>
				)}

				<TabsContent value="exif" className="space-y-4">
					<Card className="p-6 glass-strong border-2">
						<h3 className="text-xl font-bold mb-6">EXIF Metadata Analysis</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-4">
								<div>
									<h4 className="font-semibold mb-3">Camera Information</h4>
									<div className="space-y-2 text-sm">
										<div className="flex justify-between">
											<span className="text-muted-foreground">Camera Model:</span>
											<span className="font-medium">{exifData.camera}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">Lens:</span>
											<span className="font-medium">{exifData.lens}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">ISO:</span>
											<span className="font-medium">{exifData.iso}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">Exposure:</span>
											<span className="font-medium">{exifData.exposureTime}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">Aperture:</span>
											<span className="font-medium">{exifData.fNumber}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">Focal Length:</span>
											<span className="font-medium">{exifData.focalLength}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Card>
				</TabsContent>

				<TabsContent value="patterns" className="space-y-4">
					<Card className="p-6 glass-strong border-2">
						<h3 className="text-xl font-bold mb-6">Manipulation Patterns</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{manipulationPatterns.map((pattern, idx) => (
								<Card key={idx} className={`p-4 glass-card border-2 ${getSeverityColor(pattern.severity)}`}>
									<div className="flex items-center justify-between mb-2">
										<span className="font-semibold text-sm">{pattern.type}</span>
										<Badge variant={pattern.confidence > 80 ? "destructive" : "outline"}>
											{pattern.confidence}%
										</Badge>
									</div>
									<p className="text-sm mb-2">{pattern.description}</p>
									<Progress value={pattern.confidence} className="h-2" />
								</Card>
							))}
						</div>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default DetectionVisualization;
