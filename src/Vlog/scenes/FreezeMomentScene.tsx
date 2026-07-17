import React from "react";
import { AbsoluteFill, Freeze, Sequence } from "remotion";
import { PlaceholderShot } from "../PlaceholderShot";
import { Sparkles } from "../graphics/Sparkles";
import { Scribble } from "../graphics/Scribble";
import { FlashTransition } from "../effects/FlashTransition";

/**
 * The "memorable, screenshot-able" moment: motion plays for a bit, then
 * freezes on frame `freezeAt`, and the frozen beat gets a sparkle burst +
 * a hand-drawn scribble annotation - the kind of frame someone would clip.
 */
export const FreezeMomentScene: React.FC<{
  label: string;
  seed: string;
  freezeAt: number;
  durationInFrames: number;
}> = ({ label, seed, freezeAt, durationInFrames }) => (
  <AbsoluteFill>
    <Sequence durationInFrames={freezeAt}>
      <PlaceholderShot label={label} seed={seed} />
    </Sequence>
    <Sequence from={freezeAt} durationInFrames={durationInFrames - freezeAt}>
      <Freeze frame={0}>
        <PlaceholderShot label={label} seed={seed} />
      </Freeze>
      <Sparkles seed={`${seed}-freeze`} count={16} />
      <Scribble x={1180} y={520} />
    </Sequence>
    <Sequence from={Math.max(0, freezeAt - 3)} durationInFrames={6}>
      <FlashTransition durationInFrames={6} />
    </Sequence>
  </AbsoluteFill>
);
