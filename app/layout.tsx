import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crypto Daan — One Billion People, One Dollar Each",
  description:
    "A community-powered campaign to support QORVYNT open technology: programming language, Web4 infrastructure and developer tools.",
  openGraph: {
    title: "Crypto Daan — One Billion People, One Dollar Each",
    description: "Support open technology through voluntary crypto contributions.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
