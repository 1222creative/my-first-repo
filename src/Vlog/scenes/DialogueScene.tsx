import React from "react";
import { AbsoluteFill } from "remotion";
import { PlaceholderShot } from "../PlaceholderShot";
import { Timestamp } from "../graphics/Timestamp";
import { LocationTag } from "../graphics/LocationTag";

/**
 * A natural, "keep it real" conversational moment - deliberately the
 * least stylized scene in the edit. Only a timestamp + location tag,
 * no glow/chroma/one-word graphics piled on top.
 */
export const DialogueScene: React.FC<{
  label: string;
  seed: string;
  location: string;
  timestamp: string;
  durationInFrames: number;
}> = ({ label, seed, location, timestamp, durationInFrames }) => (
  <AbsoluteFill>
    <PlaceholderShot label={label} seed={seed} />
    <Timestamp label={timestamp} />
    <LocationTag label={location} durationInFrames={durationInFrames} />
  </AbsoluteFill>
);
