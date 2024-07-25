'use client'

import { IoSearch } from 'react-icons/io5';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Input } from 'reactstrap';
import axios from 'axios';
import { useRouter } from 'next/router';

  interface SearchBar1Props {
    banner:any;
    user:any;
  }

  function isEqual(obj1:any, obj2:any) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  
    return true;
  }
  
  export function SearchBar1({
    banner, user
  }: SearchBar1Props) {

    const router = useRouter();

    const getQueryParam = (param: string): string[] => {
      const paramValue = router.query[param];

      if (Array.isArray(paramValue)) {
        return paramValue.filter(value => value.trim() !== '');
      } else if (typeof paramValue === 'string') {
        return paramValue.split(',').filter(value => value.trim() !== '');
      } else {
        return [];
      }
    };

    const [load, setLoad] = useState(true);
    const [localList, setLocalList] = useState([])
    const [local, setLocal] = useState<any>(router.query.local || '')
    const [category, setCategory] = useState<any>(getQueryParam('categories')[0] || '')
    const [search, setSearch] = useState<any>(router.query.search || '')

    useEffect(() => {
      getQueryParam('categories')[0]?.replaceAll('%2C', '')
      updateURL();
      /* eslint-disable */
    }, [search, category, local]);

    const updateURL = () => {
      const queryParams = {
        categories: category.length > 0 ? category : '',
        local: local,
        search: search,
      };
  
      const currentQuery = router.query;

      if (!isEqual(currentQuery, queryParams)) {
        router.push({
          pathname: router.pathname,
          query: queryParams,
        });
      }
    };

    useEffect(() => {
      if(user.page_id){
        axios.get('https://dev.fastsaleimoveis.com.br/api/personal-pages/get-properties-cities/' + user.page_id)
        .then(response => {
           setLocalList(response.data.cities)
        })
      }
    }, [user])

    useEffect(() => {
      if(banner){
        setLoad(false)
      }
    }, [banner])

    const handleSearch = () => {
      const queryParams = new URLSearchParams({
        search: search,
        local: local,
        categories: category !== 'selecione' ? category : '',
      });

      setTimeout(() => {
        window.open('/imoveis?' + queryParams.toString(), '_parent')
      }, 0);
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
                    <Input type='select' value={local} onChange={(e) => setLocal(e.target.value)}>
                      <option value=''>Cidades</option>
                      {localList
                      .filter((city:any) => city && city !== 'null' && city !== '')
                      .sort((a: string, b: string) => a.localeCompare(b))
                      .map((local, index) => (
                        <option key={index} value={local}>{local}</option>
                      ))}
                    </Input>
                    <span></span>
                    <Input type='select' value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option value=''>Categorias</option>
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
    position:relative;
    z-index:1;

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
    width:100%;
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