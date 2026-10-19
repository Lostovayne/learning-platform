import type { ReactNode } from "react";
import {
  Accessibility,
  BarChart3,
  Bell,
  Bookmark,
  CirclePlay,
  ChevronRight,
  Clock,
  ExternalLink,
  Eye,
  FileText,
  LayoutGrid,
  Search,
  Target,
  User,
} from "lucide-react";
import { CourseCard } from "@/components/cards/course-card";
import { LessonCard } from "@/components/cards/lesson-card";
import { ResourceCard } from "@/components/cards/resource-card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button, type ButtonVariant } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { Pagination } from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Select } from "@/components/ui/select";
import { StatusIndicator } from "@/components/ui/status";
import { cn } from "@/lib/utils";

const primaryColors = [
  ["Primary 500", "#F97316"],
  ["Primary 400", "#FB923C"],
  ["Primary 300", "#FDA374"],
  ["Primary 200", "#FED7AA"],
  ["Primary 100", "#FEE9DE"],
] as const;

const neutralColors = [
  ["Neutral 900", "#0F172A"],
  ["Neutral 700", "#334155"],
  ["Neutral 500", "#64748B"],
  ["Neutral 300", "#CBD5E1"],
  ["Neutral 200", "#E2E8F0"],
  ["Neutral 100", "#F1F5F9"],
  ["Neutral 50", "#FAFAFC"],
  ["White", "#FFFFFF"],
] as const;

const typeScale = [
  ["Display 1", "Playfair Display", "48 / 56", "Bold", "Page titles"],
  ["Display 2", "Playfair Display", "36 / 44", "Bold", "Section titles"],
  ["Heading 1", "Inter", "28 / 36", "Semi Bold", "Card titles"],
  ["Heading 2", "Inter", "22 / 30", "Semi Bold", "Sub section"],
  ["Heading 3", "Inter", "18 / 26", "Medium", "Small titles"],
  ["Body Large", "Inter", "16 / 24", "Regular", "Body copy"],
  ["Body", "Inter", "14 / 20", "Regular", "Supporting text"],
  ["Small", "Inter", "12 / 16", "Regular", "Captions, meta"],
] as const;

const spacingScale = [
  { px: 4, rem: "(0.25rem)" },
  { px: 8, rem: "(0.5rem)" },
  { px: 12, rem: "(0.75rem)" },
  { px: 16, rem: "(1rem)" },
  { px: 24, rem: "(1.5rem)" },
  { px: 32, rem: "(2rem)" },
  { px: 40, rem: "(2.5rem)" },
  { px: 48, rem: "(3rem)" },
  { px: 64, rem: "(4rem)" },
] as const;

const radiusScale = [
  { size: "4px", token: "(xs)", radius: "4px" },
  { size: "8px", token: "(sm)", radius: "8px" },
  { size: "12px", token: "(md)", radius: "12px" },
  { size: "16px", token: "(lg)", radius: "16px" },
  { size: "24px", token: "(xl)", radius: "24px" },
  { size: "Full", token: "(circle)", radius: "9999px" },
] as const;

const shadowScale = [
  {
    name: "Sm",
    value: "0 1px 2px 0 rgba(15, 23, 42, 0.05)",
    className: "shadow-sm",
  },
  {
    name: "Md",
    value: "0 4px 12px -2px rgba(15, 23, 42, 0.08)",
    className: "shadow-md",
  },
  {
    name: "Lg",
    value: "0 12px 24px -4px rgba(15, 23, 42, 0.10)",
    className: "shadow-lg",
  },
  {
    name: "Xl",
    value: "0 20px 40px -8px rgba(15, 23, 42, 0.12)",
    className: "shadow-xl",
  },
] as const;

const outlineIcons = [
  Bell,
  Search,
  CirclePlay,
  FileText,
  Bookmark,
  BarChart3,
  Clock,
  User,
  ChevronRight,
];

function CirclePlayChip({ className }: { className?: string }) {
  return (
    <span
      className={cn("grid place-items-center", className)}
      aria-hidden="true"
    >
      <span className="grid h-full w-full place-items-center rounded-full bg-current">
        <span className="ml-px h-0 w-0 border-y-[3px] border-l-4 border-y-transparent border-l-white" />
      </span>
    </span>
  );
}

const filledIcons = outlineIcons.map((Icon, index) =>
  Icon === CirclePlay ? (
    <CirclePlayChip key={index} className="h-5 w-5 text-foreground" />
  ) : (
    <Icon key={index} className="h-5 w-5 fill-current" aria-hidden="true" />
  ),
);

interface ButtonColumn {
  name: string;
  label: string;
  variant: ButtonVariant;
  hoverClass: string;
  icon?: ReactNode;
}

const buttonColumns: readonly ButtonColumn[] = [
  {
    name: "Primary",
    label: "Get Started",
    variant: "primary",
    hoverClass: "bg-primary-600",
  },
  {
    name: "Secondary",
    label: "Explore Courses",
    variant: "secondary",
    hoverClass: "bg-primary-100",
  },
  {
    name: "Tertiary",
    label: "View Lesson",
    variant: "tertiary",
    hoverClass: "bg-neutral-100",
    icon: <ExternalLink className="h-4 w-4" aria-hidden="true" />,
  },
  {
    name: "Text",
    label: "Watch Video",
    variant: "text",
    hoverClass: "bg-primary-100",
    icon: <CirclePlayChip className="h-4 w-4 text-primary-500" />,
  },
] as const;

const buttonStates = ["Default", "Hover", "Disabled"] as const;

const principles = [
  {
    icon: Eye,
    title: "Clarity First",
    description: "Every element should communicate clearly.",
  },
  {
    icon: LayoutGrid,
    title: "Consistency",
    description:
      "Use components and patterns consistently across the platform.",
  },
  {
    icon: Target,
    title: "Focus & Calm",
    description: "Remove noise and help learners focus on what matters.",
  },
  {
    icon: Accessibility,
    title: "Accessible",
    description: "Design with accessibility and inclusivity in mind.",
  },
] as const;

function Panel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-panel-border bg-white p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <p className="text-small font-bold uppercase tracking-wider">
      <span className="text-primary-500">{index}</span>{" "}
      <span className="text-foreground">{title}</span>
    </p>
  );
}

function SubLabel({ children }: { children: ReactNode }) {
  return <p className="text-small text-neutral-700">{children}</p>;
}

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div>
      <div
        className="h-12 w-full rounded-sm border border-black/[0.04]"
        style={{ backgroundColor: hex }}
      />
      <p className="mt-2 text-small text-neutral-700">{name}</p>
      <p className="text-small text-neutral-500">{hex}</p>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <main className="mx-auto max-w-[1440px] p-8">
        <div className="grid grid-cols-12 gap-5">
          <Panel className="col-span-12 flex flex-col bg-header-panel md:col-span-4">
            <Logo />
            <h1 className="mt-8 font-display text-display-1 font-bold text-foreground">
              Design System
            </h1>
            <p className="mt-4 max-w-[280px] text-body-lg text-neutral-500">
              A unified design language for Vertex learning platform. Clean,
              modern and focused on clarity, consistency and intuitive learning.
            </p>
            <p className="mt-auto pt-10 text-small uppercase tracking-widest text-neutral-500">
              Version 1.0 · May 2025
            </p>
          </Panel>

          <Panel className="col-span-12 md:col-span-8">
            <SectionHeader index="01" title="Colors" />
            <div className="mt-5">
              <SubLabel>Primary</SubLabel>
              <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {primaryColors.map(([name, hex]) => (
                  <Swatch key={name} name={name} hex={hex} />
                ))}
              </div>
            </div>
            <div className="mt-6">
              <SubLabel>Neutral</SubLabel>
              <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-8">
                {neutralColors.map(([name, hex]) => (
                  <Swatch key={name} name={name} hex={hex} />
                ))}
              </div>
            </div>
          </Panel>

          <Panel className="col-span-12 md:col-span-5">
            <SectionHeader index="02" title="Typography" />
            <div className="mt-8 space-y-10">
              <div className="flex items-center gap-8">
                <span className="font-display text-[64px] leading-none font-medium text-foreground">
                  Ag
                </span>
                <div>
                  <p className="font-display text-heading-3 font-bold text-foreground">
                    Playfair Display
                  </p>
                  <p className="mt-1.5 text-small text-neutral-500">
                    Elegant <span className="text-primary-500">·</span> Readable{" "}
                    <span className="text-primary-500">·</span> Timeless
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <span className="text-[64px] leading-none font-medium text-foreground">
                  Ag
                </span>
                <div>
                  <p className="text-heading-3 font-semibold text-foreground">
                    Inter
                  </p>
                  <p className="mt-1.5 text-small text-neutral-500">
                    Clean <span className="text-primary-500">·</span> Modern{" "}
                    <span className="text-primary-500">·</span> Highly legible
                  </p>
                </div>
              </div>
            </div>
          </Panel>

          <Panel className="col-span-12 md:col-span-7">
            <SectionHeader index="03" title="Type Scale" />
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left text-body">
                <thead>
                  <tr className="border-b border-neutral-100 text-small text-neutral-500">
                    <th className="py-2 font-normal">Style</th>
                    <th className="py-2 font-normal">Font</th>
                    <th className="py-2 font-normal">Size / Line Height</th>
                    <th className="py-2 font-normal">Weight</th>
                    <th className="py-2 font-normal">Use</th>
                  </tr>
                </thead>
                <tbody>
                  {typeScale.map(([style, font, size, weight, use]) => (
                    <tr
                      key={style}
                      className="border-b border-neutral-50 last:border-0"
                    >
                      <td
                        className={cn(
                          "py-2.5",
                          style.startsWith("Display")
                            ? "font-display font-bold"
                            : "font-semibold",
                        )}
                      >
                        {style}
                      </td>
                      <td className="py-2.5 text-neutral-500">{font}</td>
                      <td className="py-2.5 text-neutral-500">{size}</td>
                      <td className="py-2.5 text-neutral-500">{weight}</td>
                      <td className="py-2.5 text-neutral-500">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel className="col-span-12 md:col-span-6">
            <SectionHeader index="04" title="Spacing System" />
            <p className="mt-4 text-body text-neutral-700">Base unit: 4px</p>
            <div className="mt-6 flex items-end gap-6">
              {spacingScale.map(({ px, rem }) => (
                <div key={px} className="flex flex-col items-center gap-2">
                  <div
                    className="rounded-xs bg-spacing-swatch"
                    style={{ width: px, height: px }}
                  />
                  <div className="text-center">
                    <p className="text-small text-foreground">{px}</p>
                    <p className="text-small text-neutral-500">{rem}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="col-span-12 md:col-span-6">
            <SectionHeader index="05" title="Radius & Shadows" />
            <p className="mt-4 text-body text-neutral-700">Radius</p>
            <div className="mt-4 flex flex-wrap gap-6">
              {radiusScale.map(({ size, token, radius }) => (
                <div key={token} className="text-center">
                  <div
                    className="h-16 w-16 border border-neutral-300 bg-white"
                    style={{ borderRadius: radius }}
                  />
                  <p className="mt-2 text-small text-foreground">{size}</p>
                  <p className="text-small text-neutral-500">{token}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-body text-neutral-700">Shadows</p>
            <div className="mt-4 grid grid-cols-2 gap-5 md:grid-cols-4">
              {shadowScale.map(({ name, value, className }) => (
                <div
                  key={name}
                  className={cn(
                    "rounded-md border border-neutral-100 bg-white p-4",
                    className,
                  )}
                >
                  <p className="text-body font-semibold text-foreground">
                    {name}
                  </p>
                  <p className="mt-1 font-mono text-small text-neutral-500">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="col-span-12 md:col-span-3">
            <SectionHeader index="06" title="Icons" />
            <p className="mt-5 text-small text-neutral-700">Outline Style</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-foreground">
              {outlineIcons.map((Icon, index) => (
                <Icon key={index} className="h-5 w-5" aria-hidden="true" />
              ))}
            </div>
            <p className="mt-6 text-small text-neutral-700">Filled Style</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-foreground">
              {filledIcons}
            </div>
            <p className="mt-6 text-small text-neutral-700">Icon Specs</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-small text-neutral-500 marker:text-neutral-400">
              <li>24x24px grid</li>
              <li>2px stroke width (outline)</li>
              <li>Rounded line caps</li>
              <li>Consistent optical balance</li>
            </ul>
          </Panel>

          <Panel className="col-span-12 md:col-span-6">
            <SectionHeader index="07" title="Buttons" />
            <div className="mt-6 grid grid-cols-[3rem_repeat(4,minmax(0,1fr))] items-center gap-x-3 gap-y-6">
              <span />
              {buttonColumns.map((col) => (
                <p
                  key={col.name}
                  className="text-center text-small text-neutral-700"
                >
                  {col.name}
                </p>
              ))}
              {buttonStates.map((state) => (
                <div key={state} className="contents">
                  <span className="justify-self-start whitespace-nowrap text-small text-neutral-500">
                    {state}
                  </span>
                  {buttonColumns.map((col) => (
                    <div key={col.name} className="flex min-w-0 justify-center">
                      <Button
                        variant={col.variant}
                        size="md"
                        disabled={state === "Disabled"}
                        className={
                          state === "Hover" ? col.hoverClass : undefined
                        }
                      >
                        {col.icon}
                        {col.label}
                      </Button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <ul className="mt-8 list-disc space-y-1 pl-4 text-small text-neutral-500 marker:text-neutral-400">
              <li>Height: 44px (default)</li>
              <li>Padding: 0 16px (lg), 0 12px (md)</li>
              <li>Radius: 12px</li>
              <li>Font: Inter Medium (14-16px)</li>
            </ul>
          </Panel>

          <Panel className="col-span-12 md:col-span-3">
            <SectionHeader index="08" title="Inputs" />
            <p className="mt-5 text-small text-neutral-700">
              Search / Text Input
            </p>
            <SearchInput
              className="mt-3"
              placeholder="Search anything..."
              aria-label="Search anything"
            />
            <p className="mt-6 text-small text-neutral-700">Select</p>
            <Select
              className="mt-3"
              defaultValue="most-relevant"
              ariaLabel="Sort"
              options={[
                { value: "most-relevant", label: "Most Relevant" },
                { value: "newest", label: "Newest" },
                { value: "popular", label: "Most Popular" },
              ]}
            />
            <p className="mt-6 text-small text-neutral-700">Field Specs</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-small text-neutral-500 marker:text-neutral-400">
              <li>Height: 44px</li>
              <li>Radius: 12px</li>
              <li>Border: 1px solid #E2E8F0</li>
              <li>Padding: 0 16px</li>
              <li>Focus: Border color #FB923C</li>
            </ul>
          </Panel>

          <Panel className="col-span-12 md:col-span-4">
            <SectionHeader index="09" title="Badges / Tags" />
            <div className="mt-5 grid grid-cols-3 gap-4">
              <div>
                <SubLabel>Video</SubLabel>
                <Badge variant="video" className="mt-2">
                  Video
                </Badge>
              </div>
              <div>
                <SubLabel>Lesson</SubLabel>
                <Badge variant="lesson" className="mt-2">
                  Lesson
                </Badge>
              </div>
              <div>
                <SubLabel>Popular</SubLabel>
                <Badge variant="popular" className="mt-2">
                  Popular
                </Badge>
              </div>
            </div>
          </Panel>

          <Panel className="col-span-12 md:col-span-4">
            <SectionHeader index="10" title="Status / Indicators" />
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <StatusIndicator variant="in-progress">
                In Progress
              </StatusIndicator>
              <StatusIndicator variant="completed">Completed</StatusIndicator>
              <StatusIndicator variant="now-playing">
                Now Playing
              </StatusIndicator>
              <StatusIndicator variant="locked">Locked</StatusIndicator>
            </div>
          </Panel>

          <Panel className="col-span-12 md:col-span-4">
            <SectionHeader index="11" title="Progress Bar" />
            <div className="mt-5 flex h-9 items-center">
              <Progress value={35} />
            </div>
          </Panel>

          <Panel className="col-span-12">
            <SectionHeader index="12" title="Cards" />
            <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="flex flex-col">
                <SubLabel>Course Card</SubLabel>
                <CourseCard
                  className="mt-2 flex-1"
                  icon={<span className="text-body font-bold">N</span>}
                  title="Next.js for Production"
                  description="Build scalable, high-performance web applications with Next.js."
                  level="Intermediate"
                  duration="18h 24m"
                  modules="12 modules"
                />
              </div>
              <div className="flex flex-col">
                <SubLabel>Lesson Card (Video)</SubLabel>
                <LessonCard
                  className="mt-2 flex-1"
                  variant="video"
                  title="Data Fetching in Server Components"
                  description="Learn how to fetch data on the server using async/await and Next.js best practices."
                  lessonNumber="Lesson 5.1"
                  duration="12:45"
                />
              </div>
              <div className="flex flex-col">
                <SubLabel>Lesson Card (Lesson)</SubLabel>
                <LessonCard
                  className="mt-2 flex-1"
                  variant="lesson"
                  title="Data Fetching & Caching"
                  description="Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance."
                  module="Module 5"
                />
              </div>
              <div className="flex flex-col">
                <SubLabel>Resource Card</SubLabel>
                <ResourceCard
                  className="mt-2 flex-1"
                  title="Caching and Revalidation Guide"
                  description="Deep dive into Next.js caching strategies."
                  meta="PDF · 1.2 MB"
                />
              </div>
            </div>
          </Panel>

          <Panel className="col-span-12 md:col-span-4">
            <SectionHeader index="13" title="Navigation" />
            <div className="mt-5 flex items-center gap-8">
              <Logo />
              <nav className="flex items-center gap-6 text-body">
                <span className="font-semibold text-primary-500">Courses</span>
                <span className="text-foreground">My Learning</span>
              </nav>
            </div>
          </Panel>

          <Panel className="col-span-12 md:col-span-4">
            <SubLabel>Breadcrumbs</SubLabel>
            <Breadcrumbs
              className="mt-4"
              items={[
                { label: "All Courses", href: "#" },
                { label: "Next.js for Production", href: "#" },
                { label: "Data Fetching & Caching" },
              ]}
            />
          </Panel>

          <Panel className="col-span-12 md:col-span-4">
            <SubLabel>Pagination</SubLabel>
            <Pagination
              className="mt-3"
              pages={[1, 2, 3, "ellipsis", 8]}
              current={1}
            />
          </Panel>
        </div>

        <footer className="mt-8 flex flex-col gap-8 pb-4 lg:flex-row lg:items-center">
          <p className="shrink-0 text-small font-bold uppercase tracking-wider text-primary-500">
            14 Principles
          </p>
          <div className="grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-3">
                <Icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-neutral-900"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-body font-semibold text-foreground">
                    {title}
                  </p>
                  <p className="mt-0.5 text-small text-neutral-500">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}
