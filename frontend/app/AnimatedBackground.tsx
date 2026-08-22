"use client";

import { useEffect, useState } from "react";

type Particle = {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
};

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 35 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 8 + 8,
    }));

    setParticles(generatedParticles);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large scientific glow */}
      <div className="absolute left-1/2 top-[-200px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/[0.08] blur-[140px]" />

      <div className="absolute right-[-200px] top-[20%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.06] blur-[120px]" />

      <div className="absolute bottom-[-250px] left-[-150px] h-[500px] w-[500px] rounded-full bg-teal-500/[0.05] blur-[120px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.15) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />

      {/* Floating particles */}
      {particles.map((particle, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-cyan-300/50 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `biosage-float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
          }}
        />
      ))}

      {/* Molecular nodes */}
      <div className="absolute left-[8%] top-[25%] hidden h-32 w-32 opacity-30 md:block">
        <div className="absolute left-2 top-12 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
        <div className="absolute right-3 top-2 h-2.5 w-2.5 rounded-full bg-cyan-400" />
        <div className="absolute bottom-3 left-14 h-2.5 w-2.5 rounded-full bg-blue-400" />

        <div className="absolute left-4 top-[54px] h-px w-24 rotate-[-24deg] bg-cyan-400/40" />
        <div className="absolute left-16 top-8 h-px w-20 rotate-[65deg] bg-cyan-400/40" />
        <div className="absolute left-16 top-[57px] h-px w-16 rotate-[135deg] bg-blue-400/40" />
      </div>

      <div className="absolute bottom-[18%] right-[8%] hidden h-36 w-36 opacity-25 md:block">
        <div className="absolute left-3 top-10 h-3 w-3 rounded-full bg-blue-300 shadow-[0_0_18px_rgba(96,165,250,0.8)]" />
        <div className="absolute right-4 top-2 h-2.5 w-2.5 rounded-full bg-cyan-300" />
        <div className="absolute bottom-5 left-16 h-3 w-3 rounded-full bg-teal-300" />

        <div className="absolute left-5 top-[47px] h-px w-24 rotate-[-20deg] bg-cyan-400/40" />
        <div className="absolute left-20 top-6 h-px w-20 rotate-[65deg] bg-cyan-400/40" />
        <div className="absolute left-20 top-[62px] h-px w-14 rotate-[125deg] bg-blue-400/40" />
      </div>

      {/* Soft scan line */}
      <div className="absolute left-0 right-0 top-1/3 h-px bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent" />
    </div>
  );
}