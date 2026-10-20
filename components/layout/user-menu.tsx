"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const menuLinks = [
  { label: "Courses", href: "#" },
  { label: "My Learning", href: "#" },
] as const;

/**
 * Avatar button that opens a small account menu (Courses / My Learning).
 * Used at every breakpoint; on desktop the inline nav is also visible, this
 * menu is the smaller-screen replacement for it.
 */
export function UserMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open account menu"
        onClick={() => setOpen((value) => !value)}
        className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
      >
        <Image
          src="/avatar-victoria.jpg"
          alt="Your profile"
          width={48}
          height={48}
          sizes="(max-width: 767px) 32px, 34px"
          className="h-8 w-8 rounded-full object-cover sm:h-10 sm:w-10 md:h-[34px] md:w-[34px]"
        />
      </button>
      {open ? (
        <div
          role="menu"
          aria-label="Account"
          className="absolute right-0 top-[calc(100%+4px)] z-50 w-40 rounded-[12px] border border-panel-border bg-white p-1.5 shadow-lg sm:w-44 md:w-48 md:rounded-[14px] md:p-2"
        >
          {menuLinks.map((link) => (
            <Link
              key={link.label}
              role="menuitem"
              href={link.href}
              onClick={() => setOpen(false)}
              className="block whitespace-nowrap rounded-[8px] px-2.5 py-1.5 text-[14px] leading-[20px] text-black transition-colors hover:bg-neutral-100 hover:text-primary-600 md:rounded-[10px] md:px-3 md:py-2 md:text-body-lg md:leading-[24px]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
