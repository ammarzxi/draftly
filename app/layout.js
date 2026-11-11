import { Inter, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import GlobalProvider from "./context/GlobalVars";
import AppShell from "./components/layout/AppShell";
import ThemeProvider from "./components/providers/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
   <html
  lang="en"
  suppressHydrationWarning
  className={`${inter.variable} ${manrope.variable} ${jetbrains.variable} h-full antialiased`}
>
      <body className="min-h-screen">
        <ThemeProvider>
          <GlobalProvider>
            <AppShell>{children}</AppShell>
          </GlobalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
