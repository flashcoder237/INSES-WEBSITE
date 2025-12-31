import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { I18nProvider } from "@/components/providers/I18nProvider";
import ClientProviders from "@/components/ClientProviders";

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
  keywords: [
    "INSES",
    "Institut Supérieur de l'Espoir",
    "formation santé Cameroun",
    "formation santé Douala",
    "délégué médical",
    "secrétariat médical",
    "massothérapie",
    "aide chimiste biologiste",
    "diététique nutrition",
    "vendeur pharmacie",
    "formation professionnelle Cameroun",
    "école santé Douala",
    "institut formation médicale",
    "formations paramédicales Cameroun",
  ],
  authors: [{ name: "INSES" }],
  creator: "INSES",
  publisher: "INSES",
  metadataBase: new URL("https://univ-inses.com"),
  alternates: {
    canonical: "/",
    languages: {
      "fr-CM": "/",
      "en-CM": "/en",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "INSES - Institut Supérieur de l'Espoir",
    description: "Votre avenir dans les métiers de la santé commence ici. Découvrez nos formations professionnelles.",
    url: "https://univ-inses.com",
    siteName: "INSES",
    images: [
      {
        url: "/images/logo/logo-inses.png",
        width: 1200,
        height: 630,
        alt: "Logo de l'INSES - Institut Supérieur de l'Espoir",
      },
    ],
    locale: "fr_CM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "INSES - Formations professionnelles en santé",
    description: "Institut de formation aux métiers de la santé à Douala. Délégué médical, secrétariat médical, massothérapie et plus.",
    images: ["/images/logo/logo-inses.png"],
  },
  verification: {
    google: "verification_token_here", // À remplacer par le vrai token Google Search Console
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
            <ClientProviders>{children}</ClientProviders>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

