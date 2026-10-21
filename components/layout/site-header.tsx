import { Bell } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { UserMenu } from "@/components/layout/user-menu";
import { pageGutter, pageWidth } from "@/lib/layout";

const navLinks = [
  { label: "Courses", href: "#" },
  { label: "My Learning", href: "#" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-panel-border bg-canvas">
      <div
        className={`mx-auto flex h-20 items-center justify-between ${pageWidth} ${pageGutter} md:h-24`}
      >
        <div className="flex items-center gap-6 md:gap-16">
          <Link
            href="/"
            aria-label="Vertex home"
            className="rounded-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-600"
          >
            <Logo
              markClassName="h-[30px] w-[30px]"
              titleClassName="text-[1.3125rem] font-bold text-black"
            />
          </Link>
          <nav
            className="hidden items-center gap-6 whitespace-nowrap md:flex md:gap-12"
            aria-label="Main"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-xs text-body text-black transition-colors hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="grid h-11 w-11 place-items-center rounded-full text-foreground transition-colors hover:bg-neutral-100 hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
          </button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
