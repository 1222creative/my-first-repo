// Shared design tokens for the "cyber diary" vlog edit: bright cool-toned
// digital-camera palette, chrome gradient for stretched Y2K type, and the
// shared frame/fps the whole timeline is built against.

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const palette = {
	white: "#ffffff",
	offWhite: "#f2f5fa",
	ink: "#0d1220",
	silver: "#c9d6e8",
	silverDark: "#8fa2bd",
	iceBlue: "#bfe0ff",
	skyBlue: "#7fb3ff",
	flash: "#ffffff",
};

export const chromeGradient =
	"linear-gradient(180deg, #ffffff 0%, #cdd9ea 35%, #8fa2bd 55%, #ffffff 75%, #b9c6d6 100%)";

export const glowFilter =
	"drop-shadow(0 0 18px rgba(191, 224, 255, 0.55)) drop-shadow(0 0 46px rgba(191, 224, 255, 0.35))";
