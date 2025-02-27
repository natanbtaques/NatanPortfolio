import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/pageTransition";
import StairTransition from "@/components/StairTransition";

// components
import Header from "@/components/Header";

const jetbrainsMono = JetBrains_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-jetbrainsMono",
});

export const metadata = {
  title: "Natan  Portfolio",
  description: "Natan's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable}  antialiased`}>
        <Header />
        <PageTransition>
          {/* <StairTransition /> */}
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
