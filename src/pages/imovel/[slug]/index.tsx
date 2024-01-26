import ScriptInjector from '@/app/components/ScriptInjector';
import BodyScriptInjector from '@/app/components/BodyScriptInjector';
import React from 'react';
import '@/app/globals.css';
import { Header } from '@/app/components/parts/header';
import { Footer } from '@/app/components/parts/footer';
import { Whats } from '@/app/components/parts/whats';
import { Cooklies } from '@/app/components/parts/cookies';
import { Property } from '@/app/components/parts/property';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { Helmet, HelmetProvider } from 'react-helmet-async';


export async function getServerSideProps(context: any) {
    try {
        const slug = context.params.slug;

        const { req } = context;

        const domain = `https://${req.headers.host}`;

        const body = {
           //  domain: 'https://teste3.fastsaleimoveis.com.br',
            domain: domain,
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
            props: {
                data: data,
                imovel: imovel
            },
        };
    } catch (error) {
        console.error('Erro ao fazer a requisição no servidor:', error);
        return {
            props: {
                data: null,
                imovel: null
            },
        };
    }
}

export default function Imovel({ data, imovel }: any) {
    const [load, setLoad] = useState(true);

    useEffect(() => {
        if(data){
          setLoad(false)
        }
      }, [data])

    return (
      <HelmetProvider>
      <main>
            <Helmet>
                <title>{imovel.title}</title>
                <meta name="description" content={imovel.description} />
                <meta property="og:title" content={imovel.title} />
                <meta property="og:description" content={imovel.description} />
                <link rel="icon" href="/favicon.ico" />
            </Helmet>
        {data && 
            <ScriptInjector scriptContent={data.data.header_script} />
        }
         <Header data={data.data.personal_page_headers[0]}/>
        {!load && data.data.personal_page_sections.filter((sections:any) => sections.page_location === 'imovel').map((page:any, index:number) => (
            <div key={index} style={{width:'100%', padding:'0', position:'relative', zIndex:'1'}}>
                {page.type === 10 &&
                    <Property imovel={imovel} broker={data.data.broker} realEstate={data.data.real_estate} banner={page} data={data.data.personal_page_cards[0]}/>
                }
            </div>
        ))}
        <Footer data={data.data.personal_page_footers[0]}/>
        {data && 
            <BodyScriptInjector scriptContent={data.data.body_script} />
        }

        {data.data.personal_page_assets.map((asset:any, index:number) => (
          <div key={index}>
            {(asset.type === 102 && asset.active === 1) &&
              <Whats data={asset}/>
            }
            {(asset.type === 103 && asset.active === 1) &&
              <Cooklies data={asset}/>
            }
          </div>
        ))}
      </main>
      </HelmetProvider>
    );
  }