import { IoMdPin } from 'react-icons/io';
import { IoBedOutline, IoCarOutline } from 'react-icons/io5';
import { RxRulerSquare } from "react-icons/rx";
import styled from 'styled-components';
import { useEffect, useState } from 'react';

  interface ImovelCardProps {
   data?:any;
   imovel:any;
  }
  
  export function ImovelCard({
    data, imovel
  }: ImovelCardProps) {

    const [load, setLoad] = useState(true);

    useEffect(() => {
      if(data){
        setLoad(false)
      }
    }, [data])

    const imageWithMinOrder = imovel?.photos?.reduce((min:any, photo:any) => 
      photo.order < min.order ? photo : min, imovel?.photos[0]
    )?.url;

    return (
      !load ?
      <Card className="card" onClick={() => {
        setTimeout(() => {
          window.open('/imovel/' + imovel.slug, '_parent')
        }, 0);
      }}>
        <ImageC style={{backgroundImage:`url('${imageWithMinOrder}')`}}></ImageC>
        <InfoContainer bgcolor={data?.background_color}>
          <Title
            textcolor={data?.text_color}
            textfont={data?.text_font}
            textdecoration={data?.text_decoration}
            texttransform={data?.text_transform}
            textstyle={data?.text_style}
          >{imovel.title}</Title>
          <DetailsCard
            textcolor={data?.text_color}
            textfont={data?.text_font}
            textdecoration={data?.text_decoration}
            texttransform={data?.text_transform}
            textstyle={data?.text_style}
          >
            {(imovel.suites_number && imovel.suites_number > 0) ?
              <span><IoBedOutline />{imovel.suites_number} suítes</span>
            : ((imovel.dorms_number && imovel.dorms_number > 0) ?
                <span><IoBedOutline />{imovel.dorms_number} quartos</span>
                :
                <></>
            )}
            {imovel.parking_spots ? <span><IoCarOutline />{imovel.parking_spots} vagas</span> : <></>}
            
            <span><RxRulerSquare /><>{
              (imovel?.endorsed_measures && parseInt(imovel?.endorsed_measures) !== 0) ? imovel?.endorsed_measures.replace(".", ",").replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,").replace(/(\d)(\d{3}),/g, "$1.$2,") :
              (imovel?.terrain_measures && parseInt(imovel?.terrain_measures) !== 0) ? imovel?.terrain_measures.replace(".", ",").replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,").replace(/(\d)(\d{3}),/g, "$1.$2,") :
              (imovel?.build_measures && parseInt(imovel?.build_measures) !== 0) ? imovel?.build_measures.replace(".", ",").replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,").replace(/(\d)(\d{3}),/g, "$1.$2,") : ''
              }m²</></span>

          </DetailsCard>
          <Price
            textcolor={data?.text_color}
            textfont={data?.text_font}
            textdecoration={data?.text_decoration}
            texttransform={data?.text_transform}
            textstyle={data?.text_style}
          >
            <h5>{((imovel.sell_price ? imovel.sell_price : imovel.sale_value) / 100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h5>
          </Price>
          <InfoFot>
            <Local
              textcolor={data?.text_color}
              textfont={data?.text_font}
              textdecoration={data?.text_decoration}
              texttransform={data?.text_transform}
              textstyle={data?.text_style}
            ><IoMdPin />{imovel.address_properties.city}</Local>
            <Action
              buttoncolor={data?.button_color}
              buttonbgcolor={data?.button_bg_color}
            >{data?.button_text}</Action>
          </InfoFot>
        </InfoContainer>
      </Card>
      :
      <></>
    );
  }

  const Card = styled.div`
    width:100%;
    height:380px;
    background-color:#fff;
    margin:10px auto 30px;
    border-radius:8px;
    cursor:pointer;
    box-shadow:0 0 5px rgba(0,0,0,0.3);
  `;

  const ImageC = styled.div`
    background-position:center center;
    background-size:cover;
    background-color:#cdcdcd;
    height:170px;
    width:100%;
    border-radius: 8px 8px 0 0;
  `;

  const InfoContainer = styled.div<{bgcolor:string}>`
    padding:10px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    height:210px;
    background-color:${p => p.bgcolor ? p.bgcolor : "#fff"};
  `;

  const Title = styled.h2<{
    textcolor:string,
    textfont:string,
    textdecoration:string,
    texttransform:string,
    textstyle:string}>`
    font-size:16px;
    color:${p => p.textcolor ? p.textcolor : "#333"};
    font-family:${p => p.textfont ? p.textfont : 'Open sans'};
    text-decoration:${p => p.textdecoration ? p.textdecoration : 'none'};
    font-weight:${p => p.texttransform ? p.texttransform : 500};
    font-style:${p => p.textstyle ? p.textstyle : 'none'};
  `;

  const DetailsCard = styled.div<{
    textcolor:string,
    textfont:string,
    textdecoration:string,
    texttransform:string,
    textstyle:string
  }>`
    display:flex;
    gap:5px;
    justify-content:space-between;
    align-items:center;
    margin-bottom:7px;

    & span{
      gap:4px;
      display:flex;
      align-items:center;
      font-size:14px;
      color:${p => p.textcolor ? p.textcolor : '#333'};
      font-family:${p => p.textfont ? p.textfont : 'Open sans'};
      text-decoration:${p => p.textdecoration ? p.textdecoration : 'none'};
      font-weight:${p => p.texttransform ? p.texttransform : 500};
      font-style:${p => p.textstyle ? p.textstyle : 'none'};
    }
  `;

  const Price = styled.div<{
    textcolor:string,
    textfont:string,
    textdecoration:string,
    texttransform:string,
    textstyle:string}>`
    display:flex;
    align-items:left;
    justify-content:flex-start;
    padding:5px 0;

    & h5{
      font-size:20px;
      font-weight:600;
      margin:0;
      color:${p => p.textcolor ? p.textcolor : '#333'};
      font-family:${p => p.textfont ? p.textfont : 'Open sans'};
      text-decoration:${p => p.textdecoration ? p.textdecoration : 'none'};
      font-weight:${p => p.texttransform ? p.texttransform : 500};
      font-style:${p => p.textstyle ? p.textstyle : 'none'};
    }
  `;
  
  const InfoFot = styled.div`
    display:flex;
    justify-content:space-between;
    margin-top:5px;
  `;

  const Local = styled.div<{
    textcolor:string,
    textfont:string,
    textdecoration:string,
    texttransform:string,
    textstyle:string}>`
    display:flex;
    gap:2px;
    color:${p => p.textcolor ? p.textcolor : '#888'};
    font-family:${p => p.textfont ? p.textfont : 'Open sans'};
    text-decoration:${p => p.textdecoration ? p.textdecoration : 'none'};
    font-weight:${p => p.texttransform ? p.texttransform : 500};
    font-style:${p => p.textstyle ? p.textstyle : 'none'};
    align-items:center;
    font-size:12px;
  `;

  const Action = styled.a<{buttoncolor:string, buttonbgcolor:string}>`
    height:30px;
    border-radius:30px;
    background-color:${e => e.buttonbgcolor ? e.buttonbgcolor : '#333'};
    padding:3px 10px 0;
    text-decoration:none;
    color:${e => e.buttoncolor ? e.buttoncolor : '#fff'};
    font-weight:600;
    margin:0;
    cursor:pointer;
    transition:0.2s;

    &:hover{
      transform:scale(1.05);
    }
  `;