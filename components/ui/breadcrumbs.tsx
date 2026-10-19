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
                className="h-4 w-4 text-neutral-300"
                aria-hidden="true"
              />
            ) : null}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-neutral-500 transition-colors hover:text-primary-500"
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
