import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased bg-white text-[#2B2E42]`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

