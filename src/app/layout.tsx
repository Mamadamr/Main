import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "سارمین | Sarmin – طراحی سایت و فروش آنلاین",
  description:
    " Sarmin is a smart platform for online sales, website creation, and digital menus, helping businesses launch and grow online.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={` antialiased`}>
        <Header />
        {children}
        <Toaster position="top-center" />
        <Footer />
      </body>
    </html>
  );
}
