import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { antonFont, monoFont } from "../fonts";
import { chromeTextGradient, palette } from "./palette";
import { Sparkle } from "./Sparkle";
import { ScribbleUnderline } from "./Scribble";

// Full-bleed editorial title card: large stretched chrome typography, a
// website-y monospace kicker line, corner sparkles. Used for the cold open
// and as full-screen chapter breaks (a beat off the footage, not over it).
export const TitleCard: React.FC<{
  kicker?: string;
  title: string;
  subtitle?: string;
  background?: string;
}> = ({ kicker, title, subtitle, background = palette.black }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 14, mass: 0.6 }, durationInFrames: 18 });
  const stretchX = interpolate(enter, [0, 1], [1.5, 1]);
  const opacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  const kickerOpacity = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background, alignItems: "center", justifyContent: "center" }}>
      <Sparkle x={140} y={130} delay={0} />
      <Sparkle x={1780} y={160} delay={12} size={20} />
      <Sparkle x={200} y={880} delay={24} size={18} />
      <Sparkle x={1760} y={900} delay={6} />

      {kicker ? (
        <div
          style={{
            position: "absolute",
            top: "30%",
            fontFamily: monoFont,
            fontSize: 26,
            letterSpacing: 6,
            color: palette.accentBlue,
            opacity: kickerOpacity,
            textTransform: "uppercase",
          }}
        >
          {`// ${kicker}`}
        </div>
      ) : null}

      <div
        style={{
          fontFamily: antonFont,
          fontSize: title.length > 8 ? 90 : 150,
          lineHeight: 1.05,
          textAlign: "center",
          color: palette.white,
          backgroundImage: chromeTextGradient,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          transform: `scaleX(${stretchX})`,
          opacity,
          letterSpacing: 2,
          padding: "0 40px",
          whiteSpace: "pre-line",
          filter: `drop-shadow(0 0 30px rgba(180,210,255,0.35))`,
        }}
      >
        {title}
      </div>

      {subtitle ? (
        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", alignItems: "center", opacity: kickerOpacity }}>
          <div
            style={{
              fontFamily: monoFont,
              fontSize: 22,
              color: palette.silver,
              letterSpacing: 3,
            }}
          >
            {subtitle}
          </div>
          <ScribbleUnderline startFrame={18} width={220} color={palette.accent} />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
