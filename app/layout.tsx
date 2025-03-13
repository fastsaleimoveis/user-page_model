import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";

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

  const headerScript = pageData?.data?.header_script ?? "";

  return (
    <html lang="pt-BR">
      <head dangerouslySetInnerHTML={{ __html: headerScript }} />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
