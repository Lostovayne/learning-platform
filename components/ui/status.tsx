import type { HTMLAttributes, ReactNode } from "react";
import { CircleCheck, LoaderCircle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusVariant =
  | "in-progress"
  | "completed"
  | "now-playing"
  | "locked";

function nowPlayingIcon(): ReactNode {
  return (
    <span className="grid h-4 w-4 place-items-center rounded-full bg-primary-500">
      <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" aria-hidden="true">
        <path d="M3 1.8 8.6 5 3 8.2Z" fill="white" />
      </svg>
    </span>
  );
}

const icons: Record<StatusVariant, ReactNode> = {
  "in-progress": <LoaderCircle className="h-4 w-4 text-primary-600" />,
  completed: <CircleCheck className="h-4 w-4 text-success" strokeWidth={2} />,
  "now-playing": nowPlayingIcon(),
  locked: <Lock className="h-4 w-4 text-neutral-500" />,
};

export interface StatusIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: StatusVariant;
}

export function StatusIndicator({
  variant = "in-progress",
  className,
  children,
  ...props
}: StatusIndicatorProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap text-body text-neutral-700",
        className,
      )}
      {...props}
    >
      {icons[variant]}
      {children}
    </span>
  );
}
