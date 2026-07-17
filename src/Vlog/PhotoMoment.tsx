import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { palette } from "./constants";
import { sansFont } from "./fonts";

/**
 * Stand-in for a still photo mixed into the edit, animated with a gentle
 * Ken Burns pan/zoom instead of being dropped in static - per the style
 * guide's "photos... animated with slight movement" note.
 *
 * To swap in a real photo: replace the placeholder <div> background with
 * <Img src={staticFile("photos/your-photo.jpg")} /> sized to cover.
 */
export const PhotoMoment: React.FC<{ label: string; seed: string; durationInFrames: number }> = ({
  label,
  seed,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const zoom = interpolate(frame, [0, durationInFrames], [1, 1.12]);
  const panX = (random(`${seed}-panx`) - 0.5) * 40;
  const panY = (random(`${seed}-pany`) - 0.5) * 40;
  const x = interpolate(frame, [0, durationInFrames], [0, panX]);
  const y = interpolate(frame, [0, durationInFrames], [0, panY]);

  const fade = interpolate(frame, [0, 10, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const hue = 200 + random(`${seed}-hue`) * 30;

  return (
    <AbsoluteFill style={{ opacity: fade, backgroundColor: palette.ink }}>
      <AbsoluteFill
        style={{
          transform: `scale(${zoom}) translate(${x}px, ${y}px)`,
          background: `linear-gradient(150deg, hsl(${hue} 60% 90%) 0%, hsl(${hue + 15} 45% 55%) 60%, hsl(${hue + 25} 35% 25%) 100%)`,
          boxShadow: "inset 0 0 220px rgba(0,0,0,0.35)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 40,
          bottom: 40,
          fontFamily: sansFont,
          fontSize: 20,
          letterSpacing: 2,
          color: "rgba(255,255,255,0.75)",
          textTransform: "uppercase",
        }}
      >
        photo placeholder — {label}
      </div>
    </AbsoluteFill>
  );
};
