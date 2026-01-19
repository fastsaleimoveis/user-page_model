import { redirect } from "next/navigation";
import HomeComp from "./components/home";
import { headers } from 'next/headers';
import { Loader } from "@mantine/core";

export async function generateMetadata(context:any) {
  const host = headers().get('host')?.replace('www', '');
  try {
    const domain = `https://${host}` || '';
    //const domain = `https://imobiliariatedesco.com.br`;

    const body = {
        domain: domain.replace('www.', ''),
    };

    const response = await fetch(`https://dev.fastsaleimoveis.com.br/api/user-pages-seo/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      next: { revalidate: 300 }, // Cache por 5 minutos (ISR)
    });
    
    if (!response.ok) {
      const text = await response.text();
      console.error('Erro na resposta da API:', response.status, text);
      throw new Error('Falha na requisição SEO');
    }
    
    const data = await response.json();

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
  //const domain = `https://imobiliariatedesco.com.br`;

  try {
    const res = await fetch(`https://dev.fastsaleimoveis.com.br/api/user-pages/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain }),
      next: { revalidate: 300 }, // Cache por 5 minutos (ISR)
    });

    if (!res.ok) {
      throw new Error(`Erro ao buscar dados: ${res.status}`);
    }

    const data = await res.json();

    if (!data || !data.data) {
      return (
        <div className='loader-container'>
          <p><Loader/></p>
          <p>Dados não encontrados</p>
        </div>
      );
    }

    return (
      <main>
        <HomeComp data={data.data}/>
      </main>
    );
  } catch (error) {
    console.error('Erro ao carregar página:', error);
    return (
      <div className='loader-container'>
        <p><Loader/></p>
        <p>Erro ao carregar página. Tente novamente.</p>
      </div>
    );
  }
}
