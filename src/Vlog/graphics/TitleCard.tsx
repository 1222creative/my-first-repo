import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { chromeGradient, glowFilter, palette } from "../constants";
import { condensedFont, scriptFont, sansFont } from "../fonts";
import { Sparkles } from "./Sparkles";

/**
 * Editorial title card: large stretched chrome-gradient headline, a
 * script-font aside, and a thin tracked subtitle - MySpace-meets-fashion-
 * magazine cover treatment. Used for the intro and outro.
 */
export const TitleCard: React.FC<{
  title: string;
  subtitle: string;
  aside?: string;
  seed: string;
}> = ({ title, subtitle, aside, seed }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ fps, frame, config: { damping: 14, mass: 0.6 } });
  const subtitleOpacity = interpolate(frame, [10, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.ink,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Sparkles seed={seed} count={14} />
      <div style={{ textAlign: "center", transform: `scale(${scale})` }}>
        <div
          style={{
            fontFamily: condensedFont,
            fontSize: 180,
            lineHeight: 0.95,
            letterSpacing: 4,
            transform: "scaleX(1.35)",
            textTransform: "uppercase",
            backgroundImage: chromeGradient,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            WebkitTextStroke: `1.5px ${palette.white}`,
            filter: glowFilter,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 18,
            opacity: subtitleOpacity,
            fontFamily: sansFont,
            fontSize: 30,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: palette.silver,
          }}
        >
          {subtitle}
        </div>
        {aside ? (
          <div
            style={{
              marginTop: 26,
              opacity: subtitleOpacity,
              fontFamily: scriptFont,
              fontSize: 34,
              color: palette.iceBlue,
            }}
          >
            {aside}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
