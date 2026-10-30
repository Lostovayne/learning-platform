import { ArrowRight, Search, Star } from "lucide-react";
import { CourseCardVertical } from "@/components/cards/course-card-vertical";
import { DockerWhale } from "@/components/icons/docker-whale";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { pageGutter, pageSheet, pageWidth } from "@/lib/layout";

/**
 * Decorative strip of gradient bars at the end of the page. Purely visual.
 *
 * Measured off the reference sheet (`design/vertex-home.png`, 1024px wide).
 * The strip is 183px tall there and holds 14 bars with crisp vertical
 * edges — there is no blur on them. Each bar carries its own vertical
 * gradient: transparent at the top, #FDAE92 at 55% of its height, and a
 * pale salmon again at the bottom edge. Two of them (the pale one at 18%
 * and the last one at 90%) are a lighter layer that fades out at both ends
 * and stops short of the baseline, and a 104px gap splits the strip into
 * two groups.
 *
 * Horizontal geometry is a percentage of the strip, so the bars keep their
 * proportion and can never run past the right edge. Vertical geometry is a
 * percentage of the strip height, which itself scales with the viewport, so
 * the silhouette holds its shape from 320px to ultrawide.
 */
const footerBars = [
  { left: 0, top: 54.3, width: 7.5, height: 45.1 },
  { left: 7.5, top: 36.4, width: 6.1, height: 63.0 },
  { left: 13.6, top: 18.5, width: 4.3, height: 81.0 },
  { left: 17.8, top: 6.5, width: 5.9, height: 80.4, pale: true },
  { left: 23.8, top: 30.4, width: 9.3, height: 69.0 },
  { left: 33.1, top: 50.0, width: 5.3, height: 49.5 },
  { left: 49.2, top: 70.7, width: 2.9, height: 28.8 },
  { left: 52.1, top: 57.6, width: 8.8, height: 41.8 },
  { left: 60.9, top: 40.2, width: 8.2, height: 59.2 },
  { left: 69.1, top: 20.7, width: 5.1, height: 78.8 },
  { left: 74.2, top: 4.3, width: 6.5, height: 95.1 },
  { left: 80.7, top: 51.1, width: 5.2, height: 48.4 },
  { left: 85.9, top: 31.0, width: 3.9, height: 68.5 },
  { left: 89.8, top: 10.9, width: 10.2, height: 81.0, pale: true },
] as const;

function FooterBars() {
  return (
    <div
      aria-hidden="true"
      className="relative mt-[54px] h-[clamp(96px,18vw,190px)] w-full overflow-hidden"
    >
      {footerBars.map((bar, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            left: `${bar.left}%`,
            top: `${bar.top}%`,
            width: `${bar.width}%`,
            height: `${bar.height}%`,
            background: "pale" in bar
              ? "linear-gradient(to bottom, rgba(253,174,146,0) 0%, rgba(253,174,146,0.35) 15%, rgba(253,174,146,0.86) 49%, rgba(253,174,146,0.15) 100%)"
              : "linear-gradient(to bottom, rgba(253,174,146,0) 0%, rgba(253,174,146,0.4) 14%, #FDAE92 55%, rgba(253,174,146,0.78) 100%)",
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
    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[14px] bg-black md:h-16 md:w-16 md:rounded-2xl lg:h-[72px] lg:w-[72px] lg:rounded-[18px]">
      <svg
        viewBox="0 0 180 180"
        className="h-12 w-12 md:h-14 md:w-14 lg:h-[64px] lg:w-[64px]"
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

/**
 * Docker whale on a transparent tile — the card's own white surface is the
 * background, exactly as the reference shows. Next.js and TypeScript get a
 * filled tile because their marks have no field of their own; the whale
 * carries its own blue, so boxing it in dark would contradict the design.
 *
 * Sized by width, not height: the mark's viewBox is 696x544 (~1.28:1), so
 * `h-[58px]` rendered it 74px wide and pushed it 2px past the 72px box. A
 * 64px width lands on the same 4px inset Next uses at every breakpoint, and
 * leaves the taller vertical room a wide mark needs.
 */
function DockerLogoTile() {
  return (
    <span className="grid h-14 w-14 shrink-0 place-items-center md:h-16 md:w-16 lg:h-[72px] lg:w-[72px]">
      <DockerWhale className="h-auto w-12 md:w-14 lg:w-16" />
    </span>
  );
}

function TypeScriptLogoTile() {
  return (
    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[14px] bg-[#3178C6] md:h-16 md:w-16 md:rounded-2xl lg:h-[72px] lg:w-[72px] lg:rounded-[18px]">
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
    <div className="hatch-edge min-h-screen">
      <div
        className={`flex min-h-screen flex-col border-x-2 border-panel-border bg-canvas ${pageSheet}`}
      >
        <SiteHeader />
        <main className="flex-1">
          <section className="border-b border-panel-border bg-canvas">
            <div
              className={`mx-auto ${pageWidth} ${pageGutter} pb-12 pt-10 text-center md:pb-[53px] md:pt-[68px]`}
            >
              <div className="flex justify-center">
                <span className="inline-flex items-center rounded-[10px] border border-panel-border bg-white px-4 py-[10px] text-[12px] font-semibold tracking-[0.15em] text-primary-700">
                  INTELLIGENT LEARNING
                </span>
              </div>
              <h1 className="mx-auto mt-[22px] max-w-[330px] font-display text-[32px] font-bold leading-[40px] text-balance text-black md:max-w-none md:text-[3.5rem] md:leading-[74px]">
                Search your learning
                <br className="hidden md:inline" /> in plain English.
              </h1>
              <p className="mx-auto mt-[21px] max-w-[24rem] text-[17px] leading-[28px] text-neutral-700 md:max-w-md md:text-[20px] md:leading-[33px]">
                Vertex understands what you want to learn and finds the exact
                lessons across all your courses.
              </p>
              <div className="mt-7 flex justify-center md:mt-10">
                <Button variant="brand" size="hero">
                  Explore Courses
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
              <div className="relative mx-auto mt-8 max-w-[748px] md:mt-11">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground md:left-6 md:h-6 md:w-6"
                  aria-hidden="true"
                />
                <label htmlFor="course-search" className="sr-only">
                  Search your learning
                </label>
                <input
                  id="course-search"
                  type="search"
                  placeholder="Ask anything about your learning..."
                  className="h-14 w-full min-w-0 rounded-[16px] border border-panel-border bg-white pl-[44px] pr-4 text-base text-neutral-700 placeholder:text-[15px] placeholder:text-neutral-500 focus:border-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 md:h-[76px] md:rounded-[20px] md:pl-[68px] md:pr-[110px] md:text-lg md:placeholder:text-lg"
                />
                <kbd className="pointer-events-none absolute right-5 top-1/2 hidden h-[42px] -translate-y-1/2 items-center rounded-[8px] border border-panel-border bg-white px-4 text-[12px] text-neutral-700 md:right-7 md:flex">
                  ⌘ K
                </kbd>
              </div>
            </div>
          </section>
          <section className="bg-canvas">
            <div className={`mx-auto ${pageWidth} ${pageGutter} pt-[52px]`}>
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <h2 className="font-display text-[22px] font-bold leading-[28px] text-black md:text-heading-1">
                  All Courses
                </h2>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xs text-body-lg font-medium text-primary-700 transition-colors hover:text-primary-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-600"
                >
                  View all courses
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <div className="mt-7 grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                  className="ml-1 h-4 w-4 shrink-0 text-primary-500 sm:h-5 sm:w-5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="ml-3 md:ml-5 md:whitespace-nowrap">
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
    </div>
  );
}
