import ScriptInjector from '@/app/components/ScriptInjector';
import BodyScriptInjector from '@/app/components/BodyScriptInjector';
import React from 'react';
import '@/app/globals.css';
import { Header } from '@/app/components/parts/header';
import { Footer } from '@/app/components/parts/footer';
import { Whats } from '@/app/components/parts/whats';
import { Cooklies } from '@/app/components/parts/cookies';
import { Property } from '@/app/components/parts/property';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ImovelComp({ data, imovel }: any) {
    if (!data) {
      return (
        <div className='loader-container'>
          <p>Carregando...</p>
        </div>
      );
    }

    return (
      <main style={{boxSizing: 'initial'}}>
        {/* {data && 
            <ScriptInjector scriptContent={data.data.header_script} />
        } */}
        {data.personal_page_headers && data.personal_page_headers.length > 0 && (
          <Header data={data.personal_page_headers[0]}/>
        )}
        {data.personal_page_sections && data.personal_page_sections
          .filter((sections:any) => sections.page_location === 'imovel')
          .map((page:any, index:number) => (
            <div key={index} style={{width:'100%', padding:'0', position:'relative', zIndex:'1'}}>
                {page.type === 10 &&
                    <Property 
                      pageId={data.page_id} 
                      imovel={imovel?.imovel} 
                      broker={data.broker} 
                      realEstate={data.real_estate} 
                      banner={page} 
                      data={data.personal_page_cards?.[0]}
                    />
                }
            </div>
        ))}
        {data.personal_page_footers && data.personal_page_footers.length > 0 && (
          <Footer 
            data={data.personal_page_footers[0]} 
            user={data.broker_id ? data.broker : data.real_estate}
          />
        )}
        {/* {data && 
            <BodyScriptInjector scriptContent={data.data.body_script} />
        } */}

        {data.personal_page_assets && data.personal_page_assets.map((asset:any, index:number) => (
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