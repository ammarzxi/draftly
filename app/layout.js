import { Inter, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import GlobalProvider from "./context/GlobalVars";

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
      className={`${inter.variable} ${manrope.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-screen">
        {/* PY OF SOME VALUE FOR HTE BODY AND SIDEBAR */}
        <GlobalProvider>
  <Navbar />
  <div className="flex">
    <Sidebar />
    <main className="min-w-0 flex-1 p-2">{children}</main>
  </div>
</GlobalProvider>
      </body>
    </html>
  );
}
