import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "brand"
  | "secondary"
  | "tertiary"
  | "text";
export type ButtonSize = "lg" | "md" | "hero";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary-600 text-white hover:bg-primary-700",
  brand: "bg-primary-500 text-white hover:bg-primary-600",
  secondary: "border border-primary-600 text-primary-700 hover:bg-primary-100",
  tertiary: "border border-neutral-300 text-neutral-700 hover:bg-neutral-100",
  text: "text-primary-700 hover:bg-primary-100",
};

const sizeClasses: Record<ButtonSize, string> = {
  lg: "h-11 px-4 text-body-lg font-medium",
  md: "h-11 px-3 text-body font-medium",
  hero: "h-12 px-4 text-body-lg font-normal",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "lg",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
        "disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
