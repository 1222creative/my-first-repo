import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { palette } from "./palette";

// Hand-drawn circle scribble, e.g. to loop around a detail in frame.
// Draws itself on with a stroke-dashoffset reveal.
export const ScribbleCircle: React.FC<{
  x: number;
  y: number;
  size?: number;
  color?: string;
  startFrame?: number;
}> = ({ x, y, size = 220, color = palette.accent, startFrame = 0 }) => {
  const frame = useCurrentFrame() - startFrame;
  const progress = interpolate(frame, [0, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const len = 720;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 220 220"
      style={{ position: "absolute", left: x - size / 2, top: y - size / 2, overflow: "visible" }}
    >
      <path
        d="M 40 90 C 20 40, 90 10, 130 15 C 190 22, 210 70, 190 115 C 168 165, 100 205, 55 180 C 15 158, 10 110, 40 90 Z"
        fill="none"
        stroke={color}
        strokeWidth={7}
        strokeLinecap="round"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - progress)}
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  );
};

// Small underline scribble, for emphasis under a word/title.
export const ScribbleUnderline: React.FC<{
  width?: number;
  color?: string;
  startFrame?: number;
}> = ({ width = 260, color = palette.accent, startFrame = 0 }) => {
  const frame = useCurrentFrame() - startFrame;
  const progress = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const len = 320;

  return (
    <svg width={width} height={24} viewBox="0 0 260 24" style={{ overflow: "visible", display: "block" }}>
      <path
        d="M4 14 C 60 4, 120 20, 160 10 C 190 3, 220 16, 254 9"
        fill="none"
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - progress)}
      />
    </svg>
  );
};
