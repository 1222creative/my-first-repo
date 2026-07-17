import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { palette } from "../constants";
import { sansFont } from "../fonts";

export const LocationTag: React.FC<{ label: string; durationInFrames: number }> = ({
  label,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 15, durationInFrames - 15, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const rise = interpolate(frame, [0, 15], [10, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 90,
        width: "100%",
        textAlign: "center",
        opacity,
        transform: `translateY(${rise}px)`,
        fontFamily: sansFont,
        fontSize: 28,
        letterSpacing: 6,
        textTransform: "uppercase",
        color: palette.white,
        textShadow: "0 0 16px rgba(191,224,255,0.7)",
      }}
    >
      — {label} —
    </div>
  );
};
