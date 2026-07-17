import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { monoFont } from "../fonts";
import { palette } from "./palette";

// Early-internet browser-chrome strip: traffic-light dots + a fake address
// bar reading like a personal-site URL. Sits along the top edge, meant to be
// layered over full-bleed footage for a few seconds at a time (not constant).
export const WebChrome: React.FC<{ url: string }> = ({ url }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 58,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "0 24px",
        background: "rgba(247,249,255,0.88)",
        borderBottom: `2px solid ${palette.chrome3}`,
        opacity,
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div key={c} style={{ width: 13, height: 13, borderRadius: "50%", background: c }} />
        ))}
      </div>
      <div
        style={{
          flex: 1,
          fontFamily: monoFont,
          fontSize: 18,
          color: palette.black,
          background: "#fff",
          border: `1px solid ${palette.chrome2}`,
          borderRadius: 4,
          padding: "6px 14px",
        }}
      >
        {url}
      </div>
      <div style={{ fontFamily: monoFont, fontSize: 16, color: palette.chrome3 }}>100% ★</div>
    </div>
  );
};

// Bottom "visitor counter" style badge - pure Y2K personal-website nostalgia.
export const VisitorCounter: React.FC<{ count: string }> = ({ count }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        right: 56,
        bottom: 64,
        opacity,
        fontFamily: monoFont,
        fontSize: 20,
        color: "#39ff14",
        background: "#000",
        border: "2px solid #444",
        padding: "6px 12px",
        letterSpacing: 2,
        boxShadow: "0 0 10px rgba(57,255,20,0.5)",
      }}
    >
      VISITORS: {count}
    </div>
  );
};
