import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// A quick camera-flash pop used as a hard-cut transition between clips.
// Place at the top of a Sequence spanning the transition; it renders nothing
// visible outside a short peak-then-fade window.
export const FlashTransition: React.FC<{ durationInFrames?: number; peakOpacity?: number }> = ({
  durationInFrames = 8,
  peakOpacity = 0.92,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, durationInFrames * 0.25, durationInFrames],
    [0, peakOpacity, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: "#f5f8ff",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};
