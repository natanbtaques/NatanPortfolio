import { Plus_Jakarta_Sans } from "next/font/google";
import "./theme/globals.css"; // Certifique-se de que o caminho está correto

import PageTransition from "@/components/pageTransition";

// Next-intl
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

// Componentes
import Header from "@/components/Header";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-plusJakartaSans",
});

export const metadata = {
  title: "Natan Portfolio",
  description: "Natan's Portfolio",
};

export default async function RootLayout({ children, params }) {
  const locale = params?.locale || "en"; // Garante que um idioma sempre será definido

  let messages = {};
  try {
    messages = await getMessages(locale);
  } catch (error) {
    console.error(`Erro ao carregar as traduções para ${locale}:`, error);
  }

  return (
    <html lang={locale}>
      <body className={`${plusJakartaSans.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <PageTransition>{children}</PageTransition>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
