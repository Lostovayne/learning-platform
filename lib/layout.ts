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
 *
 * The hatched band is the frame around the paper, so it has to stay a frame.
 * Between `xl` and `2xl` the sheet is capped at 1290px and centred, which
 * leaves a band of `(100vw - 1290px) / 2` on each side. From `2xl` up the
 * sheet grows with the viewport again and the band is pinned at 122px, so
 * an ultrawide monitor widens the paper instead of the margins. The content
 * column inside it is not capped, so it always reaches the sheet's own
 * edges.
 */

/** Content column of the product pages: it fills the sheet minus the gutter. */
export const pageWidth = "w-full";

/** Horizontal gutter, identical on every product surface. */
export const pageGutter = "px-[22px] md:px-[52px]";

/** Inset of the paper sheet from the viewport edges, where the hatch shows. */
export const pageSheet =
  "mx-[10px] md:mx-[30px] xl:mx-[clamp(30px,calc(50vw_-_645px),123px)] xl:max-w-[1290px] 2xl:mx-[123px] 2xl:max-w-none";
