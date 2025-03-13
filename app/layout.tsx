import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";

// "Use client" NÃO, pois estamos fazendo fetch no server:
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
  return response.json();
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const host = headers().get("host") || "";
  const domain = `https://${host}`; // ou algo fixo

  const pageData = await getPageData(domain);
  const gtagId = pageData?.data?.gtag ?? "";

  return (
    <html lang="pt-BR">
      <head>
        {/* Exemplo: injeção manual do script do Google Tag */}
        {gtagId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            />
            <script
              // Precisamos do dangerouslySetInnerHTML
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
        {/* Fim da injeção manual */}
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
