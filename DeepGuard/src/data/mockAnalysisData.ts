export const mockVideoMetrics = {
  deepfake: [
    { 
      label: "Facial Manipulation Detection", 
      score: 92.3, 
      detected: true,
      description: "Abnormal facial landmarks and unnatural skin textures detected"
    },
    { 
      label: "Voice Synthesis Analysis", 
      score: 85.1, 
      detected: true,
      description: "Artificial voice patterns and frequency anomalies identified"
    },
    { 
      label: "Temporal Consistency Check", 
      score: 94.6, 
      detected: true,
      description: "Frame-to-frame inconsistencies and temporal artifacts found"
    },
    { 
      label: "Audio-Visual Synchronization", 
      score: 88.9, 
      detected: true,
      description: "Lip-sync errors and audio-visual misalignment detected"
    },
    { 
      label: "Neural Network Artifacts", 
      score: 91.2, 
      detected: true,
      description: "GAN-specific artifacts and compression patterns identified"
    },
    { 
      label: "Biometric Consistency", 
      score: 86.7, 
      detected: true,
      description: "Inconsistent eye movements and unnatural blinking patterns"
    },
  ],
  authentic: [
    { 
      label: "Facial Manipulation Detection", 
      score: 12.4, 
      detected: false,
      description: "Natural facial features and consistent landmarks"
    },
    { 
      label: "Voice Synthesis Analysis", 
      score: 8.2, 
      detected: false,
      description: "Authentic human voice characteristics present"
    },
    { 
      label: "Temporal Consistency Check", 
      score: 5.8, 
      detected: false,
      description: "Smooth temporal flow and natural transitions"
    },
    { 
      label: "Audio-Visual Synchronization", 
      score: 10.3, 
      detected: false,
      description: "Perfect audio-visual synchronization maintained"
    },
    { 
      label: "Neural Network Artifacts", 
      score: 14.9, 
      detected: false,
      description: "No artificial generation patterns detected"
    },
    { 
      label: "Biometric Consistency", 
      score: 9.5, 
      detected: false,
      description: "Natural biometric markers and consistent behavior"
    },
  ]
};

export const mockAudioMetrics = {
  deepfake: [
    { 
      label: "Voice Synthesis Detection", 
      score: 93.7, 
      detected: true,
      description: "Artificial voice generation patterns detected"
    },
    { 
      label: "Frequency Analysis", 
      score: 89.4, 
      detected: true,
      description: "Unnatural frequency patterns and spectral anomalies"
    },
    { 
      label: "Prosody & Intonation", 
      score: 85.2, 
      detected: true,
      description: "Artificial prosody and robotic speech patterns"
    },
    { 
      label: "Background Noise Analysis", 
      score: 81.9, 
      detected: true,
      description: "Synthetic background noise and audio artifacts"
    },
    { 
      label: "Temporal Consistency", 
      score: 90.1, 
      detected: true,
      description: "Audio splicing and temporal discontinuities"
    },
    { 
      label: "Neural Voice Artifacts", 
      score: 95.5, 
      detected: true,
      description: "AI voice cloning artifacts detected"
    },
  ],
  authentic: [
    { 
      label: "Voice Synthesis Detection", 
      score: 11.8, 
      detected: false,
      description: "Authentic human voice characteristics"
    },
    { 
      label: "Frequency Analysis", 
      score: 7.6, 
      detected: false,
      description: "Natural speech frequency distribution"
    },
    { 
      label: "Prosody & Intonation", 
      score: 14.3, 
      detected: false,
      description: "Natural human prosody and intonation"
    },
    { 
      label: "Background Noise Analysis", 
      score: 9.1, 
      detected: false,
      description: "Consistent environmental audio"
    },
    { 
      label: "Temporal Consistency", 
      score: 6.7, 
      detected: false,
      description: "Smooth temporal flow"
    },
    { 
      label: "Neural Voice Artifacts", 
      score: 12.5, 
      detected: false,
      description: "No synthetic voice patterns"
    },
  ]
};
