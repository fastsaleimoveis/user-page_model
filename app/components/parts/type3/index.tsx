'use client';

import { Carousel } from '@/app/components/ui/Carousel';
import { ImovelCard } from '../card';
import styled from 'styled-components';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { isValidImovel } from '@/app/utils/validateImovel';

interface Type3Props {
  banner?: any;
  data?: any;
}

export function Type3({ banner, data }: Type3Props) {
  // Filtrar apenas imóveis válidos
  const validProperties = banner?.properties?.filter((imovel: any) => isValidImovel(imovel)) || [];
  const slideCount = validProperties.length;
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const controlsEnabled = slideCount > (isMobile ? 1 : 3);
  const minSlides = isMobile ? 1 : 3;
  const enableCarousel = slideCount > minSlides;

  if (!banner || validProperties.length === 0) return null;

  return (
    <BannerContainer bgcolor={banner.button_background_color} id="destaques">
      <Title
        fontsize={banner.title_size}
        color={banner.title_color}
        fontfamily={banner.title_font}
        fontstyle={banner.title_style}
        textdecoration={banner.title_decoration}
        fontweight={banner.title_transform}
      >
        {banner.title}
      </Title>

      {enableCarousel ? (
        <Carousel
          slidesPerView={isMobile ? 1 : 3}
          spaceBetween={16}
          navigation={true}
          pagination={true}
          loop={false}
          centeredSlides={false}
          indicatorColor="#ccc"
          indicatorActiveColor={banner.title_color || '#000'}
          controlColor={banner.button_background_color || '#333'}
        >
          {validProperties.map((imovel: any, index: number) => (
            <ImovelCard key={index} imovel={imovel} data={data} />
          ))}
        </Carousel>
      ) : (
        <SingleCardWrapper>
          {validProperties.map((imovel: any, index: number) => (
            <ImovelCard key={index} imovel={imovel} data={data} />
          ))}
        </SingleCardWrapper>
      )}

      <ButtonContainer>
        <Button
          fontsize={banner.text_size}
          color={banner.text_color}
          bgcolor={banner.button_background_color}
          fontfamily={banner.text_font}
          fontstyle={banner.text_style}
          textdecoration={banner.text_decoration}
          fontweight={banner.text_transform}
        >
          <Link href="/imoveis">{banner?.text}</Link>
        </Button>
      </ButtonContainer>
    </BannerContainer>
  );
}

const SingleCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-direction:row;
`;

  const Title = styled.h2<{
    fontsize: string,
    color:string,
    fontfamily:string,
    fontstyle:string,
    textdecoration:string,
    fontweight:string
  }>`
    text-align:center;
    margin-bottom:30px;
    font-size:${p => p.fontsize ? p.fontsize : 18}px;
    color:${p => p.color ? p.color : '#333'};
    font-family:${p => p.fontfamily ? p.fontfamily : 'Open sans'};
    font-style:${p => p.fontstyle ? p.fontstyle : 'none'};
    text-decoration:${p => p.textdecoration ? p.textdecoration : 'none'};
    font-weight:${p => p.fontweight ? p.fontweight : 500};
  `;

  const ButtonContainer = styled.div`
    width:100%;
    text-align:center;
    margin-top:30px;
    margin-bottom:10px;
  `;

  const Button = styled.button<{
    fontsize: string,
    color:string,
    fontfamily:string,
    fontstyle:string,
    textdecoration:string,
    fontweight:string,
    bgcolor:string
  }>`
    padding:3px 14px;
    border-radius:20px;
    border:none;
    background-color:${p => p.bgcolor ? p.bgcolor : "#333"};
    color:${p => p.color ? p.color : '#fff'};
    font-size:${p => p.fontsize ? p.fontsize : 16}px;
    font-family:${p => p.fontfamily ? p.fontfamily : 'Open sans'};
    font-style:${p => p.fontstyle ? p.fontstyle : 'none'};
    text-decoration:${p => p.textdecoration ? p.textdecoration : 'none'};
    font-weight:${p => p.fontweight ? p.fontweight : 500};
    transition:0.2s;
    box-shadow:0 2px 2px rgba(0,0,0,0.3);

    &:hover{
      transform:scale(1.05);
    }

    & a{
      text-decoration:none;
      color: inherit;
    }
  `;
  
  const BannerContainer = styled.div<{bgcolor:string}>`
    overflow:hidden;
    width:100%;
    max-width:1024px;
    margin:auto;
    height:100%;
    padding:20px 0;

  `;

