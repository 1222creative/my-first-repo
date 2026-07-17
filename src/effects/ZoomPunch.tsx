import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Quick punch-in zoom at the start of a clip (editorial "snap to attention"),
// settling by `settleFrame`. Also supports a slow continuous Ken-Burns drift
// for b-roll/photo moments via `driftPerSecond`.
export const ZoomPunch: React.FC<{
  children: React.ReactNode;
  startScale?: number;
  settleFrame?: number;
  driftPerSecond?: number;
  fps?: number;
}> = ({ children, startScale = 1.08, settleFrame = 10, driftPerSecond = 0, fps = 30 }) => {
  const frame = useCurrentFrame();
  const punch = interpolate(frame, [0, settleFrame], [startScale, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const drift = 1 + (driftPerSecond * frame) / fps;

  return (
    <AbsoluteFill style={{ transform: `scale(${punch * drift})`, transformOrigin: "center" }}>
      {children}
    </AbsoluteFill>
  );
};
