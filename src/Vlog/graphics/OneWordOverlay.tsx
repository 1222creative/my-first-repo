import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { chromeGradient, palette } from "../constants";
import { condensedFont } from "../fonts";

/**
 * A single stretched word that pops in with a quick overshoot, holds, then
 * fades. Used sparingly for the "random one-word overlay" website-diary feel.
 */
export const OneWordOverlay: React.FC<{
  word: string;
  delay?: number;
  holdFrames?: number;
  corner?: "center" | "top-right" | "bottom-left";
}> = ({ word, delay = 0, holdFrames = 26, corner = "center" }) => {
  const frame = useCurrentFrame() - delay;
  const { fps } = useVideoConfig();

  const scale = spring({ fps, frame, config: { damping: 11, mass: 0.5 } });
  const fadeOutStart = holdFrames;
  const opacity =
    frame < fadeOutStart
      ? Math.min(1, Math.max(0, frame / 6))
      : Math.max(0, 1 - (frame - fadeOutStart) / 10);

  const positionStyle: React.CSSProperties =
    corner === "center"
      ? { top: "50%", left: "50%", transform: `translate(-50%, -50%) scale(${scale})` }
      : corner === "top-right"
        ? { top: 90, right: 90, transform: `scale(${scale})`, transformOrigin: "top right" }
        : { bottom: 130, left: 90, transform: `scale(${scale})`, transformOrigin: "bottom left" };

  return (
    <div
      style={{
        position: "absolute",
        opacity,
        ...positionStyle,
      }}
    >
      <div
        style={{
          fontFamily: condensedFont,
          fontSize: 130,
          letterSpacing: 2,
          transform: "scaleX(1.25)",
          textTransform: "uppercase",
          backgroundImage: chromeGradient,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          WebkitTextStroke: `1px ${palette.white}`,
        }}
      >
        {word}
      </div>
    </div>
  );
};
