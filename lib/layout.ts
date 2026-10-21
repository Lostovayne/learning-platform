/**
 * Shared page geometry.
 *
 * The header and the page content used to carry their own gutter classes
 * (`md:px-16` vs `md:px-20`), which put the logo 16px left of everything
 * else on the same grid. Both surfaces read these tokens instead.
 *
 * The product pages sit on a "paper" sheet inset from the viewport edges; the
 * margin around it is filled with the hatched edge decoration. Measured off
 * the reference sheet at a 1024px viewport: the sheet runs from x=30 to
 * x=994 and the content column from x=82 to x=938, so the desktop gutter
 * inside the sheet is 52px. The mobile gutter keeps the content at x=32.
 */

/** Max content width of the product pages. */
export const pageWidth = "w-full max-w-[1024px]";

/** Horizontal gutter, identical on every product surface. */
export const pageGutter = "px-[22px] md:px-[52px]";

/** Inset of the paper sheet from the viewport edges, where the hatch shows. */
export const pageSheet = "mx-[10px] md:mx-[30px]";
