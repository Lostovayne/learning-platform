import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "video" | "lesson" | "popular";

const variantClasses: Record<BadgeVariant, string> = {
  video: "bg-primary-100 text-primary-700",
  lesson: "bg-lesson-background text-lesson",
  popular: "bg-primary-100 text-primary-700",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = "video", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs px-2 py-0.5 text-small font-semibold uppercase tracking-wide",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
