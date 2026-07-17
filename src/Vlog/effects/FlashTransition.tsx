import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { palette } from "../constants";

/**
 * A quick white flash-pop cut, like a camera flash firing between shots.
 * Meant to be dropped in a short <Sequence> (6-10 frames) at scene cuts.
 */
export const FlashTransition: React.FC<{ durationInFrames?: number }> = ({
  durationInFrames = 8,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, durationInFrames * 0.35, durationInFrames],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: palette.flash, opacity, pointerEvents: "none" }} />
  );
};
