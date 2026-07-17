import { Beat, ClipBeat, FPS, secToFrames } from "../edl";

export type PlacedBeat = {
  beat: Beat;
  startFrame: number;
  durationInFrames: number;
};

const beatDuration = (beat: Beat): number => {
  if (beat.kind === "title") return beat.durationInFrames;
  const rate = beat.playbackRate ?? 1;
  return Math.round(secToFrames(beat.srcEnd - beat.srcStart) / rate);
};

export const buildTimeline = (beats: Beat[]): { placed: PlacedBeat[]; totalFrames: number } => {
  let cursor = 0;
  const placed: PlacedBeat[] = beats.map((beat) => {
    const durationInFrames = beatDuration(beat);
    const p = { beat, startFrame: cursor, durationInFrames };
    cursor += durationInFrames;
    return p;
  });
  return { placed, totalFrames: cursor };
};

export const isDialogueClip = (beat: ClipBeat) => !beat.silent;
export const FRAME_RATE = FPS;
