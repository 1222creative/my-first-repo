import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { antonFont, caveatFont } from "../fonts";
import { palette } from "./palette";

// Big single-word overlay that pops in, holds, pops out. Use sparingly for
// the "screenshot-able" beats. `variant` swaps between the bold condensed
// display face and the script/diary-note face.
export const OneWord: React.FC<{
  word: string;
  variant?: "bold" | "script";
  x?: number;
  y?: number;
  rotate?: number;
  color?: string;
}> = ({ word, variant = "bold", x = 50, y = 78, rotate = -4, color = palette.white }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const pop = spring({ frame, fps, config: { damping: 11, stiffness: 160, mass: 0.5 } });
  const outStart = durationInFrames - 8;
  const outOpacity = interpolate(frame, [outStart, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isScript = variant === "script";

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${pop})`,
        opacity: outOpacity,
        fontFamily: isScript ? caveatFont : antonFont,
        fontSize: isScript ? 92 : 108,
        fontWeight: isScript ? 700 : 400,
        color,
        letterSpacing: isScript ? 0 : 3,
        textShadow: isScript
          ? "0 2px 10px rgba(0,0,0,0.35)"
          : "0 0 18px rgba(255,255,255,0.55), 0 0 40px rgba(120,170,255,0.35)",
        whiteSpace: "nowrap",
      }}
    >
      {word}
    </div>
  );
};
