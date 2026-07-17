import React from "react";
import { AbsoluteFill } from "remotion";

/**
 * Cheap full-frame bloom: a brightened, blurred copy of the content
 * screen-blended on top of the original to make overexposed highlights glow.
 */
export const Bloom: React.FC<{ children: React.ReactNode; strength?: number }> = ({
  children,
  strength = 0.45,
}) => {
  return (
    <AbsoluteFill>
      <AbsoluteFill>{children}</AbsoluteFill>
      <AbsoluteFill
        style={{
          mixBlendMode: "screen",
          opacity: strength,
          filter: "brightness(1.7) blur(22px) saturate(1.05)",
          pointerEvents: "none",
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
