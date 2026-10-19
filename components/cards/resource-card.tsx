import { ExternalLink, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ResourceCardProps {
  title: string;
  description: string;
  meta: string;
  className?: string;
}

export function ResourceCard({
  title,
  description,
  meta,
  className,
}: ResourceCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-md border border-neutral-200 bg-white p-4 transition-shadow hover:shadow-sm",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-neutral-200 bg-neutral-50 text-neutral-700">
          <FileText className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-body font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-small text-neutral-500">{description}</p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between gap-3 text-small text-neutral-500 [&>*]:whitespace-nowrap">
        <span>{meta}</span>
        <ExternalLink
          className="h-3.5 w-3.5 shrink-0 text-neutral-500"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}
