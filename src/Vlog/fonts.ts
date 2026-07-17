// Font stacks only (no @remotion/google-fonts) so this renders offline with
// zero network dependency - swap these for @remotion/google-fonts or a
// self-hosted woff2 via staticFile() once you have real network access and
// want the exact Bebas Neue / Space Grotesk / Caveat look from the brief.

// Condensed bold display type for big stretched titles / one-word overlays.
export const condensedFont =
	'Impact, Haettenschweiler, "Arial Narrow Bold", "Franklin Gothic Bold", sans-serif';

// Minimal sans for captions, timestamps, location tags, UI-style text.
export const sansFont =
	'"Helvetica Neue", Helvetica, Arial, sans-serif';

// Occasional script accents (diary-style notes, scribbled captions).
export const scriptFont = '"Segoe Script", "Brush Script MT", cursive';
