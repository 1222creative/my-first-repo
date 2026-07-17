import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { palette } from "../constants";
import { sansFont } from "../fonts";

export const Timestamp: React.FC<{ label: string }> = ({ label }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blink = Math.floor(frame / 20) % 2 === 0;

  return (
    <div
      style={{
        position: "absolute",
        left: 48,
        bottom: 48,
        display: "flex",
        alignItems: "center",
        gap: 10,
        opacity,
        fontFamily: sansFont,
        fontSize: 26,
        letterSpacing: 1,
        color: palette.white,
        textShadow: "0 0 12px rgba(191,224,255,0.8)",
      }}
    >
      <div
        style={{
          width: 9,
          height: 9,
          borderRadius: "50%",
          backgroundColor: "#ff5c5c",
          opacity: blink ? 1 : 0.25,
          boxShadow: "0 0 8px #ff5c5c",
        }}
      />
      {label}
    </div>
  );
};
