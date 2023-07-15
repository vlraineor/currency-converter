import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dataRates from "../assets/xaf.json"

function Result() {
    let {amount,currencyFrom,currencyTo} = useParams()
    const [toCurrencies,setTocurrencies] = useState([])
    const [toCurrenciesAndRates,setToCurrenciesAndRates] = useState([])
    const [fromCurrencies,setFromCurrencies] = useState(["XAF"])

    let [content,setContent] =useState("Converting....")
    const [rate,setRate] = useState()

    useEffect(()=>{
        let tr =[]
        let trC =[]
        Object.keys(dataRates).forEach(state => {
            tr.push(dataRates[state].code)
            trC.push({code:dataRates[state].code,rate:dataRates[state].rate})
          });
          setTocurrencies(tr)
          setToCurrenciesAndRates(trC)
          setRate(trC.find(curr=>curr.code === currencyTo))
          
    },[])

useEffect(()=>{
    if (/^[0-9.e+-]*$/.test(amount)){
        if(fromCurrencies.includes(currencyFrom)){
                    if(toCurrencies.includes(currencyTo)){
                        setContent(amount * rate.rate)
                    }else{
                        setContent(`We do not yet support conversion from ${currencyFrom} to ${currencyTo}`)
                    }
                }else{
                    setContent(`We do not yet support conversion from ${currencyFrom} to ${currencyTo}`)
                }
    }else{
        setContent("amount entered is not a number")
    }
},[rate])

  return (
    <div>{content}</div>
  )
}

export default Result
