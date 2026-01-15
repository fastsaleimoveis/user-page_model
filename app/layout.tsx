import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { MantineProvider } from "@mantine/core";
import Script from "next/script";
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

const inter = Inter({ subsets: ["latin"] });

async function getPageData(domain: string) {
  const body = { domain: domain.replace("www.", "") };
  const response = await fetch(
    "https://dev.fastsaleimoveis.com.br/api/user-pages-seo/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  if (!response.ok) throw new Error("Falha ao buscar dados do backend");
  return response.json();
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const host = headers().get("host") || "";
  const domain = `https://${host}`;
  //const domain = `https://imobiliariatedesco.com.br`;

  const pageData = await getPageData(domain);
  const gtagId = pageData?.data?.gtag ?? "";

  // Validar se o gtagId está no formato correto (AW-XXXXXXXXXXX para Google Ads ou G-XXXXXXXXXX para Google Analytics)
  const isValidGtagId = gtagId && (gtagId.startsWith('AW-') || gtagId.startsWith('G-'));

  return (
    <html lang="pt-BR">
      <head>
        {/* Meta tags e outros elementos do head */}
      </head>
      <body className={inter.className}>
        {isValidGtagId && (
          <>
            {/* Google Tag Manager / Google Ads - Carregamento do script */}
            <Script
              id="google-ads-loader"
              strategy="beforeInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            />
            {/* Google Tag Manager / Google Ads - Configuração */}
            <Script
              id="google-ads-config"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gtagId}');
                `,
              }}
            />
          </>
        )}
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
