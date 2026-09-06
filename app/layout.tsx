import type { Metadata, Viewport } from "next";
import { Newsreader, Space_Grotesk } from "next/font/google";
import "./globals.css";

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Juan Diego Parra Escalona — Desarrollador Fullstack",
  description:
    "Desarrollador fullstack en Mérida, Venezuela. Integraciones, backend y despliegue en AWS.",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

// Corre antes del primer pintado: sin esto la página parpadea en claro
// durante un instante antes de aplicar el tema guardado.
const scriptTema = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var e=document.documentElement;e.classList.toggle('dark',d);e.classList.toggle('light',!d);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${serif.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
