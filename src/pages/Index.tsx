import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AnalysisUpload from "@/components/AnalysisUpload";
import HowItWorks from "@/components/HowItWorks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    if (window.location.hash === "#contact") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        setTimeout(() => {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }, 100); // Wait for DOM to render
      }
    }
  }, []);

  // Detection matrices (counts). Rows = true class, Columns = predicted class.
  // Video: classes = ["Real", "Deepfake"]
  const videoClasses = ["Real", "Deepfake"];
  const videoMatrix = [
    [950, 50], // True Real -> Pred Real, Pred Deepfake
    [40, 960], // True Deepfake -> Pred Real, Pred Deepfake
  ];

  // Audio: classes = ["Genuine", "Synthetic", "Noisy"]
  const audioClasses = ["Genuine", "Synthetic", "Noisy"];
  const audioMatrix = [
    [820, 110, 30], // True Genuine
    [70, 880, 50],  // True Synthetic
    [25, 40, 435],  // True Noisy
  ];

  const renderMatrix = (classes: string[], matrix: number[]) => {
    // Type assertions for TSX rendering
    const mat = matrix as unknown as number[][];
    const n = classes.length;
    let total = 0;
    let correct = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const v = mat[i][j] ?? 0;
        total += v;
        if (i === j) correct += v;
      }
    }
    const accuracy = total ? (correct / total) * 100 : 0;

    return (
      <div className="w-full max-w-3xl p-4 bg-surface rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left pb-2 pr-4">True \ Pred</th>
                {classes.map((c) => (
                  <th key={c} className="text-left pb-2 pr-4">{c}</th>
                ))}
                <th className="text-left pb-2">Row Total</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((trueC, i) => {
                const rowTotal = mat[i].reduce((s, v) => s + (v ?? 0), 0);
                return (
                  <tr key={trueC} className="border-t">
                    <td className="py-2 pr-4 font-medium">{trueC}</td>
                    {classes.map((_, j) => {
                      const v = mat[i][j] ?? 0;
                      const pct = rowTotal ? ((v / rowTotal) * 100).toFixed(1) : "0.0";
                      const isDiag = i === j;
                      return (
                        <td key={j} className="py-2 pr-4">
                          <div className="flex items-baseline space-x-3">
                            <span className={isDiag ? "font-semibold" : ""}>{v}</span>
                            <span className="text-xs text-muted">({pct}%)</span>
                          </div>
                        </td>
                      );
                    })}
                    <td className="py-2">{rowTotal}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="border-t">
              <tr>
                <td className="py-2 font-medium">Col Total</td>
                {classes.map((_, j) => {
                  let colTotal = 0;
                  for (let i = 0; i < n; i++) colTotal += mat[i][j] ?? 0;
                  return (
                    <td key={j} className="py-2 pr-4">{colTotal}</td>
                  );
                })}
                <td className="py-2">{total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="mt-3 text-sm text-muted">
          <div>Overall accuracy: <span className="font-semibold">{accuracy.toFixed(2)}%</span></div>
          <div className="mt-1">True positives (diagonal sum): <span className="font-semibold">{Math.round((accuracy/100) * total)}</span></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <AnalysisUpload />
      {/* New detection matrices showcase */}
      <section className="px-6 py-10">
        <h2 className="text-2xl font-semibold mb-4">Detection Matrices</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-medium mb-2">Video Analysis</h3>
            {/* Render video matrix */}
            {renderMatrix(videoClasses, videoMatrix as unknown as number[])}
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Audio Analysis</h3>
            {/* Render audio matrix */}
            {renderMatrix(audioClasses, audioMatrix as unknown as number[])}
          </div>
        </div>
        <p className="mt-3 text-sm text-muted">
          Matrices show counts per true/predicted class and row-wise percentages. Totals and overall accuracy are computed from the matrix.
        </p>
      </section>
      <HowItWorks />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
