import { useState, useEffect } from 'react'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'
import styled from '@emotion/styled'
import ImagenCripto from './img/imagen-criptos.png'


const Contenedor = styled.div`
    max-width: 900px;
    margin: 0 auto;
    width: 90%;
    @media (min-width: 992px ){
      display: grid;
      grid-template-columns: repeat(2,1fr);
      column-gap: 2 rep;
    }
`

const Imagen = styled.img`
    max-width:  480px;
    width: 80%;
    margin: 100px auto 0 auto;
    display: block;

`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`


function App() {
  const [monedas, setMonedas] = useState({})
  const [cotizacion, setCotizacion] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(()=>{
      if(Object.keys(monedas).length>0){
        const ConsultarAPI = async() =>{
          setCargando(true)
          setCotizacion({})
          const {moneda, criptomonedas} = monedas
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomonedas}&tsyms=${moneda}`
          const respuesta = await fetch(url)
          const resultado = await respuesta.json()
          setCotizacion(resultado.DISPLAY[criptomonedas][moneda])
          
          setCargando(false)
        }
        ConsultarAPI()
      }
      
        
    }, [monedas])


  return (
    <>
      <Contenedor>
          <Imagen 
              src={ImagenCripto}
              alt='imagenes criptomonedas'
          />
          <div>
            <Heading>Cotiza criptomonedas al instante</Heading>
            <Formulario
              setMonedas={setMonedas}
            />
            {cargando && <Spinner/>}
            {cotizacion.PRICE && <Resultado
              cotizacion ={cotizacion}
            />}
          </div>
      </Contenedor>    
    </>
  )
}

export default App
