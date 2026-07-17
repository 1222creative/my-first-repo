import React from "react";
import { AbsoluteFill, Freeze, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { ClipBeat, secToFrames } from "../edl";
import { ChromaticAberration } from "../effects/ChromaticAberration";
import { LightLeak } from "../effects/LightLeak";
import { ZoomPunch } from "../effects/ZoomPunch";
import { FlashTransition } from "../effects/FlashTransition";
import { LocationTag, Timestamp } from "../graphics/Timestamp";
import { WebChrome } from "../graphics/WebChrome";
import { OneWord } from "../graphics/OneWord";

const FOOTAGE_SRC = staticFile("footage/juju-youtube.mp4");

// Renders the VISUAL side only (always muted) of a clip beat - dialogue
// audio for this same time range is rendered separately by ClipAudio so the
// two never risk playing on top of each other.
export const SourceClip: React.FC<{ beat: ClipBeat; durationInFrames: number }> = ({ beat, durationInFrames }) => {
  const frame = useCurrentFrame();
  const trimBefore = secToFrames(beat.srcStart);
  const trimAfter = secToFrames(beat.srcEnd);
  const holdAt = beat.freezeTailFrames ? Math.max(0, durationInFrames - beat.freezeTailFrames - 1) : null;

  let video = (
    <OffthreadVideo
      src={FOOTAGE_SRC}
      muted
      trimBefore={trimBefore}
      trimAfter={trimAfter}
      playbackRate={beat.playbackRate ?? 1}
    />
  );

  if (holdAt !== null) {
    video = <Freeze frame={holdAt} active={(f) => f >= holdAt}>{video}</Freeze>;
  }

  if (beat.zoomPunch) {
    video = <ZoomPunch>{video}</ZoomPunch>;
  }

  if (beat.chromaticAberration) {
    video = <ChromaticAberration>{video}</ChromaticAberration>;
  }

  const isFrozenNow = holdAt !== null && frame >= holdAt;

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {video}
      {beat.lightLeak ? <LightLeak hue={beat.lightLeak} phase={beat.srcStart} /> : null}
      {isFrozenNow ? (
        // "Photo" treatment for the frozen tail: soft white frame + gentle
        // in-camera-roll feel instead of just a static freeze.
        <AbsoluteFill
          style={{
            boxShadow: "inset 0 0 0 14px rgba(247,249,255,0.85)",
            pointerEvents: "none",
          }}
        />
      ) : null}
      {beat.flashIn ? <FlashTransition durationInFrames={Math.min(8, durationInFrames)} /> : null}
      {beat.chapterLabel ? <LocationTag label={beat.chapterLabel} /> : null}
      {beat.timeLabel ? <Timestamp label={beat.timeLabel} /> : null}
      {beat.webChrome ? <WebChrome url={beat.webChrome} /> : null}
      {beat.oneWord ? <OneWord word={beat.oneWord.word} variant={beat.oneWord.variant} /> : null}
    </AbsoluteFill>
  );
};
