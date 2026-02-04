"use client";
import HeroSection from "@/components/landing/hero-section";

export default function Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 selection:bg-primary/10">
      <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 relative">
        {/* Top Fade Grid Background */}
        <div
          className="absolute inset-0 z-0 dark:hidden"
          style={{
            backgroundImage: `
        linear-gradient(to right, #e2e8f07a 1px, transparent 1px),
        linear-gradient(to bottom, #e2e8f07a 1px, transparent 1px)
      `,
            backgroundSize: "20px 30px",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-0 hidden dark:block"
          style={{
            backgroundImage: `
        linear-gradient(to right, #1e293b87 1px, transparent 1px),
        linear-gradient(to bottom, #1e293b87 1px, transparent 1px)
      `,
            backgroundSize: "20px 30px",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          }}
        />
        <HeroSection />
      </div>
    </div>
  );
}
