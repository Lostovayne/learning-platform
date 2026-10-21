import type { InputHTMLAttributes } from "react";
import { useId } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  shortcut?: string;
  /**
   * Visible label. Rendered as a real <label> bound to the input so the
   * field has an accessible name; the placeholder stays as the example.
   */
  label?: string;
}

export function SearchInput({
  shortcut = "⌘ K",
  className,
  type = "search",
  label,
  id,
  ...props
}: SearchInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <label
          htmlFor={inputId}
          className="mb-2 block text-small font-medium text-neutral-700"
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
          aria-hidden="true"
        />
        <input
          id={inputId}
          type={type}
          className={cn(
            "h-11 w-full min-w-0 rounded-md border border-neutral-200 bg-white pl-12 pr-16 text-base text-foreground placeholder:text-neutral-500",
            "focus:border-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
            "disabled:opacity-50",
            "sm:text-body",
          )}
          {...props}
        />
        {shortcut ? (
          <kbd className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rounded-xs border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-small text-neutral-500">
            {shortcut}
          </kbd>
        ) : null}
      </div>
    </div>
  );
}
