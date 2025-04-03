import type { Metadata } from "next";
import { Alata } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const alata = Alata({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alata",
});

export const metadata: Metadata = {
  title: "Todoodle",
  description: "Simple management of your todos",
  creator: "Dmytro Oborskyi",
  category: "Todo",
  keywords: ["todoodle", "todo", "tasks", "planner"],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
    shortcut: "/icon.svg",
  },
  robots: { index: true, follow: true, nocache: true },
  openGraph: {
    title: "Todoodle",
    description: "Simple management of your todos",
    type: "website",
    url: process.env.NEXT_PUBLIC_URL,
    images: [
      {
        url: process.env.NEXT_PUBLIC_URL + "/icon.svg",
        width: 1200,
        height: 630,
        alt: "Todoodle",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${alata.variable} antialiased`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
