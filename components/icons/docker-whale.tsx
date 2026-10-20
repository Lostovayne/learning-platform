/**
 * Docker whale mark reproduced from the official pre-2017 Docker logo
 * (Wikimedia Commons "Docker Logo.svg", the flat whale emblem) enriched with
 * the hand-drawn details of the reference card: dark outlines, container
 * windows, white belly patch, eye and mouth.
 */
export function DockerWhale({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-8 -8 696 544"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      {/* Whale + container boxes silhouette (official flat logo path) */}
      <path
        d="M661.56,218.08c-16.49-11.1-59.81-15.84-91.3-7.35-1.69-31.37-17.88-57.81-47.47-80.88l-10.95-7.35-7.3,11.03c-14.35,21.78-20.4,50.81-18.26,77.2,1.69,16.26,7.34,34.53,18.26,47.79-40.99,23.78-78.78,18.38-246.12,18.38H.06c-.75,37.79,5.32,110.47,51.54,169.64,5.11,6.54,10.7,12.86,16.78,18.95,37.58,37.63,94.36,65.23,179.26,65.3,129.53.12,240.5-69.9,308.01-239.18,22.21.36,80.85,3.98,109.55-51.47.7-.93,7.3-14.7,7.3-14.7l-10.94-7.35ZM168.67,183.53h-72.65v72.65h72.65v-72.65ZM262.52,183.53h-72.65v72.65h72.65v-72.65ZM356.38,183.53h-72.65v72.65h72.65v-72.65ZM450.24,183.53h-72.65v72.65h72.65v-72.65ZM74.81,183.53H2.16v72.65h72.65v-72.65ZM168.67,91.77h-72.65v72.65h72.65v-72.65ZM262.52,91.77h-72.65v72.65h72.65v-72.65ZM356.38,91.77h-72.65v72.65h72.65v-72.65ZM356.38,0h-72.65v72.65h72.65V0Z"
        fill="#2E8FF0"
        stroke="#1E2A4A"
        strokeWidth="8"
        strokeLinejoin="round"
      />
      {/* Container window dots (2x2 white squares per box) */}
      {[
        // Bottom row (y 183.53..256.18)
        { cx: 38.5, cy: 219.9 },
        { cx: 132.3, cy: 219.9 },
        { cx: 226.2, cy: 219.9 },
        { cx: 320, cy: 219.9 },
        { cx: 413.9, cy: 219.9 },
        // Middle row (y 91.77..164.42)
        { cx: 132.3, cy: 128.1 },
        { cx: 226.2, cy: 128.1 },
        { cx: 320, cy: 128.1 },
        // Top row (y 0..72.65)
        { cx: 320, cy: 36.3 },
      ].map((box) => [
        <rect
          key={`${box.cx}-a`}
          x={box.cx - 16}
          y={box.cy - 14}
          width="10"
          height="10"
          fill="#ffffff"
        />,
        <rect
          key={`${box.cx}-b`}
          x={box.cx + 6}
          y={box.cy - 14}
          width="10"
          height="10"
          fill="#ffffff"
        />,
        <rect
          key={`${box.cx}-c`}
          x={box.cx - 16}
          y={box.cy + 4}
          width="10"
          height="10"
          fill="#ffffff"
        />,
        <rect
          key={`${box.cx}-d`}
          x={box.cx + 6}
          y={box.cy + 4}
          width="10"
          height="10"
          fill="#ffffff"
        />,
      ])}
      {/* Belly patch */}
      <path
        d="M48 352 q34 44 96 50 q-10 16 -38 10 q-46 -10 -58 -60 z"
        fill="#ffffff"
      />
      <path
        d="M26 396 q14 12 34 8 q-6 14 -22 12 q-14 -3 -12 -20 z"
        fill="#ffffff"
      />
      {/* Eye */}
      <circle cx="212" cy="272" r="9" fill="#1E2A4A" />
      {/* Mouth */}
      <path
        d="M132 292 l30 6 -12 14 -16 -4 -8 12"
        fill="none"
        stroke="#1E2A4A"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
