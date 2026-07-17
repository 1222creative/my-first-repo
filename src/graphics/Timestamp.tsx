import React from "react";
import { monoFont } from "../fonts";
import { palette } from "./palette";

// Digicam-style timestamp burned into the corner, Y2K point-and-shoot feel.
export const Timestamp: React.FC<{ label: string; corner?: "bl" | "br" }> = ({ label, corner = "br" }) => {
  const pos =
    corner === "br"
      ? { right: 56, bottom: 64 }
      : { left: 56, bottom: 64 };

  return (
    <div
      style={{
        position: "absolute",
        ...pos,
        fontFamily: monoFont,
        fontSize: 30,
        color: "#ffb84d",
        letterSpacing: 2,
        textShadow: "0 0 6px rgba(255,140,0,0.6), 1px 1px 0 rgba(0,0,0,0.4)",
      }}
    >
      {label}
    </div>
  );
};

// Small editorial location tag, fashion-magazine styled.
export const LocationTag: React.FC<{ label: string }> = ({ label }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 56,
        top: 64,
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontFamily: monoFont,
        fontSize: 22,
        letterSpacing: 4,
        color: palette.white,
        textTransform: "uppercase",
        background: "rgba(10,13,20,0.35)",
        padding: "8px 16px",
        border: `1px solid rgba(255,255,255,0.35)`,
        backdropFilter: "blur(2px)",
      }}
    >
      <span style={{ color: palette.accentBlue }}>&#9679;</span>
      {label}
    </div>
  );
};
