import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Home/NavBar";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Home/Footer";
import StoreProvider from "@/redux/Provider";
import 'notyf/notyf.min.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoDev Ecommerce",
  description: "A local Filipino e-commerce using Next Js | Stripe | Shadcn UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>
            <NavBar />
            {children}
            <Footer />
          </body>
        </html>
      </ClerkProvider>
    </StoreProvider>
  );
}
