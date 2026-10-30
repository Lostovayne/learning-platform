import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Vertex — AI Learning Platform",
  description:
    "A unified design language for Vertex learning platform. Clean, modern and focused on clarity, consistency and intuitive learning.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} scroll-smooth h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#c2522a",
              colorPrimaryForeground: "#ffffff",
              colorBackground: "#ffffff",
              colorForeground: "#0f172a",
              /* `--color-muted-foreground` (neutral-500), not neutral-700:
                 Clerk uses this for field labels and the modal subtitle, which
                 are supporting text in the type scale. */
              colorMutedForeground: "#5d6b83",
              colorInput: "#ffffff",
              colorInputForeground: "#0f172a",
              /*
               * `border` is the field-spec hairline (#e2e8f0), not the panel
               * border: the panel colour belongs to the paper sheet, not to a
               * control sitting on top of it.
               */
              colorBorder: "#e2e8f0",
              colorRing: "#c2522a",
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",

              /*
               * Clerk's default is 0.8125rem (13px), which is what every label,
               * button and link in the modal measured. The design system's body
               * size is 0.875rem (14px), so the `md` step of Clerk's own scale
               * is moved onto the token and everything derived from it follows.
               */
              fontSize: "0.875rem",

              /*
               * This is the `md` STEP, not the card radius: Clerk derives `sm`,
               * `lg` and `xl` from it and the card uses `xl`. At 0.75rem that
               * lands on 12px for fields and buttons ("Field Specs: Radius:
               * 12px") and 16px for the card, which is exactly the `rounded-lg`
               * the design system's Panel uses.
               */
              borderRadius: "0.75rem",
            },
            elements: {
              /*
               * Measured: `font-medium` and `h-11` do land on the buttons, and
               * `font-medium` lands on the footer links. Font-size utilities
               * never land anywhere, and neither does `h-11` on the input —
               * Clerk writes those from its own stylesheet. Those are handled
               * in globals.css instead; see the Clerk block there.
               */
              formButtonPrimary: "h-11 font-medium",
              socialButtonsBlockButtonText: "font-medium",
              footerActionLink: "font-medium",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
