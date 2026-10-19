import type { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  shortcut?: string;
}

export function SearchInput({
  shortcut = "⌘ K",
  className,
  type = "search",
  ...props
}: SearchInputProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
        aria-hidden="true"
      />
      <input
        type={type}
        className="h-11 w-full rounded-md border border-neutral-200 bg-white pl-12 pr-16 text-body text-foreground placeholder:text-neutral-500 focus:border-primary-400 focus:outline-none disabled:opacity-50"
        {...props}
      />
      {shortcut ? (
        <kbd className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rounded-xs border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-small text-neutral-500">
          {shortcut}
        </kbd>
      ) : null}
    </div>
  );
}
