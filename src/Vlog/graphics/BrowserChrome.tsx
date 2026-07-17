import React from "react";
import { palette } from "../constants";
import { sansFont } from "../fonts";

/**
 * A thin early-internet "website window" frame: corner brackets, a faux
 * title bar with three dots, and a little visitor counter. Very subtle -
 * meant to whisper "web page", not look like a literal browser chrome.
 */
export const BrowserChrome: React.FC<{ visitors?: string }> = ({ visitors = "004,213" }) => {
  const dotStyle: React.CSSProperties = {
    width: 8,
    height: 8,
    borderRadius: "50%",
    border: `1px solid ${palette.silver}`,
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 28,
          right: 28,
          display: "flex",
          alignItems: "center",
          gap: 6,
          opacity: 0.55,
        }}
      >
        <div style={dotStyle} />
        <div style={dotStyle} />
        <div style={dotStyle} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 26,
          right: 30,
          opacity: 0.55,
          fontFamily: sansFont,
          fontSize: 16,
          letterSpacing: 1,
          color: palette.silver,
        }}
      >
        visitors: {visitors}
      </div>
      {/* corner brackets */}
      {[
        { top: 20, left: 20, borderWidth: "2px 0 0 2px" },
        { top: 20, right: 20, borderWidth: "2px 2px 0 0" },
        { bottom: 20, left: 20, borderWidth: "0 0 2px 2px" },
        { bottom: 20, right: 20, borderWidth: "0 2px 2px 0" },
      ].map((corner, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 22,
            height: 22,
            borderColor: palette.silver,
            borderStyle: "solid",
            opacity: 0.4,
            ...corner,
          }}
        />
      ))}
    </>
  );
};
