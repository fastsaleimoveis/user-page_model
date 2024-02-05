import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';
import { IoBedOutline, IoCarOutline, IoLogoWhatsapp } from 'react-icons/io5';
import { RxRulerSquare } from 'react-icons/rx';
import Fancybox from './Fancybox';
import { FiShare2 } from 'react-icons/fi';
import { ImovelCard } from '../card';
import { useEffect, useState } from 'react';
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import axios from 'axios';
import Link from 'next/link';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { BiLogoFacebookSquare } from 'react-icons/bi';
import { BsLinkedin } from "react-icons/bs";
import { SiTelegram } from "react-icons/si";
import { MdOutlineContentCopy } from 'react-icons/md';

  interface PropertyProps {
    banner:any;
    data:any;
    imovel:any;
    broker?:any;
    realEstate?:any;
    pageId:number
  }
  
  export function Property({
    banner,
    data,
    imovel,
    broker,
    realEstate,
    pageId
  }: PropertyProps) {

    const [isMobile, setIsMobile] = useState(false);
    const [load, setLoad] = useState(true);
    const [imoveis, setImoveis] = useState([])
    const [showShareModal, setShowShareModal] = useState(false)
    const [copySuccess, setCopySuccess] = useState('')

    const toggle = () => setShowShareModal(!showShareModal);

    useEffect(() => {
      NativeFancybox.bind("[data-fancybox='gallery']", {});
      
      return () => {
          NativeFancybox.destroy();
      };
  }, []);

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

      useEffect(() => {
        if(pageId){
        axios.post('https://dev.fastsaleimoveis.com.br/api/personal-pages/get-properties?page=1', {
            categories: [imovel.categories.name],
            dorms_number: 0,
            parking_spots:  0,
            local: imovel.address_properties.city,
            max_value: imovel.sale_value + 100000000,
            min_value: imovel.sale_value - 100000000,
            search: '',
            personal_page_id: pageId,
        })
        .then(response => {
            setImoveis(response.data.data);
        });
      }
        /* eslint-disable */
      }, [pageId])

    return (
      imovel ?
        <SingleProperty
          bgcolor={banner.button_background_color}
          color={banner.title_color}
          fontfamily={banner.title_font}
          fontstyle={banner.title_style}
          textdecoration={banner.title_decoration}
          fontweight={banner.title_transform}
        >
          <Swiper
            slidesPerView={isMobile ? 1 : 3}
            spaceBetween={10}
            navigation={true}
            centeredSlides={true}
            loop={true}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            {imovel.photos.sort((a:any, b: any) => parseInt(a.order) - parseInt(b.order)).map((photo:any, index:number) => (
              <SwiperSlide key={index}>
                <Fancybox options={{ infinite: false }} delegate="[data-fancybox='gallery']">
                  <CarouselImage data-fancybox="gallery" src={photo.url}></CarouselImage>
                </Fancybox>
              </SwiperSlide>
            ))}
          </Swiper>
          <PropertyContent isMobile={isMobile}>
            <PropertyBody
              fontsize={banner.title_size}
              color={banner.title_color}
              fontfamily={banner.title_font}
              fontstyle={banner.title_style}
              textdecoration={banner.title_decoration}
              fontweight={banner.title_transform}
              buttoncolor={banner.text_color}
              buttonbgcolor={banner.button_background_color}
              buttonfontfamily={banner.text_font}
              buttonfontstyle={banner.text_style}
              buttontextdecoration={banner.text_decoration}
              buttonfontweight={banner.text_transform}
            >
              <h3>{imovel.title}</h3>
              <div className="city">
                <p>{imovel.address_properties.city}/{imovel.address_properties.state}</p><button onClick={toggle}><FiShare2 />Compartilhe</button>
              </div>
              <div className="details">
              {(imovel.suites_number && imovel.suites_number > 0) ?
                  <span><IoBedOutline />{imovel.suites_number} suítes</span>
                : ((imovel.dorms_number && imovel.dorms_number > 0) ?
                    <span><IoBedOutline />{imovel.dorms_number} quartos</span>
                    :
                    <></>
                )}
                {imovel.parking_spots ? <span><IoCarOutline />{imovel.parking_spots} vagas</span> : <></>}
                
                <span><RxRulerSquare /><>{
                  (imovel?.endorsed_measures && parseInt(imovel?.endorsed_measures) !== 0) ? imovel?.endorsed_measures.replace(".", ",").replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,").replace(/(\d)(\d{3}),/g, "$1.$2,") :
                  (imovel?.terrain_measures && parseInt(imovel?.terrain_measures) !== 0) ? imovel?.terrain_measures.replace(".", ",").replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,").replace(/(\d)(\d{3}),/g, "$1.$2,") :
                  (imovel?.build_measures && parseInt(imovel?.build_measures) !== 0) ? imovel?.build_measures.replace(".", ",").replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,").replace(/(\d)(\d{3}),/g, "$1.$2,") : ''
                  }m²</></span>
              </div>
              <div className="priceContainer">
                <div className="price">
                  <h3>{((imovel.sell_price ? imovel.sell_price : imovel.sale_value) / 100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h3>
                </div>
                <button><IoLogoWhatsapp />{banner.text}</button>
                <div className="broker">
                  <div className="broker-cover" style={{
                    backgroundImage:`url('${realEstate ? realEstate.profile_photo : broker ? broker.profile_photo : ''}')`
                  }}></div>
                  <div className="broker-name">
                    <p>{realEstate ? realEstate.name : broker ? broker.name : ''}</p>
                    <p>CRECI: {realEstate ? realEstate.creci_j : broker ? broker.creci : ''}</p>
                  </div>
                </div>
              </div>
              <div className="description">
                  <h3>Descrição</h3>
                  <div style={{ whiteSpace: 'pre-line' }}>{imovel.description}</div>
                  <h3 style={{marginTop:'20px'}}>Tags</h3>
                  <div className="features-container">
                    {imovel.features?.map((feature: any, index: number) => (
                      <span key={index}>{feature.name}</span>
                    ))}
                  </div>
              </div>
            </PropertyBody>
            <PropertySideBar
              color={banner.title_color}
              fontfamily={banner.title_font}
              fontstyle={banner.title_style}
              textdecoration={banner.title_decoration}
              fontweight={banner.title_transform}
              buttoncolor={banner.text_color}
              buttonbgcolor={banner.button_background_color}
              buttonfontfamily={banner.text_font}
              buttonfontstyle={banner.text_style}
              buttontextdecoration={banner.text_decoration}
              buttonfontweight={banner.text_transform}
            >
              <div className="priceContainer">
                <div className="price">
                  <h3>{((imovel.sell_price ? imovel.sell_price : imovel.sale_value) / 100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h3>
                </div>
                <button><Link href={`https://wa.me/55${realEstate ? realEstate.phone?.replace(/[()\s-]/g, '') : broker ? broker.phone.replace(/[()\s-]/g, '') : ''}`} target="_blank"><IoLogoWhatsapp />{banner.text}</Link></button>
                <div className="broker">
                  <div className="broker-cover" style={{
                    backgroundImage:`url('${realEstate ? realEstate.profile_photo : broker ? broker.profile_photo : ''}')`
                  }}></div>
                  <div className="broker-name">
                    <p>{realEstate ? realEstate.name : broker ? broker.name : ''}</p>
                    <p>CRECI: {realEstate ? realEstate.creci_j : broker ? broker.creci : ''}</p>
                  </div>
                </div>
              </div>
            </PropertySideBar>
          </PropertyContent>
          <div className="relatedProperties">
            <h3>Imóveis relacionados</h3>
            <Swiper
              slidesPerView={isMobile ? 1 : 3}
              spaceBetween={30}
              navigation={true}
              centeredSlides={true}
              loop={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {imoveis.length > 0 && imoveis.map((imovel:any, index:number) => (
                <SwiperSlide key={index}><ImovelCard imovel={imovel.properties} data={data}/></SwiperSlide>
              ))}
            </Swiper>
          </div>

          <Modal
            isOpen={showShareModal} toggle={toggle}
          >
            <ModalHeader toggle={toggle}>
              <div className="popupText">
                <p>Compartilhar imóvel</p>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="share-options-container">
                <CopyShareInput>
                  <input id="shareInput" value={window.location.href} disabled></input>
                  <span onClick={async () => {
                    const inputElement = document.getElementById('shareInput') as HTMLInputElement;

                    if (inputElement) {
                      try {
                        await navigator.clipboard.writeText(inputElement.value);
                        setCopySuccess('URL copiada para a área de transferência');
                      } catch (err) {
                        setCopySuccess('Erro ao copiar para a área de transferência');
                      }
                    } else {
                      setCopySuccess('Erro ao copiar para a área de transferência');
                    }
                  }}><MdOutlineContentCopy /></span>
                </CopyShareInput>
                {copySuccess && <p>{copySuccess}</p>}
                <IconsShareContainer>
                  <div className="share-option" onClick={() => {
                    setTimeout(() => {
                      window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(window.location.href), '_blank')
                    }, 100);
                  }}>
                    <IoLogoWhatsapp color="#52C665"/>
                  </div>
                  <div className="share-option" onClick={() => {
                    setTimeout(() => {
                      window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href), '_blank')
                    }, 100);
                  }}>
                    <BiLogoFacebookSquare color="#0078F6"/>
                  </div>
                  <div className="share-option" onClick={() => {
                    setTimeout(() => {
                      window.open("https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(window.location.href), '_blank')
                    }, 100);
                  }}>
                    <BsLinkedin color="#0066A1"/>
                  </div>
                  <div className="share-option" onClick={() => {
                    setTimeout(() => {
                      window.open("https://telegram.me/share/url?url=" + encodeURIComponent(window.location.href), '_blank')
                    }, 100);
                  }}>
                    <SiTelegram color="#0088CC"/>
                  </div>
                </IconsShareContainer>
              </div>
              <ModalFooter>
                <div className="popupButtons">
                  <Button onClick={toggle}>Fechar</Button>
                </div>
              </ModalFooter>
            </ModalBody>
          </Modal>
          
        </SingleProperty>
        :
        <></>
    );
  }

  const CopyShareInput = styled.div`
    display:flex;
    width:100%;
    align-items:center;

    & span{
      width:40px;
      height:40px;
      border:solid 1px #cdcdcd;
      border-radius:0 5px 5px 0;
      display:flex;
      align-items:center;
      justify-content:center;
      cursor:pointer;

      & svg{
        width:22px;
        height:22px;
      }
    }

    & input{
      width:calc(100% - 40px);
      height:40px;
    }
  `;

  const IconsShareContainer = styled.div`
    display:flex;
    gap:15px;
    margin:30px 0 20px;

    svg{
      cursor:pointer;
      width:30px;
      height:30px;
      transition:0.2s;

      &:hover{
        transform:scale(1.2);
      }
    }
  `;

const PropertyContent = styled.div<{isMobile: boolean}>`
  width:100%;
  max-width:1024px;
  margin:40px auto;
  display:flex;
  padding:0 10px;
  flex-direction:${p => p.isMobile ? 'column' : 'row'};
  gap:20px;
`;

const PropertyBody = styled.div<{
  fontsize: string,
  color:string,
  fontfamily:string,
  fontstyle:string,
  textdecoration:string,
  fontweight:string,
  buttoncolor:string,
  buttonbgcolor:string,
  buttonfontfamily:string,
  buttonfontstyle:string,
  buttontextdecoration:string,
  buttonfontweight:string,
}>`
  flex:5;
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:flex-start;

  & h3{
    text-align:left;
    max-width:620px;
    font-weight:${p => p.fontweight};
    color:${p => p.color};
    font-family:${p => p.fontfamily};
    font-style:${p => p.fontstyle};
    text-decoration:${p => p.textdecoration};
    font-size:${p => p.fontsize}px;
  }

  & .city{
    display:flex;
    margin:20px 0;
    gap:10px;
    align-items:center;

    & p{
      margin:0;
      font-weight:${p => p.fontweight};
      color:${p => p.color};
      font-family:${p => p.fontfamily};
      font-style:${p => p.fontstyle};
      text-decoration:${p => p.textdecoration};
    }

    & button{
      border:none;
      border-radius:5px;
      display:flex;
      gap:5px;
      align-items:center;
      transition:0.2s;
      background-color:${p => p.buttonbgcolor};
      font-weight:${p => p.buttonfontweight};
      color:${p => p.buttoncolor};
      font-family:${p => p.buttonfontfamily};
      font-style:${p => p.buttonfontstyle};
      text-decoration:${p => p.buttontextdecoration};

      &:hover{
        transform:scale(1.03);
      }
    }
  }

  & .details{
    margin:10px 0;
    display:flex;
    gap:25px;

    & span{
      font-weight:${p => p.fontweight};
      font-size:18px;
      display:flex;
      gap:5px;
      align-items:center;
      color:${p => p.color};
      font-family:${p => p.fontfamily};
      font-style:${p => p.fontstyle};
    }
  }

  & .description{
    margin-top:20px;
    text-align:left;
    border:solid 1px #cdcdcd;
    padding:10px;
    border-radius:10px;
    max-width: 100%;

    & .features-container{
      display:flex;
      flex-wrap:wrap;
      gap:2px 5px;

      & span{
        display:block;
        background-color:#cdcdcd;
        border-radius:20px;
        padding:2px 7px;
        white-space:nowrap;
        margin:5px 0;
      }
    }

    h3{
      font-size:16px;
      text-transform:uppercase;
      font-weight:${p => p.fontweight};
      color:${p => p.color};
      font-family:${p => p.fontfamily};
      font-style:${p => p.fontstyle};
      text-decoration:${p => p.textdecoration};
    }

    ul{
      padding:0 0 0 20px;

      @media(max-width:768px){
        padding:0;
      }
    }

    li{
      list-style:none;
    }
  }

  & .priceContainer{
    width:100%;
    box-shadow:0 0 5px rgba(0,0,0,0.3);
    padding:10px;
    border-radius:5px;
    display:none;

    @media(max-width:768px){
      display:block;
    }

    & .price{
      border:solid 1px #cdcdcd;
      display:flex;
      align-items:center;
      justify-content:center;
      height:40px;
      border-radius:5px;

      & h3{
        margin:0;
        font-size:22px;
        font-weight:${p => p.fontweight};
        color:${p => p.color};
        font-family:${p => p.fontfamily};
        font-style:${p => p.fontstyle};
        text-decoration:${p => p.textdecoration};
      }
    }

    & a{
      text-decoration:none;
      color: inherit;
    }
    & button{
      width:calc(100% - 10px);
      border:none;
      background-color:${p => p.buttonbgcolor};
      display:flex;
      gap:5px;
      align-items:center;
      margin-top:15px;
      height:35px;
      font-weight:${p => p.buttonfontweight};
      color:${p => p.buttoncolor};
      font-family:${p => p.buttonfontfamily};
      font-style:${p => p.buttonfontstyle};
      text-decoration:${p => p.buttontextdecoration};
      border-radius:5px;
      justify-content:center;
      transition:0.2s;

      &:hover{
        transform:scale(1.03);
      }
    }

    & .broker{
      margin-top:20px;
      display:flex;
      flex-direction:column;
      gap:10px;
      align-items:center;
      text-align:center;
  
      & p{
        margin:0;
        font-weight:600;
        text-align: center;
      }
  
      & .broker-cover{
        width:80px;
        height:80px;
        border-radius:50%;
        background-color:#cdcdcd;
        background-position: center center;
        background-size:cover;
      }
    }
`;

const PropertySideBar = styled.div<{
  color:string,
  fontfamily:string,
  fontstyle:string,
  textdecoration:string,
  fontweight:string,
  buttoncolor:string,
  buttonbgcolor:string,
  buttonfontfamily:string,
  buttonfontstyle:string,
  buttontextdecoration:string,
  buttonfontweight:string,
}>`
  flex:2;

  & .priceContainer{
    width:100%;
    box-shadow:0 0 5px rgba(0,0,0,0.3);
    padding:10px;
    border-radius:5px;
    display:block;

    & a{
      text-decoration:none;
      color: inherit;
      display:flex;
      justify-content:center;
      align-items:center;
      gap:5px;
    }

    @media(max-width:768px){
      display:none;
    }

    & .price{
      border:solid 1px #cdcdcd;
      display:flex;
      align-items:center;
      justify-content:center;
      height:40px;
      border-radius:5px;

      & h3{
        margin:0;
        font-size:22px;
        font-weight:${p => p.fontweight};
        color:${p => p.color};
        font-family:${p => p.fontfamily};
        font-style:${p => p.fontstyle};
        text-decoration:${p => p.textdecoration};
      }
    }

    & button{
      width:calc(100% - 10px);
      border:none;
      background-color:${p => p.buttonbgcolor};
      margin-top:15px;
      height:35px;
      font-weight:${p => p.buttonfontweight};
      color:${p => p.buttoncolor};
      font-family:${p => p.buttonfontfamily};
      font-style:${p => p.buttonfontstyle};
      text-decoration:${p => p.buttontextdecoration};
      border-radius:5px;

      transition:0.2s;

      &:hover{
        transform:scale(1.03);
      }
    }
  }

  & .broker{
    margin-top:20px;
    display:flex;
    flex-direction:column;
    gap:10px;
    align-items:center;

    & p{
      margin:0;
      font-weight:600;
      text-align:center;
    }

    & .broker-cover{
      width:80px;
      height:80px;
      border-radius:50%;
      background-color:#cdcdcd;
      background-position: center center;
      background-size:cover;
    }
  }
`;

const SingleProperty = styled.div<{
  bgcolor:string,
  color:string,
  fontfamily:string,
  fontstyle:string,
  textdecoration:string,
  fontweight:string,
}>`
  .mySwiper .swiper-button-prev, .mySwiper .swiper-button-next{
    color:${p => p.bgcolor};
  }
  .mySwiper .swiper-pagination-bullet-active{
    background-color:${p => p.bgcolor}!important;
  }

  & .relatedProperties{
    max-width:960px;
    margin:20px auto 40px;

    & .card{
      width:300px;
      margin:20px auto 40px;
    }

    & h3{
      font-size:24px;
      font-weight:${p => p.fontweight};
      color:${p => p.color};
      font-family:${p => p.fontfamily};
      font-style:${p => p.fontstyle};
      text-decoration:${p => p.textdecoration};

      @media(max-width:768px){
        text-align:center;
      }
    }
  }
`;

const CarouselImage = styled.img`
  width:100%;
  height:380px;
  object-fit:cover;
  object-position:center center;
`;