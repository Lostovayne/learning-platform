import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  pages: Array<number | "ellipsis">;
  current?: number;
  className?: string;
}

const pageButtonClasses =
  "grid h-10 w-10 place-items-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 md:h-9 md:w-9";

export function Pagination({ pages, current = 1, className }: PaginationProps) {
  return (
    <nav
      aria-label="Pagination"
      className={cn("flex flex-wrap items-center gap-1 text-body", className)}
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={current === 1}
        className={cn(
          pageButtonClasses,
          "text-neutral-500 hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50",
        )}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>
      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="px-1 text-neutral-500"
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
              pageButtonClasses,
              page === current
                ? "border border-primary-600 text-primary-700"
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
        className={cn(
          pageButtonClasses,
          "text-neutral-500 hover:bg-neutral-100",
        )}
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
