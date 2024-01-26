import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

  interface HeaderProps {
    data?:any;
  }
  
  export function Header({
    data,
  }: HeaderProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [load, setLoad] = useState(true);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
      if(window.innerWidth <= 768){
        setIsMobile(true)
      }
    }, []);

    useEffect(() => {
      if(data){
        setLoad(false)
      }
    }, [data])



    return (
      !load ?
      <>
        <HeaderSection bgcolor={data.header_bg_color}>
          <HeaderContainer headerheight={data.header_height}>
            <HeaderLogo
              href="/home"
              logoheight={data.logo_size}
              image={data.logo}
            ></HeaderLogo>
            {data.menu_on === 'sim' &&
              (!isMobile ? <HeaderMenu
              textcolor={data.text_color}
              textfont={data.text_font}
              textstyle={data.text_style}
              textdecoration={data.text_decoration}
              texttransform={data.text_transform}
              >
                <li><Link href="/imoveis">Buscar imóvel</Link></li>
                <li><Link href="/home">Destaques</Link></li>
                <li><Link href="/sobre">Quem somos</Link></li>
              </HeaderMenu>
              :
              <ToogleMenu
                textcolor={data.text_color}
                onClick={() => setShowMenu(!showMenu)}
              >
                <span></span>
                <span></span>
                <span></span>
              </ToogleMenu>)
          }
          </HeaderContainer>
        </HeaderSection>
          {showMenu &&
            <MobileMenuContainer
              bgcolor={data.header_bg_color}
              textcolor={data.text_color}
              textfont={data.text_font}
              textstyle={data.text_style}
              textdecoration={data.text_decoration}
              texttransform={data.text_transform}
            >
              <li><Link href="/imoveis">Buscar imóvel</Link></li>
              <li><Link href="/home">Destaques</Link></li>
              <li><Link href="/sobre">Quem somos</Link></li>
            </MobileMenuContainer>
          }
        </>
        :
        <></>
    );
  }

  const ToogleMenu = styled.div<{textcolor:any}>`
    width:45px;
    height:45px;
    border-radius:5px;
    border:solid 1px ${p => p.textcolor ? p.textcolor : '#333'};
    margin-right:10px;
    padding:5px;
    display:flex;
    justify-content:space-around;
    flex-direction:column;
    cursor:pointer;

    & span{
      width:100%;
      height:2px;
      background-color:${p => p.textcolor ? p.textcolor : '#333'};
    }
  `;

  const HeaderSection = styled.div<{bgcolor: string}>`
    width:100%;
    padding:0 15px;
    background-color:${e => e.bgcolor ? e.bgcolor : '#fff'};
    box-shadow: 0 0 5px rgba(0,0,0,0.3);
  `;

  const HeaderContainer = styled.div<{headerheight: string}>`
    max-width:1360px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin:0 auto;
    padding:6px 0;
    height:${p => p.headerheight ? p.headerheight : 60}px;
  `;

  const MobileMenuContainer = styled.div<{
    bgcolor:string,
    textcolor: string,
    textfont:string,
    textstyle:string,
    textdecoration:string,
    texttransform:string
  }>`
    position:fixed;
    top:80px;
    left:0;
    right:0;
    background-color:${e => e.bgcolor ? e.bgcolor : '#fff'};
    width:100%;
    z-index:90;
    padding:20px;

    & li{
      list-style:none;
      height:40px;
      display:flex;
      align-items:center;
      width: calc(100% - 40px);

      a{
        font-family:${p => p.textfont ? p.textfont : 'Open sans'};
        font-style:${p => p.textstyle ? p.textstyle : 'none'};
        text-decoration:${p => p.textdecoration ? p.textdecoration : 'none'};
        font-weight:${p => p.texttransform ? p.texttransform : 500};
        color:${p => p.textcolor ? p.textcolor : '#333'}!important;
      }

      &:hover a{
        color:${p => p.bgcolor ? p.bgcolor : '#333'};
        background-color:${e => e.textcolor ? e.textcolor : '#fff'};
      }
    }
  `;

  const HeaderLogo = styled.a<{image:string, logoheight:string}>`
    background-image:url("${p => p.image}");
    background-size:contain;
    background-repeat:no-repeat;
    background-position:center center;
    width:${p => p.logoheight ? Number(p.logoheight) * 10 : 120}px;
    height:100%;
  `;

  const HeaderMenu = styled.ul<{
    textcolor: string,
    textfont:string,
    textstyle:string,
    textdecoration:string,
    texttransform:string
  }>`
    display:flex;
    gap:10px;
    list-style:none;
    margin:0;

    & li{
      a{
        text-transform:uppercase;
        font-size:14px;
        font-family:${p => p.textfont ? p.textfont : 'Open sans'};
        font-style:${p => p.textstyle ? p.textstyle : 'none'};
        text-decoration:${p => p.textdecoration ? p.textdecoration : 'none'};
        font-weight:${p => p.texttransform ? p.texttransform : 500};
        color:${p => p.textcolor ? p.textcolor : '#333'}!important;
      }
      cursor:pointer;

      &:hover a{
        text-decoration:underline;
        color:#333;
      }
    }
  `;