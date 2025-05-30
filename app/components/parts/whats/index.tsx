import styled from 'styled-components';
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from 'react';
import Link from 'next/link';

  interface WhatsProps {
    data?:any;
  }
  
  export function Whats({
    data,
  }: WhatsProps) {

    const [load, setLoad] = useState(true);

    useEffect(() => {
      if(data){
        setLoad(false)
      }
    }, [data])

    // console.log(data)

    return (
      !load ?
        <WhatsButton
          bgcolor={data.data_1}
          color={data.data_2}
          size={data.data_3}
        >
            <Link href={`https://wa.me/${data.text_3 ? data.text_3 : ''}?text=${data.text_2 ? data.text_2 : ''}`} target="_blank"><FaWhatsapp /></Link>
        </WhatsButton>
      :
        <></>
    )
  }


const WhatsButton = styled.div<{
  bgcolor:string,
  color:string,
  size:string
}>`
  position:fixed;
  width:${p => p.size ? p.size : 40}px;
  height:${p => p.size ? p.size : 40}px;
  background-color:${p => p.bgcolor ? p.bgcolor : '#333'};
  border-radius:50%;
  right: 20px;
  bottom: 20px;
  float: right;
  box-shadow:1px 1px 3px 1px rgba(0,0,0,0.2);
  cursor:pointer;
  border:solid 2px ${p => p.color ? p.color : '#fff'};
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:99;

  & a{
    width:60%;
    height:60%;
  }

  & svg{
    color:${p => p.color ? p.color : '#fff'};
    width:100%;
    height:100%;
    transition:0.2s;
  }

  & svg:hover{
    transform:scale(1.1);
  }
`;