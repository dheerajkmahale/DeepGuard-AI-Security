export interface AnalysisRecord {
  id: string;
  fileName: string;
  fileType: string;
  date: string;
  isDeepfake: boolean;
  confidenceScore: number;
  threatLevel: string;
}

export const mockAnalysisHistory: AnalysisRecord[] = [
  {
    id: "8",
    fileName: "recent_image_1.jpg",
    fileType: "image/jpeg",
    date: "2025-11-13 08:00",
    isDeepfake: true,
    confidenceScore: 98.1,
    threatLevel: "CRITICAL"
  },
  {
    id: "9",
    fileName: "recent_image_2.png",
    fileType: "image/png",
    date: "2025-11-13 07:30",
    isDeepfake: false,
    confidenceScore: 15.2,
    threatLevel: "LOW"
  },
  {
    id: "10",
    fileName: "yesterday_image.jpeg",
    fileType: "image/jpeg",
    date: "2025-11-12 18:00",
    isDeepfake: true,
    confidenceScore: 89.7,
    threatLevel: "HIGH"
  },
  {
    id: "11",
    fileName: "old_image.jpg",
    fileType: "image/jpeg",
    date: "2025-11-10 10:15",
    isDeepfake: true,
    confidenceScore: 91.3,
    threatLevel: "CRITICAL"
  },
  {
    id: "12",
    fileName: "another_old_image.png",
    fileType: "image/png",
    date: "2025-11-09 16:40",
    isDeepfake: false,
    confidenceScore: 5.7,
    threatLevel: "LOW"
  },
  {
    id: "13",
    fileName: "fake_video.mp4",
    fileType: "video/mp4",
    date: "2025-11-13 09:00",
    isDeepfake: true,
    confidenceScore: 92.5,
    threatLevel: "CRITICAL"
  },
  {
    id: "14",
    fileName: "authentic_video.mp4",
    fileType: "video/mp4",
    date: "2025-11-13 09:05",
    isDeepfake: false,
    confidenceScore: 10.8,
    threatLevel: "LOW"
  },
  {
    id: "15",
    fileName: "cloned_voice.mp3",
    fileType: "audio/mpeg",
    date: "2025-11-13 09:10",
    isDeepfake: true,
    confidenceScore: 96.2,
    threatLevel: "CRITICAL"
  },
  {
    id: "16",
    fileName: "natural_speech.wav",
    fileType: "audio/wav",
    date: "2025-11-13 09:15",
    isDeepfake: false,
    confidenceScore: 8.1,
    threatLevel: "LOW"
  }
];
