import React from "react";
import { AbsoluteFill } from "remotion";
import { PlaceholderShot } from "../PlaceholderShot";
import { Bloom } from "../effects/Bloom";
import { ChromaticAberration } from "../effects/ChromaticAberration";
import { OneWordOverlay } from "../graphics/OneWordOverlay";
import { BrowserChrome } from "../graphics/BrowserChrome";

/**
 * Stylized "fashion campaign" b-roll: slow motion, glow, subtle chromatic
 * aberration, and an occasional one-word overlay. Let the shot breathe.
 */
export const BRollScene: React.FC<{ label: string; seed: string; word: string }> = ({
  label,
  seed,
  word,
}) => (
  <AbsoluteFill>
    <ChromaticAberration>
      <Bloom strength={0.4}>
        <PlaceholderShot label={label} seed={seed} slowMo />
      </Bloom>
    </ChromaticAberration>
    <BrowserChrome />
    <OneWordOverlay word={word} delay={20} corner="bottom-left" />
  </AbsoluteFill>
);
