import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  pages: Array<number | "ellipsis">;
  current?: number;
  className?: string;
}

export function Pagination({ pages, current = 1, className }: PaginationProps) {
  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-1 text-body", className)}
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={current === 1}
        className="grid h-9 w-9 place-items-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>
      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 text-neutral-500"
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            aria-current={page === current ? "page" : undefined}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-md transition-colors",
              page === current
                ? "border border-primary-500 text-primary-500"
                : "text-neutral-700 hover:bg-neutral-100",
            )}
          >
            {page}
          </button>
        ),
      )}
      <button
        type="button"
        aria-label="Next page"
        className="grid h-9 w-9 place-items-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
