import styled from 'styled-components';
import { useEffect, useState } from 'react';

  interface Type2Props {
    banner:any;
  }
  
  export function Type5({
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
            <Image
              image={banner.high_image}
              imageheight={banner.high_image_height}
              imagewidth={banner.high_image_width}
            ></Image>
          </BannerColImage>
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
  
  const BannerColImage = styled.div`
    flex:1;
    display:flex;
    justify-content:center;
  `;

  const Image = styled.div<{
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