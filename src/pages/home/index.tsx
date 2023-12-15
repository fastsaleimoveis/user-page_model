import ScriptInjector from './../../components/ScriptInjector';
import BodyScriptInjector from './../../components/BodyScriptInjector';
import React from 'react';
import { Type1 } from '@/components/parts/type1';
import { Type2 } from '@/components/parts/type2';
import { styled } from 'styled-components';
import './../../app/globals.css';

export async function getServerSideProps(context: any) {
    try {
        const body = {
            domain: 'https://teste3.fastsaleimoveis.com.br',
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

export default function Home({ data }: any) {
    

    console.log(data)

    return (
      <main>
        {data && 
            <ScriptInjector scriptContent={data.data.header_script} />
        }
        {data.data.personal_page_sections.map((page:any, index:number) => (
        <Banner
            key={index}
            style={{
                backgroundColor:`${page.background_color}`,
                backgroundImage:`url(${page.background_image})`,
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
            </div>
        </Banner>
        ))}
        {data && 
            <BodyScriptInjector scriptContent={data.data.body_script} />
        }
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
    background-position:center center;
    background-size:cover;
    min-height:70px;
`;