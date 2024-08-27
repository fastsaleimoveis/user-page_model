import React from 'react';
import '@/app/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImovelComp from '@/app/components/imovel';
import { headers } from 'next/headers';


export async function generateMetadata(context:any) {
    const slug = context?.params.slug;

    const host = headers().get('host');
    try {
      const domain = `https://${host}` || '';
      // const domain = `https://pavanimoveis.com.br`;
  
      const body = {
          domain: domain.replace('www.', ''),
      };
  
      const response = await fetch(`https://dev.fastsaleimoveis.com.br/api/user-pages/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
      });
  
      const data = await response.json();

      const responseImovel = await fetch(`https://dev.fastsaleimoveis.com.br/api/public/property-slug/${slug}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const imovel = await responseImovel.json();
  
      return {
        title: imovel.title ?? '',
        description: imovel.description ?? '',
        openGraph: {
          title: imovel.title ?? '',
          description: imovel.description ?? '',
          images: [{
            url: imovel.photos.length > 0 ? imovel.photos.sort((a:any, b:any) => a.order - b.order)[0].url.replace('upload', 'upload/ar_1.0,c_fit,h_800') : '',
          }]
        },
        twitter: {
          image: imovel.photos.length > 0 ? imovel.photos.sort((a:any, b:any) => a.order - b.order)[0].url.replace('upload', 'upload/ar_1.0,c_fit,h_800') : ''
        },
        data,
        imovel
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

export default async function Imovel(context: any) {
    const data = await generateMetadata(context);

    return (
      <main style={{boxSizing: 'initial'}}>
        <ImovelComp data={data.data} imovel={data.imovel}/>
      </main>
    );
  }