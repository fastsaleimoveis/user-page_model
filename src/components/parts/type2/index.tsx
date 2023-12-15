import styled from 'styled-components';

  interface Type2Props {
    banner:any;
  }
  
  export function Type2({
    banner,
  }: Type2Props) {

    return (
      <BannerContainer>
        <BannerRow>
          <BannerColImage>
            <Image
              image={banner.high_image}
              imageHeight={banner.high_image_height}
              imageWidth={banner.high_image_width}
            ></Image>
          </BannerColImage>
          <BannerCol
            fontSize={banner.title_size}
            color={banner.title_color}
            fontFamily={banner.title_font}
            fontStyle={banner.title_style}
            textDecoration={banner.title_decoration}
            fontWeight={banner.title_transform}
            >
              <pre><h3>{banner?.title}</h3></pre>
              <TextContainer
                fontSize={banner.text_size}
                color={banner.text_color}
                fontFamily={banner.text_font}
                fontStyle={banner.text_style}
                textDecoration={banner.text_decoration}
                fontWeight={banner.text_transform}
              >
                <p>{banner?.text}</p>
              </TextContainer>
          </BannerCol>
        </BannerRow>
      </BannerContainer>
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
    fontSize: string,
    color:string,
    fontFamily:string,
    fontStyle:string,
    textDecoration:string,
    fontWeight:string
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
        font-size:${p => p.fontSize}px;
        color:${p => p.color};
        font-family:${p => p.fontFamily};
        font-style:${p => p.fontStyle};
        text-decoration:${p => p.textDecoration};
        font-weight:${p => p.fontWeight};
    }
  `;

  const TextContainer = styled.div<{
    fontSize: string,
    color:string,
    fontFamily:string,
    fontStyle:string,
    textDecoration:string,
    fontWeight:string
  }>`

    & p{
      margin:0;
      text-align:left;
      font-size:${p => p.fontSize}px;
      color:${p => p.color};
      font-family:${p => p.fontFamily};
      font-style:${p => p.fontStyle};
      text-decoration:${p => p.textDecoration};
      font-weight:${p => p.fontWeight};
    }
  `
  
  const BannerColImage = styled.div`
    flex:1;
  `;

  const Image = styled.div<{
    image:string,
    imageHeight:number,
    imageWidth:number,
  }>`
    background-position:center center;
    background-size:cover;
    background-image:url(${p => p.image});
    width:${p => p.imageWidth ? (p.imageWidth * 10) + 'px' : '100%'};
    height:${p => p.imageHeight ? (p.imageHeight * 10) + 'px' : '100%'};
    background-color:#333;
  `;