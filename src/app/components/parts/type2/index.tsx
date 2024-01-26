import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

  interface Type2Props {
    banner:any;
  }
  
  export function Type2({
    banner,
  }: Type2Props) {
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
          <BannerColImage>
            <ImageC
              image={banner.high_image}
              imageheight={banner.high_image_height}
              imagewidth={banner.high_image_width}
            ></ImageC>
          </BannerColImage>
          <BannerCol
            fontsize={banner.title_size}
            color={banner.title_color}
            fontfamily={banner.title_font}
            fontstyle={banner.title_style}
            textdecoration={banner.title_decoration}
            fontweight={banner.title_transform}
            >
              <pre><h3>{banner?.title}</h3></pre>
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
    flex-direction:row;
    gap:20px;
    width:100%;
    height:100%;
    align-items:center;

    @media(max-width:768px){
      flex-direction:column;
    }
  `;

  const BannerCol = styled.div<{
    fontsize: string,
    color:string,
    fontfamily:string,
    fontstyle:string,
    textdecoration:string,
    fontweight:string,
  }>`
    flex:1;
    display:flex;
    gap:10px;
    flex-direction:column;
    align-items:flex-start;
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
      font-size:${p => p.fontsize ? p.fontsize : 16}px;
      color:${p => p.color ? p.color : '#333'};
      font-family:${p => p.fontfamily ? p.fontfamily : 'Open sans'};
      font-style:${p => p.fontstyle ? p.fontstyle : 'none'};
      text-decoration:${p => p.textdecoration ? p.textdecoration : 'none'};
      font-weight:${p => p.fontweight ? p.fontweight : 500};
    }
  `
  
  const BannerColImage = styled.div`
    flex:1;
    width:auto;

    @media(max-width:768px){
      width:100%!important;
    }
  `;

  const ImageC = styled.div<{
    image:string,
    imageheight:number,
    imagewidth:number,
  }>`
    background-position:center center;
    background-size:cover;
    background-image:url(${p => p.image});
    width:${p => p.imagewidth ? (p.imagewidth * 10) + 'px' : '100%'};
    height:${p => p.imageheight ? (p.imageheight * 10) + 'px' : '100%'};
    background-color:#333;
  `;