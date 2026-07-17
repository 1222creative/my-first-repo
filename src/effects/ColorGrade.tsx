import React from "react";
import { AbsoluteFill } from "remotion";

/**
 * PLACEHOLDER color treatment (see project notes for what a real grade would replace).
 * Approximates "bright overexposed digital camera, cool silver/blue, glow" using CSS
 * filters + a soft color-tint overlay instead of a proper LUT/scopes-based grade.
 */
export const ColorGrade: React.FC<{ children: React.ReactNode; intensity?: number }> = ({
  children,
  intensity = 1,
}) => {
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          filter: `brightness(${1 + 0.14 * intensity}) contrast(${1 + 0.08 * intensity}) saturate(${1 - 0.12 * intensity}) hue-rotate(${-6 * intensity}deg)`,
        }}
      >
        {children}
      </AbsoluteFill>
      {/* cool silver/blue tint */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(160deg, rgba(180,205,255,0.10) 0%, rgba(200,215,235,0.04) 45%, rgba(150,180,255,0.09) 100%)",
          mixBlendMode: "soft-light",
          pointerEvents: "none",
        }}
      />
      {/* highlight bloom bump: brightened + blurred screen copy, catches only bright areas */}
      <AbsoluteFill
        style={{
          filter: "brightness(1.7) blur(8px)",
          mixBlendMode: "screen",
          opacity: 0.22 * intensity,
          pointerEvents: "none",
        }}
      >
        {children}
      </AbsoluteFill>
      {/* soft vignette to keep focus on center, subtle */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(10,15,30,0.22) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
