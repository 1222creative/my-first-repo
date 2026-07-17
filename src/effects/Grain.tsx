import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// Medium-heavy film grain via an animated SVG turbulence filter. The seed is
// derived from the frame number so it's deterministic (required for Remotion
// renders) while still reading as a constantly-shifting grain field.
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.16 }) => {
  const frame = useCurrentFrame();
  const seed = (frame * 7) % 100;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "overlay" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <filter id="grainFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            seed={seed}
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainFilter)" opacity={opacity} />
      </svg>
    </AbsoluteFill>
  );
};
