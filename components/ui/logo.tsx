import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  markClassName?: string;
  titleClassName?: string;
}

export function Logo({ className, markClassName, titleClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={cn("h-7 w-7", markClassName)}
      >
        <path
          d="M3.5 4.5 L12 20.5 L20.5 4.5"
          stroke="#f97316"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
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
