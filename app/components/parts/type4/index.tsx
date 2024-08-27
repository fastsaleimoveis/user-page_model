import styled from 'styled-components';
import { useEffect, useState } from 'react';

  interface Type4Props {
    banner:any;
  }
  
  export function Type4({
    banner,
  }: Type4Props) {

    const [load, setLoad] = useState(true);

    useEffect(() => {
      if(banner){
        setLoad(false)
      }
    }, [banner])
    
    return (
      !load ?
      <BannerContainer>
        <BannerRow>
          <BannerCol
            fontsize={banner.title_size}
            color={banner.title_color}
            fontfamily={banner.title_font}
            fontstyle={banner.title_style}
            textdecoration={banner.title_decoration}
            fontweight={banner.title_transform}
            >
              <h3>{banner?.title}</h3>
              <TextContainer
                fontsize={banner.text_size}
                color={banner.text_color}
                fontfamily={banner.text_font}
                fontstyle={banner.text_style}
                textdecoration={banner.text_decoration}
                fontweight={banner.text_transform}
              >
                <p>{banner?.text}</p>
              </TextContainer>
          </BannerCol>
        </BannerRow>
      </BannerContainer>
      :
      <></>
    );
  }

  const BannerContainer = styled.div`
    overflow:hidden;
    width:100%;
    max-width:960px;
    margin:auto;
    height:100%;
  `;

  const BannerRow = styled.div`
    display:flex;
    flex-wrap:wrap;
    gap:20px;
    width:100%;
    height:100%;
    align-items:center;
  `;

  const BannerCol = styled.div<{
    fontsize: string,
    color:string,
    fontfamily:string,
    fontstyle:string,
    textdecoration:string,
    fontweight:string
  }>`
    flex:1;
    display:flex;
    gap:10px;
    flex-direction:column;
    justify-content:center;
    padding:20px 0;
    height:100%;

    & pre{
      margin:0;
      overflow:hidden;
    }

    & h3{
        line-height:1;
        font-size:${p => p.fontsize ? p.fontsize : 18}px;
        color:${p => p.color ? p.color : '#333'};
        font-family:${p => p.fontfamily ? p.fontfamily : 'Open sans'};
        font-style:${p => p.fontstyle ? p.fontstyle : 'none'};
        text-decoration:${p => p.textdecoration ? p.textdecoration : 'none'};
        font-weight:${p => p.fontweight ? p.fontweight : 500};
        text-align:center;
        padding:0 20px;
    }

    & p{
      padding:0 20px;
    }
  `;

  const TextContainer = styled.div<{
    fontsize: string,
    color:string,
    fontfamily:string,
    fontstyle:string,
    textdecoration:string,
    fontweight:string
  }>`

    & p{
      margin:0;
      text-align:left;
      font-size:${p => p.fontsize ? p.fontsize : 18}px;
      color:${p => p.color ? p.color : '#333'};
      font-family:${p => p.fontfamily ? p.fontfamily : 'Open sans'};
      font-style:${p => p.fontstyle ? p.fontstyle : 'none'};
      text-decoration:${p => p.textdecoration ? p.textdecoration : 'none'};
      font-weight:${p => p.fontweight ? p.fontweight : 500};
    }
  `;