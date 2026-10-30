import { Bell } from "lucide-react";
import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Suspense } from "react";
import { Logo } from "@/components/ui/logo";
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
            {/* The mark and wordmark take the component defaults (28px mark,
                18px `text-heading-3` wordmark), so the header logo is the same
                object the design system shows as its specimen instead of a
                private 30px/21px variant. It also reclaims ~11px of horizontal
                room, which is what the 320px header was missing. */}
            <Logo />
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
          <Suspense>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="inline-flex h-11 w-[70px] items-center justify-center rounded-md px-2 text-body font-medium text-primary-700 transition-colors hover:bg-primary-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  type="button"
                  className="inline-flex h-11 w-[70px] items-center justify-center rounded-md bg-primary-500 px-2 text-body font-medium text-white transition-colors hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <button
                type="button"
                aria-label="Notifications"
                className="grid h-11 w-11 place-items-center rounded-full text-foreground transition-colors hover:bg-neutral-100 hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                <Bell className="h-5 w-5" aria-hidden="true" />
              </button>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9",
                  },
                }}
              />
            </Show>
          </Suspense>
        </div>
      </div>
    </header>
  );
}
