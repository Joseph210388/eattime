import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tay Pay",
  description: "Restaurante de comida peruana",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar/>
          {children}
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}
