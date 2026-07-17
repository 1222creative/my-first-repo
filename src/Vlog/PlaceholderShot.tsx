import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { palette } from "./constants";
import { sansFont } from "./fonts";

/**
 * Stand-in for a real video clip. Renders a slowly-drifting abstract
 * gradient (so motion-dependent effects like bloom/chromatic-aberration/
 * freeze-frame still have something to act on) plus a clearly-labeled
 * placeholder tag naming the shot that belongs here.
 *
 * To swap in real footage: drop the file in public/footage/ and replace
 * the <PlaceholderShot> in the scene with
 *   <OffthreadVideo src={staticFile("footage/your-clip.mp4")} />
 */
export const PlaceholderShot: React.FC<{ label: string; seed: string; slowMo?: boolean }> = ({
  label,
  seed,
  slowMo = false,
}) => {
  const frame = useCurrentFrame();
  const t = (slowMo ? frame * 0.4 : frame) + random(seed) * 500;

  const hueA = 205 + 12 * Math.sin(t / 90);
  const hueB = 215 + 16 * Math.cos(t / 130);
  const x = 50 + 22 * Math.sin(t / 160);
  const y = 50 + 18 * Math.cos(t / 190);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${x}% ${y}%, hsl(${hueA} 70% 88%) 0%, hsl(${hueB} 55% 62%) 55%, hsl(220 40% 22%) 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          border: `2px dashed rgba(255,255,255,0.35)`,
          margin: 24,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          fontFamily: sansFont,
          color: palette.white,
          textShadow: "0 2px 12px rgba(0,0,0,0.35)",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 3, opacity: 0.85, textTransform: "uppercase" }}>
          footage placeholder
        </div>
        <div style={{ fontSize: 30, marginTop: 6, fontWeight: 700 }}>{label}</div>
      </div>
    </AbsoluteFill>
  );
};
