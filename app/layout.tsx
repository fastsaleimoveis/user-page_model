import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { MantineProvider } from "@mantine/core";
import Script from "next/script";
import '@mantine/core/styles.css';

const inter = Inter({ subsets: ["latin"] });

async function getPageData(domain: string) {
  try {
    const body = { domain: domain.replace("www.", "") };
    const response = await fetch(
      "https://dev.fastsaleimoveis.com.br/api/user-pages-seo/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        next: { revalidate: 600 }, // Cache por 10 minutos (ISR) - dados de SEO mudam menos frequentemente
      }
    );
    if (!response.ok) {
      console.error(`Erro ao buscar dados do backend: ${response.status}`);
      return null;
    }
    return response.json();
  } catch (error) {
    console.error('Erro ao buscar dados do backend:', error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const host = headers().get("host") || "";
  const domain = `https://${host}`;
  //const domain = `https://pauloborgo.com.br`;

  let gtagId = "";
  try {
    const pageData = await getPageData(domain);
    gtagId = pageData?.data?.gtag ?? "";
  } catch (error) {
    console.error('Erro ao processar dados da página:', error);
  }

  // Validar se o gtagId está no formato correto (AW-XXXXXXXXXXX para Google Ads ou G-XXXXXXXXXX para Google Analytics)
  const isValidGtagId = gtagId && (gtagId.startsWith('AW-') || gtagId.startsWith('G-'));

  return (
    <html lang="pt-BR">
      <head />
      <body className={inter.className}>
        {isValidGtagId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
              strategy="afterInteractive"
            />
            <Script id={`google-ads-config-${gtagId}`} strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtagId}');
              `}
            </Script>
          </>
        )}
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
