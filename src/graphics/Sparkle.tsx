import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { palette } from "./palette";

const StarShape: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block" }}>
    <path
      d="M12 0 L14.2 9.2 L24 12 L14.2 14.8 L12 24 L9.8 14.8 L0 12 L9.8 9.2 Z"
      fill={color}
    />
  </svg>
);

// A single twinkling 4-point star/sparkle, MySpace-glitter styled. Pass
// `delay` (frames) to desync multiple sparkles scattered across a frame.
export const Sparkle: React.FC<{
  x: number;
  y: number;
  size?: number;
  delay?: number;
  color?: string;
}> = ({ x, y, size = 28, delay = 0, color = palette.white }) => {
  const frame = useCurrentFrame() - delay;
  const cycle = 46;
  const local = ((frame % cycle) + cycle) % cycle;
  const scale = interpolate(local, [0, 10, 22, 34, cycle], [0, 1, 0.75, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rotate = interpolate(frame, [0, 300], [0, 90], { extrapolateRight: "extend" });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`,
        filter: `drop-shadow(0 0 6px ${color})`,
      }}
    >
      <StarShape size={size} color={color} />
    </div>
  );
};
