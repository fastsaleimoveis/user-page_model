'use client';

import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { ImovelCard } from '../card';
import styled from 'styled-components';
import '@mantine/carousel/styles.css';
import Link from 'next/link';

interface Type3Props {
  banner?: any;
  data?: any;
}

export function Type3({ banner, data }: Type3Props) {
  const slideCount = banner.properties.length;
  const isMobile = useMediaQuery('(max-width: 768px)');
  const controlsEnabled = slideCount > (isMobile ? 1 : 3);

  if (!banner) return null;

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

      <Carousel
         withIndicators={controlsEnabled}
         withControls={controlsEnabled}
        height="auto"
        slideSize={isMobile ? '100%' : '33.3333%'}
        slideGap="md"
        align="start"
        slidesToScroll={1}
        styles={{
          indicator: {
            backgroundColor: banner.button_background_color || '#333',
            width: 8,
            height: 8,
            transition: '0.3s',
            '&[data-active]': {
              backgroundColor: banner.title_color || '#000',
            },
          },
          control: {
            color: banner.button_background_color || '#333',
          },
        }}
      >
        {banner.properties.length > 0 &&
          banner.properties.map((imovel: any, index: number) => (
            <Carousel.Slide key={index}>
              <ImovelCard imovel={imovel} data={data} />
            </Carousel.Slide>
          ))}
      </Carousel>

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

    & .swiper{
      padding:0 30px;
    }

    .mySwiper .swiper-button-prev, .mySwiper .swiper-button-next{
      color:${p => p.bgcolor ? p.bgcolor : "#333"};
    }
    .mySwiper .swiper-pagination-bullet-active{
      background-color:${p => p.bgcolor ? p.bgcolor : "#333"}!important;
    }
  `;

