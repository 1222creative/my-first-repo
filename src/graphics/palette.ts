// Shared Cyber McBling / Y2K palette: bright silver-white base, cool blue accents,
// chrome gradient for headline type, one hot accent (magenta/cyber pink) used sparingly.
export const palette = {
  white: "#f7f9ff",
  silver: "#c9d6e8",
  chrome1: "#e8edf7",
  chrome2: "#9fb3d1",
  chrome3: "#5c728f",
  ice: "#bcd9ff",
  black: "#0a0d14",
  accent: "#ff5bb6",
  accentBlue: "#5ec8ff",
} as const;

export const chromeTextGradient = `linear-gradient(180deg, ${palette.white} 0%, ${palette.ice} 35%, ${palette.chrome2} 60%, ${palette.white} 85%)`;
