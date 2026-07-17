import React from "react";
import { useCurrentFrame } from "remotion";

let filterId = 0;

/**
 * Subtle RGB channel split via an SVG filter (feOffset + feColorMatrix +
 * feBlend), with a gentle sine wiggle so the offset isn't perfectly static.
 * Kept small (1-3px) per the style guide: subtle, not a heavy VHS look.
 */
export const ChromaticAberration: React.FC<{
  children: React.ReactNode;
  maxOffset?: number;
}> = ({ children, maxOffset = 2.2 }) => {
  const frame = useCurrentFrame();
  const [id] = React.useState(() => `vlog-chroma-${filterId++}`);
  const offset = maxOffset * (0.6 + 0.4 * Math.sin(frame / 14));

  return (
    <div style={{ width: "100%", height: "100%", filter: `url(#${id})` }}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id={id} colorInterpolationFilters="sRGB">
          <feOffset in="SourceGraphic" dx={-offset} dy="0" result="left" />
          <feColorMatrix
            in="left"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="redOnly"
          />
          <feOffset in="SourceGraphic" dx={offset} dy="0" result="right" />
          <feColorMatrix
            in="right"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            result="blueOnly"
          />
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="greenOnly"
          />
          <feBlend in="redOnly" in2="greenOnly" mode="screen" result="rg" />
          <feBlend in="rg" in2="blueOnly" mode="screen" />
        </filter>
      </svg>
      {children}
    </div>
  );
};
