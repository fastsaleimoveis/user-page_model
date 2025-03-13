import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

async function getPageData(domain: string) {
  const body = { domain: domain.replace("www.", "") };

  const response = await fetch(
    "https://dev.fastsaleimoveis.com.br/api/user-pages/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) throw new Error("Falha ao buscar dados do backend");

  const data = await response.json();
  return data;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const host = headers().get("host") || "";
  const domain = `https://${host}`;
  // const domain = `https://ligiaimoveis.com.br`;


  const pageData = await getPageData(domain);
  const header_script = pageData?.data?.header_script ?? "";

  const scriptSrcMatch = header_script.match(/<script.*?src="([^"]+)"[^>]*><\/script>/);
  const inlineMatch   = header_script.match(/<script[^>]*>([\s\S]*?)<\/script>/);

  const scriptSrc = scriptSrcMatch?.[1] ?? "";
  const inlineCode = inlineMatch?.[1] ?? "";

  return (
    <html lang="pt-BR">
      <head>
        {scriptSrc && (
          <Script
            src={scriptSrc}
            async
            strategy="beforeInteractive"
          />
        )}
        {inlineCode && (
          <Script id="inline-script" strategy="beforeInteractive">
            {inlineCode}
          </Script>
        )}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
