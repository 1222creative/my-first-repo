import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// Slow-drifting warm glow blob, screen-blended, low opacity. Deterministic
// drift driven by frame + a phase offset so multiple instances don't sync up.
export const LightLeak: React.FC<{ phase?: number; opacity?: number; hue?: "warm" | "blue" }> = ({
  phase = 0,
  opacity = 0.18,
  hue = "warm",
}) => {
  const frame = useCurrentFrame();
  const t = (frame + phase * 137) / 90;
  const x = 50 + 35 * Math.sin(t * 0.6);
  const y = 30 + 25 * Math.cos(t * 0.4);
  const color =
    hue === "warm"
      ? "rgba(255,210,150,0.9)"
      : "rgba(170,200,255,0.9)";

  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "screen" }}>
      <div
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          width: "70%",
          height: "70%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 65%)`,
          opacity,
          filter: "blur(4px)",
        }}
      />
    </AbsoluteFill>
  );
};
