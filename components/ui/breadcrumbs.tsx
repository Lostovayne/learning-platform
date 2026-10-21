import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex flex-wrap items-center gap-2 text-body", className)}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="inline-flex items-center gap-2">
            {index > 0 ? (
              <ChevronRight
                className="h-4 w-4 shrink-0 text-neutral-500"
                aria-hidden="true"
              />
            ) : null}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="rounded-xs text-neutral-500 transition-colors hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={isLast ? "text-neutral-900" : "text-neutral-500"}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
