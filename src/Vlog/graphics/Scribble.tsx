import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { palette } from "../constants";

/**
 * A hand-drawn circle scribble that "draws on" over the first ~20 frames,
 * like a diary annotation highlighting part of the frame.
 */
export const Scribble: React.FC<{
  x: number;
  y: number;
  size?: number;
  delay?: number;
}> = ({ x, y, size = 220, delay = 0 }) => {
  const frame = useCurrentFrame() - delay;
  const pathLength = 400;
  const progress = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      style={{ position: "absolute", left: x, top: y, overflow: "visible" }}
      width={size}
      height={size}
      viewBox="0 0 200 200"
    >
      <path
        d="M 100 20 C 150 20 180 55 178 100 C 176 150 140 180 95 178 C 45 176 18 145 22 98 C 25 55 55 18 100 20"
        fill="none"
        stroke={palette.white}
        strokeWidth={5}
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 6px ${palette.iceBlue})` }}
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength * (1 - progress)}
      />
    </svg>
  );
};
