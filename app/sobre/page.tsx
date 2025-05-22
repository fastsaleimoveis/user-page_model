import React from 'react';
import '@/app/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutComp from '../components/sobre';
import { headers } from 'next/headers';
import { Loader } from '@mantine/core';

export async function generateMetadata(context:any) {
    const host = headers().get('host')?.replace('www', '');
    try {
       const domain = `https://${host}` || '';
       //const domain = `https://pavanimoveis.com.br`;
  
      const body = {
          domain: domain.replace('www.', ''),
      };
  
      const response = await fetch(`https://dev.fastsaleimoveis.com.br/api/user-pages-seo/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
      });
  
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


export default async function About() {
  const host = headers().get('host')?.replace('www', '');
      const domain = `https://${host}` || '';
      //const domain = `https://pavanimoveis.com.br`;

  const res = await fetch(`https://dev.fastsaleimoveis.com.br/api/user-pages/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain }),
  });

  const data = await res.json();

    return (
      (data && data.data) ?
      <main>
        <AboutComp data={data.data}/>
      </main>: <div className='loader-container'><p><Loader/></p></div>
    );
  }