"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  ariaLabel?: string;
}

/**
 * Listbox pattern: the trigger keeps DOM focus and points at the active
 * option with aria-activedescendant, so the options never need to be
 * focusable themselves. An option is not a button — nesting one inside
 * role="option" is invalid ARIA and breaks arrow-key navigation.
 */
export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  className,
  ariaLabel,
}: SelectProps) {
  const [internal, setInternal] = useState(
    defaultValue ?? options[0]?.value ?? "",
  );
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const listboxId = useId();

  const current = value ?? internal;
  const currentLabel =
    options.find((option) => option.value === current)?.label ?? "";

  const select = useCallback(
    (next: string) => {
      setInternal(next);
      onValueChange?.(next);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [onValueChange],
  );

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        close(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    listboxRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    optionRefs.current[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (!open && (event.key === "ArrowDown" || event.key === "Enter")) {
      event.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActive((index) => Math.min(options.length - 1, index + 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActive((index) => Math.max(0, index - 1));
        break;
      case "Home":
        event.preventDefault();
        setActive(0);
        break;
      case "End":
        event.preventDefault();
        setActive(options.length - 1);
        break;
      case "Enter":
      case " ": {
        event.preventDefault();
        const option = options[active];
        if (option) select(option.value);
        break;
      }
    }
  }

  const activeOptionId =
    open && options[active] ? `${listboxId}-option-${active}` : undefined;

  return (
    <div ref={rootRef} className={cn("relative w-full min-w-0", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        onClick={() => setOpen((isOpen) => !isOpen)}
        onKeyDown={onKeyDown}
        className="flex h-11 w-full min-w-0 items-center justify-between gap-2 rounded-md border border-neutral-200 bg-white px-4 text-base text-foreground focus:border-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 sm:text-body"
      >
        <span className="truncate">{currentLabel}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-neutral-500 transition-transform",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <ul
          ref={listboxRef}
          role="listbox"
          id={listboxId}
          tabIndex={-1}
          aria-label={ariaLabel}
          aria-activedescendant={activeOptionId}
          onKeyDown={onKeyDown}
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-neutral-200 bg-white py-1 shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          {options.map((option, index) => {
            const isSelected = option.value === current;
            return (
              <li
                key={option.value}
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                role="option"
                id={`${listboxId}-option-${index}`}
                aria-selected={isSelected}
                onMouseEnter={() => setActive(index)}
                onClick={() => select(option.value)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-2 px-4 py-2 text-base text-foreground sm:text-body",
                  index === active && "bg-neutral-100",
                  isSelected && "font-medium text-primary-700",
                )}
              >
                <span className="truncate">{option.label}</span>
                {isSelected ? (
                  <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
