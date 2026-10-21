import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LessonCardBase {
  title: string;
  description: string;
  className?: string;
}

export interface VideoLessonCardProps extends LessonCardBase {
  variant: "video";
  lessonNumber: string;
  duration: string;
}

export interface TextLessonCardProps extends LessonCardBase {
  variant: "lesson";
  module: string;
}

export type LessonCardProps = VideoLessonCardProps | TextLessonCardProps;

export function LessonCard(props: LessonCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-md border border-neutral-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md",
        props.className,
      )}
    >
      <div>
        <Badge variant={props.variant === "video" ? "video" : "lesson"}>
          {props.variant === "video" ? "Video" : "Lesson"}
        </Badge>
      </div>
      <h3 className="mt-2.5 text-body font-semibold text-foreground">
        {props.title}
      </h3>
      <p className="mt-1 flex-1 text-small text-neutral-500">
        {props.description}
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 text-small">
        {props.variant === "video" ? (
          <>
            <span className="whitespace-nowrap text-neutral-500">
              {props.lessonNumber} · {props.duration}
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-primary-700">
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary-500">
                <svg
                  viewBox="0 0 10 10"
                  className="h-2.5 w-2.5"
                  aria-hidden="true"
                >
                  <path d="M3 1.8 8.6 5 3 8.2Z" fill="white" />
                </svg>
              </span>
              Watch from <span className="font-semibold">{props.duration}</span>
            </span>
          </>
        ) : (
          <>
            <span className="whitespace-nowrap text-neutral-500">
              {props.module}
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-medium text-primary-700">
              View lesson
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </span>
          </>
        )}
      </div>
    </article>
  );
}
