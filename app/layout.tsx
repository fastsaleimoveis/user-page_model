import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

/** 
 * Busca os dados do backend para montar o "header_script" 
 */
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

  if (!response.ok) {
    throw new Error("Falha ao buscar dados do backend");
  }

  const data = await response.json();
  return data;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Obter o domínio a partir do "host" do headers
  const host = headers().get("host") || "";
  const domain = `https://${host}`;

  // Buscar dados no backend
  const pageData = await getPageData(domain);

  // Extrair o script do header
  const headerScript: string = pageData?.data?.header_script ?? "";

  // Regex para capturar 1) <script src="..."></script> e 2) <script> inline </script>
  const scriptSrcMatch = headerScript.match(
    /<script.*?src="([^"]+)"[^>]*><\/script>/i
  );
  const inlineMatch = headerScript.match(
    /<script[^>]*>([\s\S]*?)<\/script>/i
  );

  // Se houver <script src="...">
  const scriptSrc = scriptSrcMatch?.[1] ?? "";

  // Se houver <script> ... </script> inline
  const inlineCode = inlineMatch?.[1] ?? "";

  return (
    <html lang="pt-BR">
      <head>
        {/* Se encontramos um script com src */}
        {scriptSrc && (
          <Script
            src={scriptSrc}
            async
            strategy="beforeInteractive"
          />
        )}

        {/* Se encontramos um script inline */}
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
