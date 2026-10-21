"use client";

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
 *
 * Opening moves focus to the first item, Escape returns focus to the
 * trigger, and the arrow keys cycle between items.
 */
export function UserMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    itemRefs.current[0]?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function onMenuKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const current = itemRefs.current.findIndex(
      (item) => item === document.activeElement,
    );
    const count = menuLinks.length;
    const next =
      event.key === "ArrowDown"
        ? (current + 1) % count
        : (current - 1 + count) % count;
    itemRefs.current[next]?.focus();
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open account menu for AR"
        onClick={() => setOpen((value) => !value)}
        className="grid h-11 w-11 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-neutral-100 text-[12px] font-semibold leading-none tracking-tight text-neutral-700 md:h-7 md:w-7 md:text-[11px]">
          AR
        </span>
      </button>
      {open ? (
        <div
          role="menu"
          aria-label="Account"
          onKeyDown={onMenuKeyDown}
          className="absolute right-0 top-[calc(100%+4px)] z-50 w-40 rounded-[12px] border border-panel-border bg-white p-1.5 shadow-lg sm:w-44 md:w-48 md:rounded-[14px] md:p-2"
        >
          {menuLinks.map((link, index) => (
            <Link
              key={link.label}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              role="menuitem"
              href={link.href}
              onClick={() => setOpen(false)}
              className="block whitespace-nowrap rounded-[8px] px-2.5 py-1.5 text-[14px] leading-[20px] text-black transition-colors hover:bg-neutral-100 hover:text-primary-700 focus-visible:bg-neutral-100 focus-visible:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-600 md:rounded-[10px] md:px-3 md:py-2 md:text-body-lg md:leading-[24px]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
