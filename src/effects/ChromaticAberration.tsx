import React from "react";
import { AbsoluteFill } from "remotion";

// Subtle RGB channel split. `strength` in pixels; keep small (1-4) per style guide
// ("slight chromatic aberration", not a heavy glitch effect).
export const ChromaticAberration: React.FC<{ children: React.ReactNode; strength?: number }> = ({
  children,
  strength = 2,
}) => {
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ mixBlendMode: "screen", transform: `translateX(-${strength}px)`, filter: "url(#chanRed)" }}>
        {children}
      </AbsoluteFill>
      <AbsoluteFill style={{ mixBlendMode: "screen", filter: "url(#chanGreen)" }}>{children}</AbsoluteFill>
      <AbsoluteFill style={{ mixBlendMode: "screen", transform: `translateX(${strength}px)`, filter: "url(#chanBlue)" }}>
        {children}
      </AbsoluteFill>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <filter id="chanRed">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
          </filter>
          <filter id="chanGreen">
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" />
          </filter>
          <filter id="chanBlue">
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          </filter>
        </defs>
      </svg>
    </AbsoluteFill>
  );
};
