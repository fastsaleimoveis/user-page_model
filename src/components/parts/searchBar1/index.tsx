'use client'

import { IoSearch } from 'react-icons/io5';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Input } from 'reactstrap';
import axios from 'axios';
import { useRouter } from 'next/router';

  interface SearchBar1Props {
    banner:any;
  }
  
  export function SearchBar1({
    banner,
  }: SearchBar1Props) {

    const router = useRouter();

    const [load, setLoad] = useState(true);
    const [localList, setLocalList] = useState([])
    const [local, setLocal] = useState('')
    const [category, setCategory] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
      axios.get('https://dev.fastsaleimoveis.com.br/api/personal-pages/get-properties-cities/' + 517)
         .then(response => {
            setLocalList(response.data.cities)
         })
    }, [])

    useEffect(() => {
      if(banner){
        setLoad(false)
      }
    }, [banner])

    const handleSearch = () => {
      const queryParams = new URLSearchParams({
        search: search,
        local: local,
        category: category,
      });
    
      router.push({
        pathname: '/imoveis',
        query: queryParams.toString(),
      });
    };

    return (
      (!load && banner) ?
        <BannerContainer
            fontsize={banner.title_size}
            color={banner.title_color}
            fontfamily={banner.title_font}
            fontstyle={banner.title_style}
            textdecoration={banner.title_decoration}
            fontweight={banner.title_transform}
            >
                <h3>{banner?.title}</h3>
                <SearchBar
                  fontfamily={banner.title_font}
                >
                  <SearchSelects>
                    <Input type='select' onChange={(e) => setLocal(e.target.value)}>
                      <option value='selecione'>Selecione a cidade</option>
                      {localList.map((local, index) => (
                        <option key={index} value={local}>{local}</option>
                      ))}
                    </Input>
                    <span></span>
                    <Input type='select' onChange={(e) => setCategory(e.target.value)}>
                      <option value='selecione'>Selecione o tipo</option>
                      <option value='Apartamento'>Apartamento</option>
                      <option value='Casa'>Casa</option>
                      <option value='Comercial'>Comercial</option>
                      <option value='Outros'>Outros</option>
                    </Input>
                  </SearchSelects>
                  <SearchInput
                    fontfamily={banner.title_font}
                  >
                    <IoSearch />
                    <input
                      type="text"
                      placeholder="Código, empreendimento, título..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    ></input>
                  </SearchInput>
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
                </SearchBar>
        </BannerContainer>
        :
        <></>
    );
  }

  const SearchSelects = styled.div`
      width:calc(100% - 40px);
      max-width:320px;
      margin:20px auto 0;
      border-radius:20px;
      height:40px;
      background-color:#fff;
      display:flex;
      justify-content:center;
      padding:0 20px;

      & select{
        height:40px;
        width:calc(50% - 15px);
        border:none;
        outline:none;
      }

      & span{
        height:30px;
        margin:auto;
        width:1px;
        background-color:#888;
      }
  `;

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
        color:${p => p.color ? p.color : "#333"};
        font-family:${p => p.fontfamily ? p.fontfamily : 'Open sans'};
        font-style:${p => p.fontstyle ? p.fontstyle : 'none'};
        text-decoration:${p => p.textdecoration ? p.textdecoration : 'none'};
        font-weight:${p => p.fontweight ? p.fontweight : 500};
    }
  `;

  const SearchBar = styled.div<{
    fontfamily:string,
  }>`
    width:calc(100% - 40px);
    max-width:520px;
    margin:0 auto;
    font-family:${p => p.fontfamily ? p.fontfamily : 'Open sans'};

    & button{
      padding:8px 14px;
      min-width:180px;
      border:none;
      border-radius:20px;
      text-transform:uppercase;
      margin-top:20px;
      transition:0.2s;

      &:hover{
        transform:scale(1.03);
      }
    }
  `;

  const SearchInput = styled.div<{
    fontfamily:string,
  }>`
    width:calc(100% - 40px);
    height:40px;
    border-radius:30px;
    box-shadow:0 0 3px rgba(0,0,0,0.3);
    padding:0 20px;
    margin-top:20px;
    background-color:#fff;
    display:flex;
    gap:5px;
    align-items:center;

    & svg{
      width:28px;
      height:28px;
      margin-right:5px;
      color:#888;
    }

    & input{
      font-family:${p => p.fontfamily ? p.fontfamily : 'Open sans'};
      outline:none;
      width:100%;
      border:none;
      height:90%;
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
    line-height:1;
    cursor:pointer;
    font-size:${p => p.fontsize ? p.fontsize : 16}px;
    color:${p => p.color ? p.color : '#fff'};
    background-color:${p => p.bgcolor ? p.bgcolor : '#333'};
    font-family:${p => p.fontfamily ? p.fontfamily : 'Open sans'};
    font-style:${p => p.fontstyle ? p.fontstyle : 'none'};
    text-decoration:${p => p.textdecoration ? p.textdecoration : 'none'};
    font-weight:${p => p.fontweight ? p.fontweight : 500};
  `;