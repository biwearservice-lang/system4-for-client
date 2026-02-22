import { useEffect } from "react";
import { MessageSquare } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  const raw = window.location.pathname.replace(/^\/+/, "").split("/")[0];
  const personName = raw
    ? raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase()
    : "Friend";

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    script.onload = () => {
      (window as any).voiceflow?.chat?.load({
        verify: { projectID: "699ab83c49ba085eb4356e70" },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
      });
    };
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  const handleTryItOut = () => {
    (window as any).voiceflow?.chat?.open();
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--gradient-bg)" }}
    >
      {/* 3D Particle Background */}
      <ParticleBackground />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay z-[1]" />

      {/* Glow orbs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-30 z-[1]"
        style={{
          background:
            "radial-gradient(circle, hsl(265 80% 55% / 0.4), transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          <span className="text-foreground">Hey </span>
          <span className="text-gradient">{personName}</span>
          <span className="text-foreground">,</span>
        </h1>

        <p className="text-xl md:text-2xl font-semibold text-foreground/90 mb-8">
          I built a tool that captures leads while you're off the clock.
        </p>

        <div className="bg-secondary/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-10 text-muted-foreground text-base md:text-lg leading-relaxed">
          It's a robot that talks to your customers on your site, answers
          questions instantly, and helps them get exactly what they want while
          you focus on running your business.
        </div>

        <button
          onClick={handleTryItOut}
          className="glow-button inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-lg px-10 py-4 rounded-full mb-4 cursor-pointer"
        >
          Try it out <MessageSquare className="w-5 h-5" />
        </button>

        <p className="text-muted-foreground text-sm">
          A smooth chat will begin in the bottom-right corner
        </p>
      </div>
    </div>
  );
};

export default Index;
