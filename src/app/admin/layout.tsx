"use client";
import { Toaster } from "react-hot-toast";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/layout/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 flex">
        <Sidebar />
        <div className="flex-1 min-h-screen flex flex-col">
          <Header />
          <main className="p-6">{children}</main>
          <Toaster position="top-right" />
        </div>
      </body>
    </html>
  );
}
