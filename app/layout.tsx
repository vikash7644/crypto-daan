import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";

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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
