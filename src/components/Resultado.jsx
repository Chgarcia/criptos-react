import styled from '@emotion/styled'

const Contenedor = styled.div`
    color: #FFF;

`
const Texto = styled.p`

`

const Precio = styled.p`

`

const Resultado = ({cotizacion}) => {

    const[PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE] = cotizacion

  return (
    <Contenedor>
        <Precio>El precio es de: <span>{PRICE}</span></Precio>    
        <Texto>El precio más alto del día es de: <span>{HIGHDAY}</span></Texto>    
        <Texto>El precio más bajo del día es de: <span>{LOWDAY}</span></Texto>    
        <Texto>Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>    
        <Texto>Última Actualización: <span>{LASTUPDATE}</span></Texto>    
       
    </Contenedor>
  )
}

export default Resultado
