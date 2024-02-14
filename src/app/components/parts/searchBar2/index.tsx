import { HiMapPin } from 'react-icons/hi2';
import { BiSolidBusiness } from "react-icons/bi";
import styled from 'styled-components';
import { IoIosBed, IoMdCar } from 'react-icons/io';
import { MdCurrencyExchange } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { Input } from 'reactstrap';
import axios from 'axios';
import { useRouter } from 'next/router';

  interface SearchBar2Props {
    banner:any;
    user:any
  }
  
  export function SearchBar2({
    banner, user
  }: SearchBar2Props) {

    const router = useRouter();

    const [load, setLoad] = useState(true);
    const [category, setCategory] = useState('')
    const [localList, setLocalList] = useState([])
    const [local, setLocal] = useState('')
    const [search, setSearch] = useState('')
    const [rooms, setRooms] = useState(0)
    const [garage, setGarage] = useState(0)
    const [price, setPrice] = useState(0)

    useEffect(() => {
      if(user.page_id){
        axios.get('https://dev.fastsaleimoveis.com.br/api/personal-pages/get-properties-cities/' + user.page_id)
        .then(response => {
           setLocalList(response.data.cities)
        })
      }
    }, [user])

    const handleSearch = () => {
      const queryParams = new URLSearchParams({
        categories: [category].length > 0 ? [category].join(',') : '',
        dorms_number: [rooms].length > 0 ? [rooms].join(',') : '',
        parking_spots: [garage].length > 0 ? [garage].join(',') : '',
        local: local !== 'selecione' ? local : '',
        max_value: price ? (price).toString() : '',
        search: search,
      });
    
      router.push({
        pathname: '/imoveis',
        query: queryParams.toString(),
      });
    };

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
          <SearchBar>
            <FilterItem
              fontfamily={banner.text_font}
              fontstyle={banner.text_style}
              textdecoration={banner.text_decoration}
              fontweight={banner.text_transform}
            ><span><HiMapPin />{local !== '' ? local : 'Cidade'}</span>
              <Input
                style={{ opacity: 0, position: 'absolute', top: 0, left: 0 }}
                type='select' onChange={(e) => setLocal(e.target.value)}>
                {localList.map((local, index) => (
                  <option key={index} value={local}>{local}</option>
                ))}
              </Input>
            </FilterItem>
            <FilterItem
              fontfamily={banner.text_font}
              fontstyle={banner.text_style}
              textdecoration={banner.text_decoration}
              fontweight={banner.text_transform}
            ><span><BiSolidBusiness />{category !== '' ? category : 'Categoria'}</span>
                <Input
                style={{ opacity: 0, position: 'absolute', top: 0, left: 0 }}
                type='select' onChange={(e) => setCategory(e.target.value)}>
                  <option value='Apartamento'>Apartamento</option>
                  <option value='Casa'>Casa</option>
                  <option value='Comercial'>Comercial</option>
                  <option value='Outros'>Outros</option>
                </Input></FilterItem>
            <FilterItem
              fontfamily={banner.text_font}
              fontstyle={banner.text_style}
              textdecoration={banner.text_decoration}
              fontweight={banner.text_transform}
            ><span><IoMdCar />{garage !== 0 && garage} {garage === 1 ? 'Vaga' : 'Vagas'}</span>
            <Input
                style={{ opacity: 0, position: 'absolute', top: 0, left: 0 }}
                type='select' onChange={(e) => setGarage(parseInt(e.target.value))}>
                  <option value={1}>1 vaga</option>
                  <option value={2}>2 vagas</option>
                  <option value={3}>3 vagas</option>
                  <option value={4}>4 vagas</option>
                  <option value={5}>5 ou mais vagas</option>
                </Input></FilterItem>
            <FilterItem
              fontfamily={banner.text_font}
              fontstyle={banner.text_style}
              textdecoration={banner.text_decoration}
              fontweight={banner.text_transform}
            ><span><IoIosBed />{rooms !== 0 && rooms} {rooms === 1 ? 'Quarto' : 'Quartos'}</span>
            <Input
              style={{ opacity: 0, position: 'absolute', top: 0, left: 0 }}
              type='select' onChange={(e) => setRooms(parseInt(e.target.value))}>
                <option value={1}>1 quarto</option>
                <option value={2}>2 quartos</option>
                <option value={3}>3 quartos</option>
                <option value={4}>4 quartos</option>
                <option value={5}>5 ou mais quartos</option>
              </Input>
            </FilterItem>
            <FilterItem
              fontfamily={banner.text_font}
              fontstyle={banner.text_style}
              textdecoration={banner.text_decoration}
              fontweight={banner.text_transform}
            ><span><MdCurrencyExchange />{price !== 0 ? (price / 100).toLocaleString('pt-br', {minimumFractionDigits: 2}) : 'Valor'}</span>
            <Input
              style={{ opacity: 0, position: 'absolute', top: 0, left: 0 }}
              type='select' onChange={(e) => setPrice(parseInt(e.target.value))}>
                <option value={100000000}>até R$ 1.000.000</option>
                <option value={200000000}>até R$ 2.000.000</option>
                <option value={300000000}>até R$ 3.000.000</option>
                <option value={500000000}>até R$ 5.000.000</option>
                <option value={700000000}>até R$ 7.000.000</option>
              </Input>
            </FilterItem>
            <FilterItemSearch
              fontfamily={banner.text_font}
              fontstyle={banner.text_style}
              textdecoration={banner.text_decoration}
              fontweight={banner.text_transform}
            >
              <Input placeholder="Cód., Empreend., Título..." type='text' value={search} onChange={(e) => setSearch(e.target.value)}></Input>
            </FilterItemSearch>
          </SearchBar>
          <ContainerButton>
            <Button
              fontsize={banner.text_size}
              color={banner.text_color}
              bgcolor={banner.button_background_color}
              fontfamily={banner.text_font}
              fontstyle={banner.text_style}
              textdecoration={banner.text_decoration}
              fontweight={banner.text_transform}
              onClick={handleSearch}
            >{banner.text}</Button>
          </ContainerButton>
        </BannerContainer>
        :
        <></>
    );
  }

  const BannerContainer = styled.div<{
    fontsize: string,
    color: string,
    fontfamily: string,
    fontstyle: string,
    textdecoration: string,
    fontweight: string
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
    }
  `;

  const SearchBar = styled.div`
    max-width:960px;
    margin:20px auto 0;
    display:flex;
    flex-direction:row;
    gap:2px;

    @media(max-width:768px){
      flex-direction:column;
    }
  `;

  const FilterItem = styled.div<{
    fontfamily:string,
    fontstyle:string,
    textdecoration:string,
    fontweight:string,
  }>`
    flex:1;
    display:flex;
    gap:8px;
    align-items:center;
    background-color:#fff;
    position:relative;
    overflow:hidden;
    height:60px;
    min-height:40px;
    padding:10px;
    box-shadow:0 0 5px rgba(0,0,0,0.3);
    font-family:${p => p.fontfamily ? p.fontfamily : 'Open sans'};
    font-style:${p => p.fontstyle ? p.fontstyle : 'none'};
    text-decoration:${p => p.textdecoration ? p.textdecoration : 'none'};
    font-weight:${p => p.fontweight ? p.fontweight : 500};

    & span{
      position:absolute;
      background-color:#fff;
      width:calc(100% - 30px);
      left:0;
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:0 15px;
    }

    & select{
      position:absolute;
      background-color:#fff;
      width:100%;
      left:0;
      z-index:1;
      height:100%;

       & option{
        font-size:16px;
       }
    }

    & svg{
      width:16px;
      height:16px;
    }

    &:nth-child(1){
      border-radius:20px 0 0 20px;
    }

    @media(max-width:768px){
      &:nth-child(1){
        border-radius:0;
      }
    }
  `;

  const ContainerButton = styled.div`
  
  `;

  const FilterItemSearch = styled.div<{
    fontfamily:string,
    fontstyle:string,
    textdecoration:string,
    fontweight:string,
  }>`
  flex:2;
  display:flex;
  gap:8px;
  align-items:center;
  background-color:#fff;
  height:60px;
  padding:10px;
  border-radius:0 20px 20px 0;
  box-shadow:0 0 5px rgba(0,0,0,0.3);
  font-family:${p => p.fontfamily ? p.fontfamily : 'Open sans'};
  font-style:${p => p.fontstyle ? p.fontstyle : 'none'};
  text-decoration:${p => p.textdecoration ? p.textdecoration : 'none'};
  font-weight:${p => p.fontweight ? p.fontweight : 500};

  & input{
    height:100%;
    width:100%;
    border:none;
    font-size:16px;
    padding:0 5px;
    outline:none;
  }

  & svg{
    width:16px;
    height:16px;
  }

  @media(max-width:768px){
    border-radius:0;
  }
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
  padding:8px 14px;
  min-width:180px;
  border:none;
  border-radius:20px;
  text-transform:uppercase;
  margin-top:20px;
  transition:0.2s;
  cursor:pointer;

  &:hover{
    transform:scale(1.03);
  }
  line-height:1;
  font-size:${p => p.fontsize ? p.fontsize : 16}px;
  color:${p => p.color ? p.color : '#fff'};
  background-color:${p => p.bgcolor ? p.bgcolor : '#333'};
  font-family:${p => p.fontfamily ? p.fontfamily : 'Open sans'};
  font-style:${p => p.fontstyle ? p.fontstyle : 'none'};
  text-decoration:${p => p.textdecoration ? p.textdecoration : 'none'};
  font-weight:${p => p.fontweight ? p.fontweight : 500};
`;