'use client';

import styled from 'styled-components';
import { useEffect, useState } from 'react';

  interface CookiesProps {
    data?:any;
  }
  
  export function Cooklies({
    data,
  }: CookiesProps) {

    const [open, setOpen] = useState(false)

    const [load, setLoad] = useState(true);

    useEffect(() => {
      if(data){
        setLoad(false)
      }
      if(!(localStorage.getItem('cookies') === 'aceito')){
        setOpen(true)
      }
    }, [data])

    return (
      (!load && open) ?
        <CookiesModal
          bgcolor={data.data_1}
          buttoncolor={data.data_2}
          color={data.data_4}
          size={data.data_3}
        >
            <p>{data.text_2} Para mais informações sobre como utilizamos cookies e como você pode controlá-los, consulte nossa <a href="#">Política de Cookies</a>.</p>
            <button onClick={() => {
              localStorage.setItem('cookies', 'aceito')
              setOpen(false)
            }}>{data.text_1 ? data.text_1 : 'Permitir'}</button>
        </CookiesModal>
        :
        <></>
    );
  }

const CookiesModal = styled.div<{
  bgcolor:string,
  color:string,
  buttoncolor:string,
  size:string
}>`
  position:fixed;
  left:20px;
  bottom:20px;
  padding:15px;
  background-color:${p => p.bgcolor ? p.bgcolor : '#333'};
  max-width:${p => p.size ? Number(p.size) * 10 : 300}px;
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
  align-items:flex-end;
  z-index:99;

  & p{
    color:${p => p.color ? p.color : '#fff'};
    font-size:${p => p.size ? Number(p.size) / 3 : 12}px;
    text-align:left;

    a{
      text-decoration:underline;
    }
  }

  & button{
    border:none;
    background-color:${p => p.buttoncolor ? p.buttoncolor : '#fff'};
    border-radius:30px;
    padding:5px 25px;
    text-transform:uppercase;
    color:${p => p.bgcolor ? p.bgcolor : '#333'};
  }
`;