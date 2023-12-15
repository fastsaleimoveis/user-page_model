import styled from 'styled-components';

  interface Type1Props {
    banner:any;
  }
  
  export function Type1({
    banner,
  }: Type1Props) {

    return (
        <BannerContainer
            fontSize={banner.title_size}
            color={banner.title_color}
            fontFamily={banner.title_font}
            fontStyle={banner.title_style}
            textDecoration={banner.title_decoration}
            fontWeight={banner.title_transform}
            >
                <h3>{banner?.title}</h3>
        </BannerContainer>
    );
  }

  const BannerContainer = styled.pre<{
    fontSize: string,
    color:string,
    fontFamily:string,
    fontStyle:string,
    textDecoration:string,
    fontWeight:string
  }>`
    overflow:hidden;

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