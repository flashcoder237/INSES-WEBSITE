import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/PageLoader";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { I18nProvider } from "@/components/providers/I18nProvider";
import ConditionalLayout from "@/components/ConditionalLayout";
import OfflineDetector from "@/components/OfflineDetector";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | INSES",
    default: "INSES - Institut Supérieur de l'Espoir",
  },
  description: "Institut de formation professionnelle pour les métiers de la santé à Douala, Cameroun. Formations en délégué médical, secrétariat médical, massothérapie, et plus.",
  metadataBase: new URL("https://univ-inses.com"),
  alternates: {
    canonical: "/",
    languages: {
      "fr-CM": "/",
      "en-CM": "/en",
    },
  },
  openGraph: {
    title: "INSES - Institut Supérieur de l'Espoir",
    description: "Votre avenir dans les métiers commence ici. Découvrez nos formations.",
    url: "https://univ-inses.com",
    siteName: "INSES",
    images: [
      {
        url: "/images/logo/logo-inses.png",
        width: 800,
        height: 600,
        alt: "Logo de l'INSES",
      },
    ],
    locale: "fr_CM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "INSES - Formations professionnelles en santé",
    description: "Institut de formation aux métiers de la santé à Douala. Délégué médical, secrétariat médical...",
    images: ["/images/logo/logo-inses.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-inter antialiased bg-white dark:bg-[#1A1A1A] text-[#4A4A4A] dark:text-white transition-colors`}
      >
        <ThemeProvider>
          <I18nProvider>
            <PageLoader />
            <OfflineDetector />
            <ConditionalLayout>{children}</ConditionalLayout>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

