import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { ClipBeat, secToFrames } from "../edl";
import { PlacedBeat } from "./timeline";

const FOOTAGE_SRC = staticFile("footage/juju-youtube.mp4");

// Dialogue/ambient audio for one clip beat, kept as its own <Audio> so it
// never gets duplicated by the visual effect layers (which may render the
// muted video multiple times for bloom/chromatic-aberration compositing).
export const ClipAudio: React.FC<{ beat: ClipBeat }> = ({ beat }) => {
  if (beat.silent) return null;
  return (
    <Audio
      src={FOOTAGE_SRC}
      trimBefore={secToFrames(beat.srcStart)}
      trimAfter={secToFrames(beat.srcEnd)}
      playbackRate={beat.playbackRate ?? 1}
      volume={0.95}
    />
  );
};

const SFX = {
  shutter: staticFile("audio/sfx_shutter.m4a"),
  click: staticFile("audio/sfx_ui_click.m4a"),
  flash: staticFile("audio/sfx_flash_pop.m4a"),
  whoosh: staticFile("audio/sfx_whoosh.m4a"),
};

// Placeholder-but-real short SFX (synthesized in-sandbox - see project notes)
// cued off the same beats that trigger their matching visual moment.
export const SfxLayer: React.FC<{ placed: PlacedBeat[] }> = ({ placed }) => {
  const cues: { frame: number; src: string; volume: number }[] = [];

  for (const p of placed) {
    if (p.beat.kind === "title") {
      cues.push({ frame: p.startFrame, src: SFX.whoosh, volume: 0.35 });
    } else {
      if (p.beat.flashIn) cues.push({ frame: p.startFrame, src: SFX.flash, volume: 0.5 });
      if (p.beat.freezeTailFrames) {
        cues.push({
          frame: p.startFrame + Math.max(0, p.durationInFrames - p.beat.freezeTailFrames),
          src: SFX.shutter,
          volume: 0.55,
        });
      }
      if (p.beat.oneWord) cues.push({ frame: p.startFrame + 4, src: SFX.click, volume: 0.3 });
    }
  }

  return (
    <>
      {cues.map((c, i) => (
        <Sequence key={i} from={c.frame} durationInFrames={30} layout="none">
          <Audio src={c.src} volume={() => c.volume} />
        </Sequence>
      ))}
    </>
  );
};

// Ambient dreamy/hyperpop placeholder music bed, looped and volume-ducked
// under dialogue-heavy beats so it "sets the mood" rather than competing
// with talking, per the style guide.
export const MusicBed: React.FC<{ placed: PlacedBeat[]; totalFrames: number }> = ({ placed, totalFrames }) => {
  const duckWindows = placed
    .filter((p) => p.beat.kind === "clip" && !(p.beat as ClipBeat).silent)
    .map((p) => ({ start: p.startFrame, end: p.startFrame + p.durationInFrames }));

  const volumeAt = (frame: number) => {
    const ducked = duckWindows.some((w) => frame >= w.start && frame < w.end);
    return ducked ? 0.13 : 0.5;
  };

  const LOOP_SRC = staticFile("audio/placeholder-music-pad.m4a");
  const LOOP_FRAMES = secToFrames(90);
  const loops = Math.ceil(totalFrames / LOOP_FRAMES);

  return (
    <>
      {Array.from({ length: loops }).map((_, i) => (
        <Sequence key={i} from={i * LOOP_FRAMES} durationInFrames={LOOP_FRAMES} layout="none">
          <Audio src={LOOP_SRC} volume={(f) => volumeAt(f + i * LOOP_FRAMES)} />
        </Sequence>
      ))}
    </>
  );
};
