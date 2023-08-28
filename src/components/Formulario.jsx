import {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../Hooks/useSelectMonedas'
import Error from './Error'
import {monedas} from '../data/monedas'
 
    const InputSubmit = styled.input`
        background-color: #9497FF;
        border: none;
        width: 100%;
        padding: 10px;
        color: #FFF;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 20px;
        border-radius: 5px;
        transition: backgroud-color .3s ease;
        margin-top: 20px;

        &:hover{
            background-color: #7a7bfe;
            cursor: pointer;
        }
    `
    

   

    const Formulario = ({setMonedas}) => {
        const[criptos, setCriptos]= useState([])
        const[error,setError] = useState(false)
        const [ moneda ,SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas)
        const [ criptomonedas ,SelectCriptos] = useSelectMonedas('Elige tu criptomoneda', criptos)
       
       
       
        useEffect( () =>{
            const ConsultarAPI = async() =>{
                const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                
                const arrayCriptos = resultado.Data.map((cripto) =>{
                    const data ={
                        id:cripto.CoinInfo.Name,
                        nombre: cripto.CoinInfo.FullName
                    }
                    return data
                    })

                setCriptos(arrayCriptos)
            }
            ConsultarAPI()
        },[])

        const handleSubmit = (e)=>{
            e.preventDefault()

            if([moneda, criptomonedas].includes('')){
                setError(true)
                return
            }
            setError(false)
            setMonedas({moneda, criptomonedas})
        }
     
        return (
            <> 
                {error && <Error>Todos los campos son obligatorios</Error>}
            <form 
                onSubmit={handleSubmit}
            >

                    <SelectMonedas />
  
                    <SelectCriptos />
                    <InputSubmit 
                        type="submit" 
                        value="Cotizar"
                    />
            </form>
            </>
        )
}

export default Formulario
