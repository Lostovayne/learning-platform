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
              colorMutedForeground: "#334155",
              colorInput: "#ffffff",
              colorInputForeground: "#0f172a",
              colorBorder: "#e6d8cd",
              colorRing: "#c2522a",
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              borderRadius: "0.5rem",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
