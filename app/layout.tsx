import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Story Log - pedrosettec",
  description: "Instagram Stories log gallery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
