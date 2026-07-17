import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { edl } from "./edl";
import { buildTimeline } from "./edit/timeline";
import { SourceClip } from "./edit/SourceClip";
import { ClipAudio, MusicBed, SfxLayer } from "./edit/audio";
import { TitleCard } from "./graphics/TitleCard";
import { Grain } from "./effects/Grain";
import { ColorGrade } from "./effects/ColorGrade";

export const { placed, totalFrames } = buildTimeline(edl);

// Main composition. Visuals and audio are built as two separate sibling
// trees from the same timeline: the visual tree is free to duplicate/filter
// its content for bloom & chromatic-aberration compositing, and the audio
// tree renders each source exactly once, so effects never double up sound.
export const VlogEdit: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <ColorGrade>
        <AbsoluteFill>
          {placed.map(({ beat, startFrame, durationInFrames }) => (
            <Sequence key={beat.id} from={startFrame} durationInFrames={durationInFrames}>
              {beat.kind === "title" ? (
                <TitleCard kicker={beat.kicker} title={beat.title} subtitle={beat.subtitle} />
              ) : (
                <SourceClip beat={beat} durationInFrames={durationInFrames} />
              )}
            </Sequence>
          ))}
        </AbsoluteFill>
      </ColorGrade>

      <Grain opacity={0.15} />

      {placed.map(({ beat, startFrame, durationInFrames }) =>
        beat.kind === "clip" ? (
          <Sequence key={`a-${beat.id}`} from={startFrame} durationInFrames={durationInFrames} layout="none">
            <ClipAudio beat={beat} />
          </Sequence>
        ) : null,
      )}

      <SfxLayer placed={placed} />
      <MusicBed placed={placed} totalFrames={totalFrames} />
    </AbsoluteFill>
  );
};
