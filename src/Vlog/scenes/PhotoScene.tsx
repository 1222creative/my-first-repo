import React from "react";
import { AbsoluteFill } from "remotion";
import { PhotoMoment } from "../PhotoMoment";
import { Sparkles } from "../graphics/Sparkles";

export const PhotoScene: React.FC<{ label: string; seed: string; durationInFrames: number }> = ({
  label,
  seed,
  durationInFrames,
}) => (
  <AbsoluteFill>
    <PhotoMoment label={label} seed={seed} durationInFrames={durationInFrames} />
    <Sparkles seed={seed} count={6} />
  </AbsoluteFill>
);
