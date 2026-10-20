import type { ReactNode } from "react";
import { BarChart3, Clock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CourseCardVerticalProps {
  icon: ReactNode;
  title: string;
  description: string;
  level: string;
  duration: string;
  modules: string;
  className?: string;
}

export function CourseCardVertical({
  icon,
  title,
  description,
  level,
  duration,
  modules,
  className,
}: CourseCardVerticalProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-[20px] border border-panel-border bg-white p-6",
        className,
      )}
    >
      {icon}
      <h3 className="mt-7 font-display text-[19px] font-bold tracking-tight text-black md:text-heading-2">
        {title}
      </h3>
      <p className="mt-6 text-body-lg leading-[24px] text-neutral-700">
        {description}
      </p>
      <div className="mt-auto pt-[52px]">
        <div className="h-px w-full bg-panel-border" aria-hidden="true" />
        <div className="mt-5 flex items-center justify-between whitespace-nowrap text-[11px] tracking-tight text-neutral-700">
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
            {level}
          </span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {duration}
          </span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            {modules}
          </span>
        </div>
      </div>
    </article>
  );
}
