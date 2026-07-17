import React, { useMemo } from "react";
import { random, useCurrentFrame } from "remotion";
import { palette } from "../constants";

const Star: React.FC<{ x: number; y: number; size: number; phase: number }> = ({
  x,
  y,
  size,
  phase,
}) => {
  const frame = useCurrentFrame();
  const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(frame / 18 + phase * Math.PI * 2));

  return (
    <svg
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        opacity: twinkle,
        filter: `drop-shadow(0 0 ${size * 0.6}px ${palette.iceBlue})`,
      }}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path
        d="M12 0 L14.2 9.8 L24 12 L14.2 14.2 L12 24 L9.8 14.2 L0 12 L9.8 9.8 Z"
        fill={palette.white}
      />
    </svg>
  );
};

/**
 * A scattered field of MySpace-era twinkling star sparkles. `seed` keeps
 * positions stable and unique per usage (each scene passes its own).
 */
export const Sparkles: React.FC<{ count?: number; seed: string }> = ({ count = 10, seed }) => {
  const stars = useMemo(
    () =>
      new Array(count).fill(0).map((_, i) => ({
        x: 6 + random(`${seed}-x-${i}`) * 88,
        y: 6 + random(`${seed}-y-${i}`) * 88,
        size: 10 + random(`${seed}-size-${i}`) * 22,
        phase: random(`${seed}-phase-${i}`),
      })),
    [count, seed],
  );

  return (
    <>
      {stars.map((star, i) => (
        <Star key={i} {...star} />
      ))}
    </>
  );
};
