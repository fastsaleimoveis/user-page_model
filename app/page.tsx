import { redirect } from "next/navigation";
import HomeComp from "./components/home";
import { headers } from 'next/headers';
import { Loader } from "@mantine/core";

export async function generateMetadata(context:any) {
  const host = headers().get('host')?.replace('www', '');
  const start = performance.now();
  try {
    const domain = `https://${host}` || '';
    //const domain = `https://kakaoliveirainvestimentos.com.br`;

    const body = {
        domain: domain.replace('www.', ''),
    };

    const response = await fetch(`https://dev.fastsaleimoveis.com.br/api/user-pages-seo/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      const text = await response.text();
      console.error('Erro na resposta da API:', response.status, text);
      throw new Error('Falha na requisição SEO');
    }
    
    const data = await response.json();

    // console.log(data)

    return {
      title: data?.data?.seo_title ?? '',
      description: data?.data?.seo_description ?? '',
      openGraph: {
        title: data?.data?.seo_title ?? '',
        description: data?.data?.seo_description ?? '',
        images: [{
          url: data?.data?.seo_image ?? '',
        }]
      },
      twitter: {
        image: data?.data?.seo_image ?? ''
      },
      icons: {
        icon: data?.data?.favicon ?? '/default-favicon.ico',
      },
      data
    }

} catch (error) {
  console.error('Erro ao fazer a requisição no servidor:', error);
  return {
      props: {
          data: null,
      },
  };
}
}

export default async function Home() {
  const host = headers().get('host')?.replace('www', '');
      const domain = `https://${host}` || '';
      //const domain = `https://kakaoliveirainvestimentos.com.br`;

  const res = await fetch(`https://dev.fastsaleimoveis.com.br/api/user-pages/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain }),
  });

  const data = await res.json();

  return (
    (data && data.data) ?
    <main>
      <HomeComp data={data.data}/>
    </main>: <div className='loader-container'><p><Loader/></p></div>
  );
}
