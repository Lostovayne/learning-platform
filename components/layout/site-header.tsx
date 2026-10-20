import { Bell } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { UserMenu } from "@/components/layout/user-menu";

const navLinks = [
  { label: "Courses", href: "#" },
  { label: "My Learning", href: "#" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-panel-border bg-canvas">
      <div className="mx-auto flex h-24 w-full max-w-[1024px] items-center justify-between px-8 md:px-16">
        <div className="flex items-center gap-8 md:gap-20">
          <Link href="/" aria-label="Vertex home">
            <Logo titleClassName="text-[1.3125rem] font-bold text-black" />
          </Link>
          <nav
            className="hidden items-center gap-6 whitespace-nowrap md:flex md:gap-10"
            aria-label="Main"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-body-lg text-black transition-colors hover:text-primary-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <button
            type="button"
            aria-label="Notifications"
            className="rounded-full p-1.5 text-foreground transition-colors hover:text-primary-600"
          >
            <Bell className="h-[22px] w-[22px]" aria-hidden="true" />
          </button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
