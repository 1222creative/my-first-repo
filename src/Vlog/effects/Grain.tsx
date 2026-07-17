import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

/**
 * Full-frame animated film grain via an SVG fractal-noise filter. The seed
 * cycles through a fixed window so the filter reads as constantly shifting
 * grain without regenerating a new <filter> definition every single frame.
 */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.16 }) => {
  const frame = useCurrentFrame();
  const seed = frame % 80;

  return (
    <AbsoluteFill style={{ mixBlendMode: "overlay", opacity, pointerEvents: "none" }}>
      <svg width="100%" height="100%">
        <filter id="vlog-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            seed={seed}
            stitchTiles="stitch"
          />
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#vlog-grain)" />
      </svg>
    </AbsoluteFill>
  );
};
