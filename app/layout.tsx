import type { Metadata } from "next";
import { Archivo, Roboto_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });
const mono = Roboto_Mono({ subsets: ["latin"], weight: "500", variable: "--font-roboto-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://design.taufiqdp.com"),
  title: "Dua Tinta",
  description: "Dua Tinta, the design system of taufiqdp.com: two inks on paper, condensed Archivo type, original-colour photographs.",
  alternates: { canonical: "/" },
  openGraph: { title: "Dua Tinta", description: "The design system of taufiqdp.com.", url: "/" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply the saved ink pair before first paint, same as taufiqdp.com */}
        <script dangerouslySetInnerHTML={{ __html: `try{var i=localStorage.getItem("ink");if(i)document.documentElement.dataset.ink=i}catch(e){}` }} />
      </head>
      <body className="mx-auto max-w-[1440px] px-4 pt-5 pb-10 font-sans text-[17px] leading-normal antialiased sm:px-6 lg:px-10">{children}</body>
    </html>
  );
}
