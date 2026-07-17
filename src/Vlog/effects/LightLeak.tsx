import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

/**
 * A soft diagonal light-leak sweep across the frame. Meant to be used
 * occasionally (once every few scenes), not on every shot. `durationInFrames`
 * should match the local <Sequence> this is rendered inside of.
 */
export const LightLeak: React.FC<{ durationInFrames: number; opacity?: number }> = ({
  durationInFrames: length,
  opacity = 0.22,
}) => {
  const frame = useCurrentFrame();

  const position = interpolate(frame, [0, length], [-30, 130], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fade = interpolate(
    frame,
    [0, length * 0.2, length * 0.8, length],
    [0, opacity, opacity, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        mixBlendMode: "screen",
        opacity: fade,
        pointerEvents: "none",
        background: `linear-gradient(115deg, transparent ${position - 25}%, rgba(255,255,255,0.9) ${position}%, rgba(191,224,255,0.6) ${position + 8}%, transparent ${position + 30}%)`,
      }}
    />
  );
};
