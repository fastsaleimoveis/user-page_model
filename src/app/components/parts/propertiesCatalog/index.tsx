import { useEffect, useState } from 'react';
import { Button, Col, Collapse, Input, Row, Spinner } from 'reactstrap';
import styled from 'styled-components';
import { ImovelCard } from '../card';
import axios from 'axios';
import { useRouter } from 'next/router';


import { IoSearchOutline } from 'react-icons/io5';
import { Pagination } from '@mui/material';
import CurrencyInput from './currencyInput';
import { CiFilter } from "react-icons/ci";
import { IoMdClose } from 'react-icons/io';

  interface PropertiesCatalogProps {
    data?:any;
    pageId:number
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
  
  export function PropertiesCatalog({
    data, pageId
  }: PropertiesCatalogProps) {

    const router = useRouter();

    const [accordion1, setAccordion1] = useState(true)
    const [accordion2, setAccordion2] = useState(false)
    const [accordion3, setAccordion3] = useState(false)
    const [accordion4, setAccordion4] = useState(false)
    const [imoveis, setImoveis] = useState([])
    const [pages, setPages] = useState(0)
    const [page, setPage] = useState(1)

    const getQueryParam = (param: string): string[] => {
      const paramValue = router.query[param];

      if (Array.isArray(paramValue)) {
        return paramValue;
      } else if (typeof paramValue === 'string') {
        return paramValue.split(',');
      } else {
        return [];
      }
    };

    const [search, setSearch] = useState(router.query.search || '')
    const [category, setCategory] = useState<string[]>(getQueryParam('categories'))
    const [local, setLocal] = useState<any>(router.query.local || 'selecione')
    const [minPrice, setMinPrice] = useState(Number(router.query.min_value) / 100 || 0)
    const [maxPrice, setMaxPrice] = useState(Number(router.query.max_value) / 100 || 0)
    const [rooms, setRooms] = useState<number[]>(getQueryParam('dorms_number').map(Number))
    const [garage, setGarage] = useState<number[]>(getQueryParam('parking_spots').map(Number))

    const [localList, setLocalList] = useState([])

    const [loading, setLoading] = useState(false)

    const [load, setLoad] = useState(true);

    const [openFilter, setOpenFilter] = useState(false)

    useEffect(() => {
        if(data){
          setLoad(false)
        }
      }, [data])

      useEffect(() => {
        if(pageId){
          axios.get('https://dev.fastsaleimoveis.com.br/api/personal-pages/get-properties-cities/' + pageId)
          .then(response => {
             setLocalList(response.data.cities)
          })
        }
      }, [pageId])

      useEffect(() => {
        handleProperties();
        updateURL();
        /* eslint-disable */
      }, [search, category, local, minPrice, maxPrice, rooms, garage, page]);

      const updateURL = () => {
        const queryParams = {
          categories: category.length > 0 ? category.join(',') : '',
          dorms_number: rooms.length > 0 ? rooms.join(',') : '',
          parking_spots: garage.length > 0 ? garage.join(',') : '',
          local: local !== 'selecione' ? local : '',
          max_value: maxPrice ? (maxPrice * 100).toString() : '',
          min_value: minPrice ? (minPrice * 100).toString() : '',
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
      

     const handleProperties = () => {

      setLoading(true);

      const filters = {
        categories: (Array.isArray(category) && category.length > 0 && category.some(c => c !== '' && c !== '0')) ? category : 0,
        dorms_number: rooms.length > 0 && !rooms.includes(0) ? rooms : 0,
        parking_spots: garage.length > 0 && !garage.includes(0) ? garage : 0,
        local: local !== 'selecione' ? local : '',
        max_value: maxPrice ? maxPrice * 100 : 0,
        min_value: minPrice ? minPrice * 100 : 0,
        search: search,
        personal_page_id: pageId,
      };
    
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => queryParams.append(key, String(v)));
        } else {
          queryParams.set(key, String(value));
        }
      });
      const { pathname } = window.location;
      const newUrl = `${pathname}?${queryParams.toString()}`;
      window.history.replaceState({}, document.title, newUrl);
    
      axios.post('https://dev.fastsaleimoveis.com.br/api/personal-pages/get-properties?page=' + page, filters)
        .then(response => {
          window.scrollTo(0, 0);
          setImoveis(response.data.data);
          setPages(response.data.last_page);
          setLoading(false);
        });
     }

     const clearFilter = () => {
      setSearch('')
      setCategory([])
      setLocal('selecione')
      setMinPrice(0)
      setMaxPrice(0)
      setRooms([])
      setGarage([])
     }

     const handleMinChange = (newValue: number) => {
      setMinPrice(newValue);
    };

    const handleMaxChange = (newValue: number) => {
        setMaxPrice(newValue);
    };

    const handleRoomsClick = (value: number) => {
      setRooms((prevRooms) => {
        if (prevRooms.includes(value)) {
          return prevRooms.filter((room) => room !== value && room !== 0);
        } else {
          return [...prevRooms, value];
        }
      });
    };
  
    const handleGarageClick = (value: number) => {
      setGarage((prevGarage) => {
        if (prevGarage.includes(value)) {
          return prevGarage.filter((garage) => garage !== value && garage !== 0);
        } else {
          return [...prevGarage, value];
        }
      });
    };

    const handleCategoryClick = (value: string) => {
      setCategory((prevCategory) => {
        if (prevCategory.includes(value)) {
          return prevCategory.filter((category) => category !== value);
        } else {
          return [...prevCategory, value];
        }
      });
    };

    useEffect(() => {
      if (openFilter) {
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.documentElement.style.overflow = 'auto';
      }
  
      return () => {
        document.documentElement.style.overflow = 'auto';
      };
    }, [openFilter]);

    return (
      
      !load ?
      <div style={{
        display:'block',
      }}>
     <CatalogResult className="Filters">
      <FiltersContainer className={openFilter ? 'open' : ''}>
        <FilterToogle onClick={() => setOpenFilter(true)}><CiFilter /></FilterToogle>
        <FilterClose onClick={() => setOpenFilter(false)}><IoMdClose /></FilterClose>
        <FilterBoy>
        <Title>Filtros</Title>
        <SearchBar>
          <label>Busque por nome, código ou empreendimento</label>
          <InputContainer>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nome, cód. ou empreendimento"></input>
            <span onClick={handleProperties}><IoSearchOutline /></span>
          </InputContainer>
        </SearchBar>
        <div className="accordion ecommerce" id="accordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
                <button
                className={ accordion1 ? 'accordion-button' : 'accordion-button collapsed'}
                onClick={() => setAccordion1(!accordion1)}
                data-bs-toggle="collapse"
                >
                <i className="ri-home-2-fill font-size-16 align-middle me-2"></i>{" "}
                Categoria
                </button>
            </h2>
            <Collapse
                isOpen={accordion1}
                className="accordion-collapse" 
            >
                <CategoryContainer>
                  <Row style={{gap:'20px 0', marginBottom:'10px', marginTop:'10px'}}>
                    <Col xs={6}>
                      <button
                        onClick={() => handleCategoryClick('Apartamento')}
                        id='apartment'
                        className={`option ${category.includes('Apartamento') ? 'active' : ''}`}
                      >
                        <div className="icon"></div>
                        <p>Apartamento</p>
                      </button>
                    </Col>
                    <Col xs={6}>
                      <button
                        onClick={() => handleCategoryClick('Casa')}
                        id='house'
                        className={`option ${category.includes('Casa') ? 'active' : ''}`}
                      >
                        <div className="icon"></div>
                        <p>Casa</p>
                      </button>
                    </Col>
                    <Col xs={6}>
                      <button
                        onClick={() => handleCategoryClick('Comercial')}
                        className={`option ${category.includes('Comercial') ? 'active' : ''}`}
                        id='commercial'
                      >
                        <div className="icon"></div>
                        <p>Comercial</p>
                      </button>
                    </Col>
                    <Col xs={6}>
                      <button
                        onClick={() => handleCategoryClick('Outros')}
                        id='outros'
                        className={`option ${category.includes('Outros') ? 'active' : ''}`}
                      >
                        <div className="icon"></div>
                        <p>Outros</p>
                      </button>
                    </Col>
                  </Row>
                </CategoryContainer>
            </Collapse>
          </div>
        </div>
        <div className="accordion ecommerce" id="accordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
                <button
                className={ accordion2 ? 'accordion-button' : 'accordion-button collapsed'}
                onClick={() => setAccordion2(!accordion2)}
                data-bs-toggle="collapse"
                >
                <i className="ri-home-2-fill font-size-16 align-middle me-2"></i>{" "}
                Localização
                </button>
            </h2>
            <Collapse
                isOpen={accordion2}
                className="accordion-collapse" 
            >
              <LocalContainer>
                <label>Cidade</label>
                <Input type='select' value={local} onChange={(e) => setLocal(e.target.value)}>
                  <option value='selecione'>Selecione a cidade</option>
                  {localList.sort().map((local, index) => (
                    <option key={index} value={local}>{local}</option>
                  ))}
                </Input>
              </LocalContainer>
            </Collapse>
          </div>
        </div>
        <div className="accordion ecommerce" id="accordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
                <button
                className={ accordion3 ? 'accordion-button' : 'accordion-button collapsed'}
                onClick={() => setAccordion3(!accordion3)}
                data-bs-toggle="collapse"
                >
                <i className="ri-home-2-fill font-size-16 align-middle me-2"></i>{" "}
                Preço
                </button>
            </h2>
            <Collapse
                isOpen={accordion3}
                className="accordion-collapse" 
            >
              <PriceContainer>
                <label>de</label>
                <CurrencyInput defaultValue={minPrice} onChange={handleMinChange} />
                <label>até</label>
                <CurrencyInput defaultValue={maxPrice} onChange={handleMaxChange} />
              </PriceContainer>
            </Collapse>
          </div>
        </div>
        <div className="accordion ecommerce" id="accordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
                <button
                className={ accordion4 ? 'accordion-button' : 'accordion-button collapsed'}
                onClick={() => setAccordion4(!accordion4)}
                data-bs-toggle="collapse"
                >
                <i className="ri-home-2-fill font-size-16 align-middle me-2"></i>{" "}
                Quartos e garagens
                </button>
            </h2>
            <Collapse
                isOpen={accordion4}
                className="accordion-collapse" 
            >
              <RGContainer>
                  <h3>Nº de quartos</h3>
                  <RGOptions>
                    <span className={rooms.includes(1) ? 'active' : ''} onClick={() => handleRoomsClick(1)}>1</span>
                    <span className={rooms.includes(2) ? 'active' : ''} onClick={() => handleRoomsClick(2)}>2</span>
                    <span className={rooms.includes(3) ? 'active' : ''} onClick={() => handleRoomsClick(3)}>3</span>
                    <span className={rooms.includes(4) ? 'active' : ''} onClick={() => handleRoomsClick(4)}>4</span>
                    <span className={rooms.includes(5) ? 'active' : ''} onClick={() => handleRoomsClick(5)}>5+</span>
                  </RGOptions>
                  <h3>Nº de vagas de garagem</h3>
                  <RGOptions>
                    <span className={garage.includes(1) ? 'active' : ''} onClick={() => handleGarageClick(1)}>1</span>
                    <span className={garage.includes(2) ? 'active' : ''} onClick={() => handleGarageClick(2)}>2</span>
                    <span className={garage.includes(3) ? 'active' : ''} onClick={() => handleGarageClick(3)}>3</span>
                    <span className={garage.includes(4) ? 'active' : ''} onClick={() => handleGarageClick(4)}>4</span>
                    <span className={garage.includes(5) ? 'active' : ''} onClick={() => handleGarageClick(5)}>5+</span>
                  </RGOptions>
                </RGContainer>
            </Collapse>
          </div>
        </div>
        {/* <Button
        onClick={() => {
          setPage(1)
          handleProperties()
        }}
          className="apply-filters"
        >Aplicar filtros</Button> */}
          <span className="clearFilter" onClick={clearFilter}>Limpar filtros</span>
          <ButtonClose>
            <Button onClick={() => setOpenFilter(false)}>APLICAR</Button>
          </ButtonClose>
        </FilterBoy>
        </FiltersContainer>
        <Catalog>
          {loading ?
              <span><Spinner></Spinner></span>
            :
            <CatalogContainer>
              {(imoveis && imoveis.length > 0) ? imoveis.map((imovel: any, index: number) => (
                <ImovelCard key={index} data={data} imovel={imovel.properties}/>
              ))
                :
                <p>Não foram encontrados resultados para os filtros selecionados.</p>
            }
            </CatalogContainer>
          }
          <PaginationContainer>
            {/* <ThemeProvider theme={theme}> */}
              <Pagination
                  count={pages}
                  size="small" 
                  page={page}
                  style={{margin:'20px 0', display:'flex', justifyContent:'flex-end'}}
                  onChange={(event, value) => {
                    setPage(value)
                  }}
              />
            {/* </ThemeProvider> */}
          </PaginationContainer>
        </Catalog>
     </CatalogResult>
     </div>
     :
     <></>
    );
  }

const SearchBar = styled.div`
  margin-top:10px;
  WIDTH:100%;

  & label{
    font-size:12px;
  }
`;

const InputContainer = styled.div`
  display:flex;
  margin-bottom:15px;

  & input{
    border-radius:20px 0 0 20px;
    border:solid 1px #cdcdcd;
    padding:0 8px;
    height:40px;
    width:calc(100% - 40px);
  }

  & span{
    background-color:#888;
    border-radius:0 20px 20px 0;
    display:flex;
    align-items:center;
    justify-content:center;
    width:40px;
    transition:0.2s;
    cursor:pointer;

    &:hover{
      transform:scale(1.03);
    }

    & svg{
      width:20px;
      height:20px;
      color:#fff;
    }
  }
`;

const Title = styled.div`
  font-weight:600;
  color:#333;
`;

const CategoryContainer = styled.div`
  padding:10px;

  & .option{
    border:none;
    border-radius:10px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width:100%;
    height:80px;
    font-size:12px;
    color:#333;

    & p{
      margin:0;
      color:#333;
    }

    &.active{
      background-color:#888;

      & p{
        color:#fff;
      }
    }

    & .icon{
      width:30px;
      height:30px;
      margin-bottom:5px;
      background-position:center center;
      background-size:cover;
    }

    &#house .icon{
      background-image: url('/house_green.png');
    }
    
    &#apartment .icon{
      background-image: url('/building_green.png');
    }
    
    &#outros .icon{
      background-image: url('/terrain_green.png');
    }
    
    &#commercial .icon{
      background-image: url('/shop_green.png');
    }
    
  }
`;

  const LocalContainer = styled.div`
    padding:10px;
  `;

  const PriceContainer = styled.div`
    padding:10px;
  `;

const RGContainer = styled.div`
  padding: 10px;

  & h3{
    font-size:12px!important;
    color:#888;
  }
`;

  const RGOptions = styled.div`
    display:flex;
    gap:8px;
    margin-bottom:15px;

    & span{
      background-color:#f4f4f4;
      display:flex;
      align-items:center;
      justify-content:center;
      border-radius:8px;
      width:25px;
      height:25px;
      font-size:14px;
      cursor:pointer;

      &.active{
        background-color:#333;
        color:#fff;
      }
    }
  `;

const CatalogResult = styled.div`
  display:flex;
  gap:20px;
  width:calc(100% - 40px);
  max-width:1360px;
  margin:20px auto 0;

  & .apply-filters{
    margin-top:10px;
    width:100%;
  }

  @media(max-width:768px){
    flex-direction:column;
  }
`;

const FiltersContainer = styled.div`
  flex:2;
  background-color:#fff;
  padding:10px;
  border-radius:10px;
  height:max-content;

  & .clearFilter{
    text-align:center;
    display:block;
    margin-top:10px;
    color:#888;
    text-decoration:underline;
    font-size:14px;
    cursor:pointer;
    &:hover{
      color:#333;
    }
  }

  @media(max-width:768px){
    position:fixed;
    z-index:5;
    width:100%;
    right:0;
    left:0;
    height:100vh;
    box-shadow:0 0 5px rgba(0,0,0,0.3);
    bottom:0;
    transform:translate(-105%, 0);
    transition:0.2s;
    padding-top:140px;
    border-radius:0px;

    &.open{
      transform:translate(0, 0);
    }
  }
`;

const FilterBoy = styled.div`
  width:100%;
  height:100%;
  overflow-y:auto;
  overflow-x: hidden;
  padding-bottom:40px;
`

const FilterToogle = styled.div`
  position:fixed;
  z-index:3;
  width:60px;
  height:60px;
  border-radius:0 5px 5px 0;
  background-color:#fff;
  box-shadow: 0 0 5px rgba(0,0,0,0.3);
  right: -78px;
  display:flex;
  align-items:center;
  justify-content:center;
  top:140px;

  & svg{
    width:34px;
    height:34px;
  }

  @media(min-width:768px){
    display:none;
  }
`;

const FilterClose = styled.div`
  width:50px;
  height:50px;
  position:relative;
  float:right;
  display:flex;
  align-items:center;
  margin-top:-40px;
  margin-right: -10px;
  justify-content:center;

  & svg{
    width:34px;
    height:34px;
  }

  @media(min-width:768px){
    display:none;
  }
`;

const ButtonClose = styled.div`
  text-align:center;
  margin-top:20px;

  @media(min-width:768px){
    display:none;
  }
`;

const Catalog = styled.div`
  flex:6;
`;

const CatalogContainer = styled.div`
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  display: grid;
  gap: 10px;

  & .card{
    max-width:280px;
  }
`;

const PaginationContainer = styled.div`
  width:100%;
  margin-bottom:30px;
  display:flex;
  gap:8px;
  justify-content:flex-end;

  & button text{
    color:#fff;
  }
`;