import styled from 'styled-components';
import { useEffect, useState } from 'react';

  interface Type1Props {
    banner:any;
  }
  
  export function Type1({
    banner,
  }: Type1Props) {

    const [load, setLoad] = useState(true);

    useEffect(() => {
      if(banner){
        setLoad(false)
      }
    }, [banner])

    return (
      !load ?
        <BannerContainer
            fontsize={banner.title_size}
            color={banner.title_color}
            fontfamily={banner.title_font}
            fontstyle={banner.title_style}
            textdecoration={banner.title_decoration}
            fontweight={banner.title_transform}
            >
                <h3>{banner?.title}</h3>
        </BannerContainer>
        :
        <></>
    );
  }

  const BannerContainer = styled.pre<{
    fontsize: string,
    color:string,
    fontfamily:string,
    fontstyle:string,
    textdecoration:string,
    fontweight:string
  }>`
    overflow:hidden;

    & h3{
        line-height:1;
        font-size:${p => p.fontsize ? p.fontsize : 18}px;
        color:${p => p.color ? p.color : '#333'};
        font-family:${p => p.fontfamily ? p.fontfamily : 'Open sans'};
        font-style:${p => p.fontstyle ? p.fontstyle : 'none'};
        text-decoration:${p => p.textdecoration ? p.textdecoration : 'none'};
        font-weight:${p => p.fontweight ? p.fontweight : 500};
        position: relative;
        z-index: 999; 
    }
  `;