import { Upload, Cpu, Shield, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Content",
      description: "Submit video or audio files through our secure upload interface. We support multiple formats and files up to 100MB.",
      color: "text-primary"
    },
    {
      icon: Cpu,
      title: "AI Analysis",
      description: "Our advanced neural networks analyze facial landmarks, voice patterns, temporal consistency, and audio-visual synchronization in real-time.",
      color: "text-secondary"
    },
    {
      icon: Shield,
      title: "Detection & Classification",
      description: "Machine learning models identify manipulation artifacts, providing confidence scores and detailed classification of deepfake techniques.",
      color: "text-accent"
    },
    {
      icon: Bell,
      title: "Explainable Alerts",
      description: "Receive comprehensive reports with threat levels, key indicators, and actionable recommendations for authorities and verification teams.",
      color: "text-primary"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 bg-muted/20">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform uses state-of-the-art detection algorithms to identify deepfake content with exceptional accuracy
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] group"
            >
              <div className="space-y-4">
                {/* Step Number */}
                <div className="flex items-center justify-between">
                  <div className="text-5xl font-bold text-muted/20">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className={`p-3 rounded-full bg-card border border-border group-hover:border-primary/50 transition-all duration-300 ${step.color}`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border text-center">
            <div className="text-3xl font-bold text-primary mb-2">Multi-Modal</div>
            <p className="text-sm text-muted-foreground">
              Analyzes both video and audio signals simultaneously
            </p>
          </Card>
          <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border text-center">
            <div className="text-3xl font-bold text-secondary mb-2">Real-Time</div>
            <p className="text-sm text-muted-foreground">
              Results in under 2 seconds for rapid verification
            </p>
          </Card>
          <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border text-center">
            <div className="text-3xl font-bold text-accent mb-2">Explainable</div>
            <p className="text-sm text-muted-foreground">
              Detailed breakdowns of detection reasoning
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
