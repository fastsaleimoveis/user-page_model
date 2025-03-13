import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

async function getPageData(domain: string) {
  // Aqui é seu fetch normal
  const body = { domain: domain.replace("www.", "") };
  const response = await fetch("https://dev.fastsaleimoveis.com.br/api/user-pages/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error("Falha ao buscar dados do backend");
  return response.json();
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const host = headers().get("host") || "";
    const domain = `https://${host}` || '';
    // const domain = `https://ligiaimoveis.com.br`;

  const pageData = await getPageData(domain);

  // Exemplo: Se o back-end retorna algo do tipo `pageData.data.gtag === "AW-16561351330"`.
  const gtagId = pageData?.data?.gtag ?? "";

  return (
    <html lang="pt-BR">
      <head>
        {/* Se temos um gtagId, injetamos o Script do Google Analytics. */}
        {gtagId && (
          <>
            {/* 1) O Script "async" de carregamento */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
              async
              strategy="beforeInteractive"
            />
            {/* 2) O Script inline de configuração */}
            <Script id="inline-gtag" strategy="beforeInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtagId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
