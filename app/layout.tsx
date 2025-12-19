import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/PageLoader";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { I18nProvider } from "@/components/providers/I18nProvider";
import ConditionalLayout from "@/components/ConditionalLayout";

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
  title: "INSES - Institut Supérieur de l'Espoir",
  description: "Institut de formation professionnelle pour les métiers de la santé à Douala, Cameroun. Formations en délégué médical, secrétariat médical, massothérapie, aide chimiste biologiste, diététique et vendeur en pharmacie.",
  keywords: "INSES, formation santé, Douala, Cameroun, délégué médical, secrétariat médical, massothérapie, aide chimiste, diététique, pharmacie",
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
            <ConditionalLayout>{children}</ConditionalLayout>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

