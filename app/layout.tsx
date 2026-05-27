import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Botox Coreano Manual - Avaliação Gratuita",
  description: "Rejuvenesça até 20 anos em 28 dias com o Botox Coreano Manual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
