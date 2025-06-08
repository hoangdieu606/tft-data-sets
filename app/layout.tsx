import type { Metadata } from "next";
import { Nunito_Sans, Nunito } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: '--font-nunito-sans',
});
const nunito = Nunito({
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: "Hướng dẫn DTCL | TFT Guide",
  description: "Hướng dẫn xây dựng đội hình, mẹo chơi và thông tin chi tiết về Tướng, Tộc Hệ, Nâng Cấp và Trang Bị trong TFT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
        className={`${nunitoSans.variable} ${nunito.variable} antialiased`}>
      <body
        className="leading-normal min-h-screen text-base max-w-screen-lg w-full m-auto flex flex-col justify-between"
      >
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}