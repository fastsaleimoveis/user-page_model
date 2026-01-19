import React from 'react';
import '@/app/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImovelComp from '@/app/components/imovel';
import { headers } from 'next/headers';
import { Loader } from '@mantine/core';


export async function generateMetadata(context:any) {
    const slug = context?.params?.slug;

    if (!slug) {
      return {
        title: 'Imóvel não encontrado',
        description: 'Imóvel não encontrado',
      };
    }

    const host = headers().get('host')?.replace('www', '');
    try {
      const domain = `https://${host}` || '';
      //const domain = `https://pauloborgo.com.br`;
  
      const body = {
          domain: domain.replace('www.', ''),
      };
  
      // Paralelizar requisições para melhor performance
      const [seoResponse, imovelResponse] = await Promise.all([
        fetch(`https://dev.fastsaleimoveis.com.br/api/user-pages-seo/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
          next: { revalidate: 300 }, // Cache por 5 minutos (ISR)
        }),
        fetch(`https://dev.fastsaleimoveis.com.br/api/public/property-slug/${slug}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
          next: { revalidate: 300 }, // Cache por 5 minutos (ISR)
        })
      ]);
  
      if (!seoResponse.ok || !imovelResponse.ok) {
        throw new Error(`Erro ao buscar dados: ${seoResponse.status} / ${imovelResponse.status}`);
      }

      const [data, imovel] = await Promise.all([
        seoResponse.json(),
        imovelResponse.json()
      ]);
  
      return {
        title: imovel?.title ?? 'Imóvel',
        description: imovel?.description ?? '',
        openGraph: {
          title: imovel?.title ?? 'Imóvel',
          description: imovel?.description ?? '',
          images: imovel?.photos && imovel.photos.length > 0 ? [{
            url: imovel.photos.sort((a:any, b:any) => a.order - b.order)[0].url.replace('upload', 'upload/ar_1.0,c_fit,h_800'),
          }] : [],
        },
        twitter: {
          image: imovel?.photos && imovel.photos.length > 0 ? imovel.photos.sort((a:any, b:any) => a.order - b.order)[0].url.replace('upload', 'upload/ar_1.0,c_fit,h_800') : ''
        },
        icons: {
          icon: data?.data?.favicon ?? '/default-favicon.ico',
        },
        data,
        imovel
      }
  
  } catch (error) {
    console.error('Erro ao fazer a requisição no servidor:', error);
    return {
        title: 'Erro ao carregar imóvel',
        description: 'Erro ao carregar informações do imóvel',
        data: null,
        imovel: null,
    };
  }
  }

export default async function Imovel(context: any) {
  try {
    const slug = context?.params?.slug;
    if (!slug) {
      return (
        <div className='loader-container'>
          <p>Slug não encontrado</p>
        </div>
      );
    }

    const host = headers().get('host')?.replace('www', '');
    const domain = `https://${host}` || '';
    //const domain = `https://pauloborgo.com.br`;

    const body = {
      domain: domain.replace('www.', ''),
    };

    // Paralelizar todas as requisições necessárias
    const [pageDataResponse, imovelResponse] = await Promise.all([
      fetch(`https://dev.fastsaleimoveis.com.br/api/user-pages/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain }),
        next: { revalidate: 300 }, // Cache por 5 minutos (ISR)
      }),
      fetch(`https://dev.fastsaleimoveis.com.br/api/public/property-slug/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        next: { revalidate: 300 }, // Cache por 5 minutos (ISR)
      })
    ]);

    if (!pageDataResponse.ok || !imovelResponse.ok) {
      throw new Error(`Erro ao buscar dados: ${pageDataResponse.status} / ${imovelResponse.status}`);
    }

    const [pageData, imovelData] = await Promise.all([
      pageDataResponse.json(),
      imovelResponse.json()
    ]);

    if (!pageData || !pageData.data) {
      return (
        <div className='loader-container'>
          <p><Loader/></p>
          <p>Dados não encontrados</p>
        </div>
      );
    }

    return (
      <main style={{boxSizing: 'initial'}}>
        <ImovelComp data={pageData.data} imovel={{ imovel: imovelData }}/>
      </main>
    );
  } catch (error) {
    console.error('Erro ao carregar página do imóvel:', error);
    return (
      <div className='loader-container'>
        <p><Loader/></p>
        <p>Erro ao carregar página. Tente novamente.</p>
      </div>
    );
  }
}
