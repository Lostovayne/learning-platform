import type { ReactNode } from "react";
import { BarChart3, Clock, Folder } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CourseCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  level: string;
  duration: string;
  modules: string;
  className?: string;
}

export function CourseCard({
  icon,
  title,
  description,
  level,
  duration,
  modules,
  className,
}: CourseCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-md border border-neutral-200 bg-white p-4 transition-shadow hover:shadow-sm",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-md bg-neutral-900 text-white">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-body font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-small text-neutral-500">{description}</p>
        </div>
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-small text-neutral-500 [&>*]:whitespace-nowrap">
        <span className="inline-flex items-center gap-1.5">
          <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
          {level}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {duration}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Folder className="h-3.5 w-3.5" aria-hidden="true" />
          {modules}
        </span>
      </div>
    </article>
  );
}
