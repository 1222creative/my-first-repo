import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadBebas } from "@remotion/google-fonts/BebasNeue";
import { loadFont as loadCaveat } from "@remotion/google-fonts/Caveat";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

// Condensed bold display face for big stretched title-card typography.
export const { fontFamily: antonFont } = loadAnton("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

// Secondary condensed bold, used for shorter tags/labels so not everything reads identical.
export const { fontFamily: bebasFont } = loadBebas("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

// Script accent face for handwritten-feeling captions ("cool older sister" diary notes).
export const { fontFamily: caveatFont } = loadCaveat("normal", {
  weights: ["500", "700"],
  subsets: ["latin"],
});

// Minimal geometric sans for body/UI-style text (timestamps, location tags, website chrome).
export const { fontFamily: spaceGroteskFont } = loadSpaceGrotesk("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});

// Monospace for terminal/website/UI-styled overlays (timestamps, "loading" style text).
export const { fontFamily: monoFont } = loadJetBrainsMono("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
});
