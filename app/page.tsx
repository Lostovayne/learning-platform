import { ArrowRight, Search, Star } from "lucide-react";
import { CourseCardVertical } from "@/components/cards/course-card-vertical";
import { DockerWhale } from "@/components/icons/docker-whale";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";

/**
 * Decorative strip of blurred gradient bars at the end of the page, matching
 * the reference footer silhouette. Purely visual; positions measured from the
 * reference (percentages of the full-bleed strip, heights anchored to bottom).
 */
const footerBars = [
  { left: "2.5%", width: 44, height: 64, opacity: 0.8 },
  { left: "8%", width: 48, height: 96, opacity: 0.9 },
  { left: "14%", width: 46, height: 98, opacity: 0.85 },
  { left: "20%", width: 52, height: 146, opacity: 1 },
  { left: "26%", width: 48, height: 100, opacity: 0.9 },
  { left: "32%", width: 44, height: 94, opacity: 0.85 },
  { left: "38%", width: 40, height: 60, opacity: 0.75 },
  { left: "46%", width: 38, height: 40, opacity: 0.8 },
  { left: "51%", width: 40, height: 48, opacity: 0.85 },
  { left: "56%", width: 36, height: 34, opacity: 0.75 },
  { left: "63%", width: 40, height: 56, opacity: 0.8 },
  { left: "68%", width: 44, height: 96, opacity: 0.9 },
  { left: "73.5%", width: 52, height: 150, opacity: 1 },
  { left: "80%", width: 44, height: 98, opacity: 0.9 },
  { left: "85%", width: 42, height: 96, opacity: 0.85 },
  { left: "89.5%", width: 52, height: 150, opacity: 1 },
  { left: "95%", width: 40, height: 104, opacity: 0.9 },
] as const;

function FooterBars() {
  return (
    <div
      aria-hidden="true"
      className="relative mt-[54px] h-[166px] w-full overflow-hidden px-[30px]"
    >
      {footerBars.map((bar, index) => (
        <div
          key={index}
          className="absolute bottom-0 blur-[8px]"
          style={{
            left: bar.left,
            width: bar.width,
            height: bar.height,
            opacity: bar.opacity,
            background:
              "linear-gradient(to bottom, rgba(251,178,148,0) 0%, rgba(250,170,134,0.6) 12%, #FDAE92 30%, #FBD8CB 100%)",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Next.js glyph on the black tile — the official nextjs.org icon.svg asset:
 * left bar fused with the fading diagonal (white → transparent toward its
 * bottom-right tip) and the right bar fading downward, with the brand gradients.
 */
function NextLogoTile() {
  return (
    <span className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-[18px] bg-black md:h-16 md:w-16 md:rounded-2xl lg:h-[67px] lg:w-[67px] lg:rounded-[18px]">
      <svg
        viewBox="0 0 180 180"
        className="h-16 w-16 md:h-14 md:w-14 lg:h-[59px] lg:w-[59px]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="nextjs-n-diagonal"
            x1="109"
            y1="116.5"
            x2="144.5"
            y2="160.5"
          >
            <stop stopColor="#ffffff" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="nextjs-n-bar"
            x1="121"
            y1="54"
            x2="120.799"
            y2="106.875"
          >
            <stop stopColor="#ffffff" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill="url(#nextjs-n-diagonal)"
        />
        <rect width="12" height="72" x="115" y="54" fill="url(#nextjs-n-bar)" />
      </svg>
    </span>
  );
}

function DockerLogoTile() {
  return (
    <span className="grid h-[72px] w-[72px] shrink-0 place-items-center md:h-16 md:w-16 lg:h-[67px] lg:w-[67px]">
      <DockerWhale className="h-[64px] w-auto max-w-none md:h-14 lg:h-[59px]" />
    </span>
  );
}

function TypeScriptLogoTile() {
  return (
    <span className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-[18px] bg-[#3178C6] md:h-16 md:w-16 md:rounded-2xl lg:h-[67px] lg:w-[67px] lg:rounded-[18px]">
      <svg viewBox="0 0 72 72" className="h-full w-full" aria-hidden="true">
        <text
          x="36"
          y="49"
          textAnchor="middle"
          fontFamily="var(--font-sans, 'Inter', sans-serif)"
          fontSize="30"
          fontWeight="700"
          fill="#ffffff"
        >
          TS
        </text>
      </svg>
    </span>
  );
}

const courses = [
  {
    icon: <NextLogoTile />,
    title: "Next.js for Production",
    description:
      "Build scalable, high-performance web applications with Next.js.",
    level: "Intermediate",
    duration: "18h 24m",
    modules: "12 modules",
  },
  {
    icon: <DockerLogoTile />,
    title: "Docker Essentials",
    description:
      "Containerize applications and streamline your development workflow.",
    level: "Beginner",
    duration: "10h 12m",
    modules: "8 modules",
  },
  {
    icon: <TypeScriptLogoTile />,
    title: "TypeScript Deep Dive",
    description: "Go beyond the basics and write safer, more expressive code.",
    level: "Intermediate",
    duration: "14h 36m",
    modules: "10 modules",
  },
] as const;

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-panel-border bg-canvas">
          <div className="mx-auto w-full max-w-[1024px] px-8 pb-12 pt-14 text-center md:px-20 md:pb-[53px] md:pt-[68px]">
            <div className="flex justify-center">
              <span className="inline-flex items-center rounded-[10px] border border-panel-border bg-white px-6 py-[10px] text-[12px] font-semibold tracking-[0.15em] text-primary-600">
                INTELLIGENT LEARNING
              </span>
            </div>
            <h1 className="mx-auto mt-[22px] font-display text-[32px] font-bold leading-[40px] text-black md:text-[3.5rem] md:leading-[74px]">
              Search your learning
              <br />
              in plain English.
            </h1>
            <p className="mx-auto mt-[21px] max-w-md text-[17px] leading-[28px] text-neutral-700 md:text-[20px] md:leading-[33px]">
              Vertex understands what you want to learn and finds the exact
              lessons across all your courses.
            </p>
            <div className="mt-7 flex justify-center md:mt-10">
              <Button className="h-12 rounded-md bg-[#E46C46] px-6 text-lg text-white hover:bg-[#d05d3a] md:h-[58px] md:px-8">
                Explore Courses
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
            <div className="relative mx-auto mt-8 max-w-[748px] md:mt-11">
              <Search
                className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground md:left-6 md:h-6 md:w-6"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Ask anything about your learning..."
                className="h-14 w-full rounded-[16px] border border-panel-border bg-white pl-[48px] pr-4 text-[13px] text-neutral-700 placeholder:text-neutral-500 focus:border-primary-400 focus:outline-none md:h-[76px] md:rounded-[20px] md:pl-[68px] md:pr-[110px] md:text-lg"
              />
              <kbd className="pointer-events-none absolute right-7 top-1/2 hidden h-[42px] -translate-y-1/2 items-center rounded-[8px] border border-panel-border bg-white px-4 text-[12px] text-neutral-700 md:flex">
                ⌘ K
              </kbd>
            </div>
          </div>
        </section>
        <section className="bg-canvas">
          <div className="mx-auto w-full max-w-[1024px] px-8 pt-[52px] md:px-20">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[22px] font-bold leading-[28px] text-black md:text-heading-1">
                All Courses
              </h2>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-body-lg font-medium text-primary-600 transition-colors hover:text-primary-500"
              >
                View all courses
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="mt-7 grid grid-cols-1 items-stretch gap-[18px] md:grid-cols-3">
              {courses.map((course) => (
                <CourseCardVertical
                  key={course.title}
                  icon={course.icon}
                  title={course.title}
                  description={course.description}
                  level={course.level}
                  duration={course.duration}
                  modules={course.modules}
                />
              ))}
            </div>
            <div className="mt-16 flex items-center gap-2 text-[14px] leading-[22px] text-foreground md:text-body-lg">
              <span
                className="h-px flex-1 bg-panel-border"
                aria-hidden="true"
              />
              <Star
                className="ml-1 h-5 w-5 shrink-0 text-[#E46C46]"
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="ml-5 md:whitespace-nowrap">
                New courses and lessons added every week.
              </span>
              <span
                className="h-px flex-1 bg-panel-border"
                aria-hidden="true"
              />
            </div>
          </div>
          <FooterBars />
        </section>
      </main>
    </div>
  );
}
