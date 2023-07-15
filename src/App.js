import { InputLabel, Select,MenuItem, FormControl,Grid,TextField,InputAdornment } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import dataRates from "../src/assets/xaf.json"
import './app.css'
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MissenAmount from './Components/MissenAmount';
import MissenFrom from './Components/MissenFrom';
import MissenTo from './Components/MissenTo';
import Result from './Components/Result';

const arr = []
const myFunc =() =>{
  Object.keys(dataRates).forEach(state => {
    arr.push({code:dataRates[state].code , rate:dataRates[state].rate,name:dataRates[state].name})
  });
}
myFunc()

function App() {
  const [toCurrency,setTocurrency] = useState(arr[0])
  const [amt,setAmt] = useState(1);
  const [isErr,setIsErr] = useState(false)
  const [rateamt,setRate] = useState(arr[0].rate)
  const [result,setResult] = useState(amt * rateamt)

  useEffect(()=>{
    let res = amt * rateamt
    setResult(res.toFixed(4))
  },[toCurrency,amt])

  useEffect(()=>{
    if(amt == ''){
      setAmt(1)
    }
    if (/^[0-9.e+-]*$/.test(amt)) {
      setIsErr(false)
    } else {
      setIsErr(true)
    }
  },[amt])

  const handleAmt =(e)=>{
    setAmt(e.target.value)
  }
  const handleCurrency = (e) =>{
    setRate(e.target.value.rate)
    setTocurrency(e.target.value)
  }
  
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<MissenAmount />} />
          <Route path='/:amount' element={<MissenFrom />}/>
          <Route path='/:amount/:currencyFrom' element={<MissenTo/>}/>
          <Route path='/:amount/:currencyFrom/:currencyTo' element={<Result/>}/>
        </Routes>
    </div>
  );
}

export default App;
