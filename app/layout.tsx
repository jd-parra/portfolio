import type { Metadata } from "next";
import { Archivo, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Juan Diego Parra Escalona — Desarrollador Fullstack",
  description:
    "Desarrollador fullstack en Mérida, Venezuela. Integraciones, backend y despliegue en AWS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${archivo.variable} ${serif.variable}`}>
      <body className="bg-[#F2F3F1] text-[#14181A] antialiased">
        {children}
      </body>
    </html>
  );
}