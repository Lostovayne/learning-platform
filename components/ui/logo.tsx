import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  markClassName?: string;
  titleClassName?: string;
}

/**
 * Vertex mark.
 *
 * A solid terracotta "V": an inverted triangle with a V-notch carved out of
 * it and a narrow slot at the top centre, so the two arms read as separate
 * strokes. Measured off the reference sheet (`design/vertex-home.png`): the
 * outer triangle spans (0,0) - (32,0) - (16,32); the notch opens at y=6.19
 * between x=9.5 and x=22.5 and closes at the point (16,20.13); the slot is
 * 3 units wide (x=14.5 to x=17.5) down to y=4.13, where it chamfers out to
 * the notch. The notch is drawn as a second subpath with `fill-rule:
 * evenodd` so it punches through the triangle.
 */
export function Logo({ className, markClassName, titleClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className={cn("h-7 w-7", markClassName)}
      >
        <defs>
          <linearGradient id="vertex-mark-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-primary-500)" />
            <stop offset="100%" stopColor="var(--color-primary-600)" />
          </linearGradient>
        </defs>
        <path
          d="M0 0H32L16 32Z M14.5 0H17.5V4.13L22.5 6.19L16 20.13L9.5 6.19L14.5 4.13Z"
          fill="url(#vertex-mark-gradient)"
          fillRule="evenodd"
        />
      </svg>
      <span
        className={cn(
          "text-heading-3 font-semibold text-foreground",
          titleClassName,
        )}
      >
        Vertex
      </span>
    </span>
  );
}
