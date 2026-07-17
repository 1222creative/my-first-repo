// Edit decision list for the real source file at /footage/juju-youtube.mp4
// (22:02 raw, 1920x1080/30fps). Every `src` range below is a real timestamp
// in that file - found via ffmpeg scene-detection + audio-energy analysis +
// visual sampling every 10s across the full runtime, not placeholder footage.
//
// In/out points are a first-pass editorial cut, not frame-accurate trims -
// nudge them once you see it playing in Remotion Studio.

export const FPS = 30;
export const secToFrames = (s: number) => Math.round(s * FPS);

export type ClipBeat = {
  kind: "clip";
  id: string;
  srcStart: number; // seconds into the source file
  srcEnd: number;
  playbackRate?: number; // <1 = slow motion (output longer than source range)
  chapterLabel?: string; // location/chapter tag shown for this beat
  timeLabel?: string; // digicam timestamp shown for this beat
  oneWord?: { word: string; variant?: "bold" | "script" };
  freezeTailFrames?: number; // hold last frame as a "photo" moment
  chromaticAberration?: boolean;
  lightLeak?: "warm" | "blue";
  zoomPunch?: boolean;
  flashIn?: boolean;
  webChrome?: string; // fake url shown briefly top of frame
  silent?: boolean; // duck dialogue audio fully, let music lead (pure b-roll)
};

export type TitleBeat = {
  kind: "title";
  id: string;
  durationInFrames: number;
  kicker?: string;
  title: string;
  subtitle?: string;
};

export type Beat = ClipBeat | TitleBeat;

const clip = (b: Omit<ClipBeat, "kind">): ClipBeat => ({ kind: "clip", ...b });
const title = (b: Omit<TitleBeat, "kind">): TitleBeat => ({ kind: "title", ...b });

// ---- Cold-open flash-cut teaser (real snippets, out of order, on purpose) ----
const coldOpen: Beat[] = [
  title({ id: "main-title", durationInFrames: secToFrames(3), kicker: "personal file // juju", title: "JUJU", subtitle: "a digital diary" }),
  clip({ id: "teaser-1", srcStart: 1201, srcEnd: 1202.2, flashIn: true, silent: true }),
  clip({ id: "teaser-2", srcStart: 905.5, srcEnd: 906.7, flashIn: true, silent: true }),
  clip({ id: "teaser-3", srcStart: 1148, srcEnd: 1149.4, flashIn: true, silent: true }),
  clip({ id: "teaser-4", srcStart: 330, srcEnd: 331.4, flashIn: true, silent: true }),
  clip({ id: "teaser-5", srcStart: 500, srcEnd: 501.6, flashIn: true, silent: true, oneWord: { word: "JUJU'S WORLD", variant: "bold" } }),
];

// ---- Chapter 1: pulling up (car hook) ----
const ch1: Beat[] = [
  clip({ id: "c1-1", srcStart: 13, srcEnd: 20, chapterLabel: "LOS ANGELES, CA", timeLabel: "10:42 AM", webChrome: "myscene.com/juju/today" }),
  clip({ id: "c1-2", srcStart: 39, srcEnd: 46 }),
  clip({ id: "c1-3", srcStart: 48, srcEnd: 56, oneWord: { word: "we're here", variant: "script" } }),
];

// ---- Chapter 2: try-on (fitting room continuous take) ----
const ch2: Beat[] = [
  title({ id: "t-tryon", durationInFrames: secToFrames(3), kicker: "fitting room", title: "TRY-ON" }),
  clip({ id: "c2-1", srcStart: 70, srcEnd: 76, zoomPunch: true }),
  clip({ id: "c2-2", srcStart: 108, srcEnd: 113, zoomPunch: true }),
  clip({ id: "c2-3", srcStart: 142.5, srcEnd: 147.5, zoomPunch: true, oneWord: { word: "SERVE", variant: "bold" } }),
  clip({ id: "c2-4", srcStart: 175, srcEnd: 180, zoomPunch: true }),
  clip({ id: "c2-5", srcStart: 205, srcEnd: 210, zoomPunch: true }),
  clip({ id: "c2-6", srcStart: 235, srcEnd: 241, zoomPunch: true }),
  clip({ id: "c2-7", srcStart: 270, srcEnd: 274, freezeTailFrames: secToFrames(2), chromaticAberration: true }),
];

// ---- Chapter 3: the drive (natural conversation, let it breathe) ----
const ch3: Beat[] = [
  clip({ id: "c3-1", srcStart: 300, srcEnd: 321, chapterLabel: "IN TRANSIT", lightLeak: "blue" }),
  clip({ id: "c3-2", srcStart: 360, srcEnd: 383 }),
  clip({ id: "c3-3", srcStart: 440, srcEnd: 463, oneWord: { word: "same energy", variant: "script" } }),
];

// ---- Chapter 4: the haul (unboxing continuous take) ----
const ch4: Beat[] = [
  title({ id: "t-haul", durationInFrames: secToFrames(3), kicker: "unboxing", title: "THE HAUL" }),
  clip({ id: "c4-1", srcStart: 490, srcEnd: 496, zoomPunch: true }),
  clip({ id: "c4-2", srcStart: 540, srcEnd: 546, zoomPunch: true, oneWord: { word: "NEED THIS", variant: "bold" } }),
  clip({ id: "c4-3", srcStart: 600, srcEnd: 607, zoomPunch: true }),
  clip({ id: "c4-4", srcStart: 660, srcEnd: 666, zoomPunch: true }),
  clip({ id: "c4-5", srcStart: 720, srcEnd: 727, zoomPunch: true }),
  clip({ id: "c4-6", srcStart: 800, srcEnd: 807, zoomPunch: true }),
  clip({ id: "c4-7", srcStart: 820, srcEnd: 827, zoomPunch: true }),
];

// ---- Chapter 5: fit-check pt. 2 + drive again ----
const ch5: Beat[] = [
  clip({ id: "c5-1", srcStart: 856, srcEnd: 862, freezeTailFrames: secToFrames(2), chapterLabel: "back at it" }),
  clip({ id: "c5-2", srcStart: 905, srcEnd: 912 }),
  clip({ id: "c5-3", srcStart: 925, srcEnd: 936 }),
];

// ---- Chapter 6: downtown (friend hangout / shopping / coffee - richest b-roll) ----
const ch6: Beat[] = [
  title({ id: "t-downtown", durationInFrames: secToFrames(3), kicker: "later that day", title: "DOWNTOWN" }),
  clip({ id: "c6-1", srcStart: 960, srcEnd: 966, chapterLabel: "DOWNTOWN LA" }),
  clip({ id: "c6-2", srcStart: 1010, srcEnd: 1016, playbackRate: 0.6, zoomPunch: true }),
  clip({ id: "c6-3", srcStart: 1040, srcEnd: 1046 }),
  clip({ id: "c6-4", srcStart: 1075, srcEnd: 1081, zoomPunch: true }),
  clip({ id: "c6-5", srcStart: 1100, srcEnd: 1106, playbackRate: 0.7 }),
  clip({ id: "c6-6", srcStart: 1120, srcEnd: 1126, zoomPunch: true }),
  clip({ id: "c6-7", srcStart: 1146, srcEnd: 1154, oneWord: { word: "besties", variant: "script" } }),
  clip({ id: "c6-8", srcStart: 1165, srcEnd: 1172 }),
];

// ---- Chapter 7: outro (closing talking segment) ----
const ch7: Beat[] = [
  clip({ id: "c7-1", srcStart: 1200, srcEnd: 1206, playbackRate: 0.7, freezeTailFrames: secToFrames(2) }),
  clip({ id: "c7-2", srcStart: 1235, srcEnd: 1255 }),
  clip({ id: "c7-3", srcStart: 1290, srcEnd: 1310 }),
];

const outro: Beat[] = [
  title({ id: "t-outro", durationInFrames: secToFrames(5), kicker: "xo", title: "thanks for\nstopping by", subtitle: "see you next time" }),
];

export const edl: Beat[] = [...coldOpen, ...ch1, ...ch2, ...ch3, ...ch4, ...ch5, ...ch6, ...ch7, ...outro];
