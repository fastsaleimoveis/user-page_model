import ScriptInjector from '@/app/components/ScriptInjector';
import BodyScriptInjector from '@/app/components/BodyScriptInjector';
import React from 'react';
import { Type1 } from '@/app/components/parts/type1';
import { Type2 } from '@/app/components/parts/type2';
import { styled } from 'styled-components';
import '@/app/globals.css';
import { Type4 } from '@/app/components/parts/type4';
import { Type5 } from '@/app/components/parts/type5';
import { SearchBar1 } from '@/app/components/parts/searchBar1';
import { SearchBar2 } from '@/app/components/parts/searchBar2';
import { Type3 } from '@/app/components/parts/type3';
import { Header } from '@/app/components/parts/header';
import { Footer } from '@/app/components/parts/footer';
import { Whats } from '@/app/components/parts/whats';
import { Cooklies } from '@/app/components/parts/cookies';
import { PropertiesCatalog } from '@/app/components/parts/propertiesCatalog';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';

export async function getServerSideProps(context: any) {
    try {
        const { req } = context;

        const domain = `https://${req.headers.host}`;

        const body = {
            domain: 'https://teste3.fastsaleimoveis.com.br',
            // domain: domain,
        };

        const response = await fetch(`https://dev.fastsaleimoveis.com.br/api/user-pages/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        return {
            props: {
                data: data,
            },
        };
    } catch (error) {
        console.error('Erro ao fazer a requisição no servidor:', error);
        return {
            props: {
                data: null,
            },
        };
    }
}

export default function Imoveis({ data }: any) {
    const [load, setLoad] = useState(true);

    useEffect(() => {
        if(data){
          setLoad(false)
        }
      }, [data])

    return (
      <main>
        <Head>
            <title>{data?.data.seo_title}</title>
            <meta name="description" content={data?.data.seo_description} />
            <meta property="og:title" content={data?.data.seo_title} />
            <meta property="og:image" content={data?.data.seo_image} />
            <meta property="og:description" content={data?.data.seo_description} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        {data && 
            <ScriptInjector scriptContent={data.data.header_script} />
        }
         <Header data={data.data.personal_page_headers[0]}/>
        {!load && data.data.personal_page_sections.filter((sections:any) => sections.page_location === 'lista').map((page:any, index:number) => (
        <Banner
            key={index}
            style={{
                backgroundColor:`${page.background_color}`,
                position:'relative',
                minHeight:`${page.banner_height * 10}px`,
                display:'flex'
            }}
            >
            <div style={{width:'100%', padding:'20px 0'}}>
                {page.type === 1 &&
                    <Type1 banner={page}/>
                }
                {page.type === 2 &&
                    <Type2 banner={page}/>
                }
                {page.type === 3 &&
                    <Type3 banner={page} data={data.data.personal_page_cards[0]}/>
                }
                {page.type === 4 &&
                    <Type4 banner={page}/>
                }
                {page.type === 5 &&
                    <Type5 banner={page}/>
                }
                {page.type === 6 &&
                    <SearchBar1 banner={page}/>
                }
                {page.type === 7 &&
                    <SearchBar2 banner={page}/>
                }
            </div>
            <div className="background-image" style={{
                backgroundImage:`url(${page.background_image})`,
                opacity:page.background_opacity / 100,
            }}></div>
        </Banner>
        ))}
        <PropertiesCatalog data={data.data.personal_page_cards[0]}/>
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
    );
  }
  
  const Banner = styled.div`
    position:relative;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 0px;
    display:flex;
    align-items:center;
    justify-content:center;
    text-align:center;
    min-height:70px;

    h3{
        cursor:pointer;
    }

    & .background-image{
        background-position:center center;
        background-size:cover;
        height:100%;
        width:100%;
        top:0;
        bottom:0;
        left:0;
        right:0;
        position:absolute;
        z-index:0;
    }
`;