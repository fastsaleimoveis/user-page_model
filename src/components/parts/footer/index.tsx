import styled from 'styled-components';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { LuMapPin } from "react-icons/lu";
import { RiYoutubeLine } from 'react-icons/ri';
import { AiOutlineFacebook } from "react-icons/ai";
import { useEffect, useState } from 'react';

  interface FooterProps {
    data?:any;
  }
  
  export function Footer({
    data,
  }: FooterProps) {
    const [load, setLoad] = useState(true);

    useEffect(() => {
      if(data){
        setLoad(false)
      }
    }, [data])


    return (
      !load ?
      <FooterSection
        bgfooter={data.footer_bg_color}
        heightfooter={data.footer_height}
      >
          <FooterContainer>
            <FooterLogo
              image={data.logo}
              size={data.logo_size}
            ></FooterLogo>
            <FooterMenu>
            {data.menu_on === 'sim' && <FooterLinksMenu
                textcolor={data.text_color}
                textfont={data.text_font}
                textstyle={data.text_style}
                textdec={data.text_decoration}
                texttransform={data.text_transform}
              >
                <h3>Menu</h3>
                <li><a href="/imoveis">Buscar imóvel</a></li>
                <li><a href="/home">Destaques</a></li>
                <li><a href="/sobre">Quem somos</a></li>
              </FooterLinksMenu>}
              <FooterContatoMenu
                textcolor={data.text_color}
                textfont={data.text_font}
                textstyle={data.text_style}
                textdec={data.text_decoration}
                texttransform={data.text_transform}
              >
                <h3>Contato</h3>
                <li><FaWhatsapp />{data.phone}</li>
                <li><LuMapPin />{data.address1}</li>
                <li className="address-2">{data.address2}</li>
                <div className="social-links">
                  {(data.instagram && data.instagram !== '') && <a href={'https://instagram.com/' + data.instagram} target="_blank"><FaInstagram /></a>}
                  {(data.youtube && data.youtube !== '') && <a href={'https://youtube.com/' + data.youtube} target="_blank"><RiYoutubeLine /></a>}
                  {(data.facebook && data.facebook !== '') && <a href={'https://facebook.com/' + data.facebook} target="_blank"><AiOutlineFacebook /></a>}
                </div>
              </FooterContatoMenu>
            </FooterMenu>
          </FooterContainer>
      </FooterSection>
      :
      <></>
    );
  }

const FooterSection = styled.div<{
  bgfooter:string,
  heightfooter:string
}>`
  width:100%;
  padding:${p => p.heightfooter ? p.heightfooter : 30}px 15px;
  background-color:${p => p.bgfooter};
`;

const FooterContainer = styled.div`
  width:100%;
  max-width:1360px;
  margin:0 auto;
  display:flex;
  flex-direction:row;
  justify-content:space-between;

  @media(max-width:768px){
    flex-direction:column;
  }
`;

const FooterLogo = styled.div<{
  image:string,
  size:string,
}>`
  background-image:url("${p => p.image}");
  background-position:center center;
  background-repeat:no-repeat;
  background-size:contain;
  width:${p => p.size ? Number(p.size) * 10 : 200}px;
  height:${p => p.size ? Number(p.size) * 5 : 100}px;
  max-width:100%;
`;

const FooterMenu = styled.div`
  display:flex;
  gap:40px;
  flex-direction:row;
  margin:0;

  @media(max-width:768px){
    gap:20px;
    flex-direction:column};
    margin:20px 0;
  }
`;

const FooterLinksMenu = styled.ul<{
  textcolor: string,
  textfont:string,
  textstyle:string,
  textdec:string,
  texttransform:string,
}>`
  list-style:none;
  display:flex;
  flex-direction:column;
  gap:5px;
  padding:0 20px 0 0;

  @media(max-width:768px){
    padding:0;
  }

  & li{
    cursor:pointer;
    text-transform:uppercase;

    a{
      font-size:14px;
      font-family:${p => p.textfont ? p.textfont : 'Open sans'};
      font-style:${p => p.textstyle ? p.textstyle : 'none'};
      text-decoration:${p => p.textdec ? p.textdec : 'none'};
      font-weight:${p => p.texttransform ? p.texttransform : 500};
      color:${p => p.textcolor ? p.textcolor : '#333'};
    }
  }

  & h3{
    color:${p => p.textcolor ? p.textcolor : '#333'};
    font-size:16px;
  }
`;

const FooterContatoMenu = styled.ul<{
  textcolor: string,
  textfont:string,
  textstyle:string,
  textdec:string,
  texttransform:string,
}>`
  list-style:none;
  display:flex;
  flex-direction:column;
  gap:5px;
  padding:0 20px 0 0;

  & h3{
    color:${p => p.textcolor ? p.textcolor : '#333'};
    font-size:16px;
  }

  @media(max-width:768px){
    padding:0;
  }

  & li{
    text-transform:uppercase;
    font-size:14px;
    font-family:${p => p.textfont ? p.textfont : 'Open sans'};
    font-style:${p => p.textstyle ? p.textstyle : 'none'};
    text-decoration:${p => p.textdec ? p.textdec : 'none'};
    font-weight:${p => p.texttransform ? p.texttransform : 500};
    color:${p => p.textcolor ? p.textcolor : '#333'};
    display:flex;
    align-items:center;
    gap:5px;

    & svg{
      width:18px;
      height:18px;
      color:${p => p.textcolor ? p.textcolor : '#333'};
    }

    &.address-2{
      margin-left:24px;
    }
  }

  & .social-links{
    color:#fff;
    display:flex;
    margin-left:24px;
    margin-top:10px;
    gap:10px;

    & svg{
      width:22px;
      height:22px;
      cursor:pointer;
      transition:0.2s;
      color:${p => p.textcolor ? p.textcolor : '#333'};

      &:hover{
        transform:scale(1.3);
      }
    }
  }
`;