import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saul Web Dev",
  description:
    "Hi! I'm Saul, a software engineer and frontend web developer based in Mexico. This is my modern and minimalist portfolio where you can find my most outstanding and recent projects, the skills I've mastered, and a way to reach out to me. Lets work together and bring to life your ideas into an amazing product and seamless user experience!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
