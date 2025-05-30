'use client';

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

export default function ImoveisComp({ data }: any) {
    const [load, setLoad] = useState(true);

    useEffect(() => {
        if(data){
          setLoad(false)
        }
      }, [data])

    return (
      <main>
        {/* {data && 
            <ScriptInjector scriptContent={data.data.header_script} />
        } */}
         <Header data={data.personal_page_headers[0]}/>
        {!load && data.personal_page_sections.sort((a:any, b:any) => a.position - b.position).filter((sections:any) => sections.page_location === 'lista').map((page:any, index:number) => (
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
                    <Type3 banner={page} data={data.personal_page_cards[0]}/>
                }
                {page.type === 4 &&
                    <Type4 banner={page}/>
                }
                {page.type === 5 &&
                    <Type5 banner={page}/>
                }
                {page.type === 6 &&
                    <SearchBar1 banner={page} user={data}/>
                }
                {page.type === 7 &&
                    <SearchBar2 banner={page} user={data}/>
                }
            </div>
            <div className="background-image" style={{
                backgroundImage:`url(${page.background_image})`,
                opacity:page.background_opacity / 100,
            }}></div>
        </Banner>
        ))}
        <PropertiesCatalog pageId={data.page_id} data={data.personal_page_cards[0]}/>
        <Footer data={data.personal_page_footers[0]} user={data.broker_id ? data.broker : data.real_estate}/>
        {/* {data && 
            <BodyScriptInjector scriptContent={data.data.body_script} />
        } */}

        {data.personal_page_assets.map((asset:any, index:number) => (
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