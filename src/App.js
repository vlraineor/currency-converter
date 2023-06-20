import { InputLabel, Select,MenuItem, FormControl,Grid,TextField,InputAdornment } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import dataRates from "../src/assets/xaf.json"
import './app.css'
import { useEffect, useState } from 'react';

const arr = []
const myFunc =() =>{
  Object.keys(dataRates).forEach(state => {
    arr.push({code:dataRates[state].code , rate:dataRates[state].rate,name:dataRates[state].name})
  });
}
myFunc()
console.log(arr)

function App() {
  const [toCurrency,setTocurrency] = useState(arr[0])
  const [amt,setAmt] = useState(1);
  const [isErr,setIsErr] = useState(false)
  const [rateamt,setRate] = useState(arr[0].rate)
  const [result,setResult] = useState(amt * rateamt)

  useEffect(()=>{
    setResult(amt * rateamt)
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
        <div className='header'>
          <h1>Currency Converter Platform</h1>
        </div>
        <div className='body'>
          <div className='conversionSection'>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
              <TextField onChange={handleAmt} id="filled-basic" error={isErr} label="Amount in XAF" variant="filled" style={{minWidth:"200px",maxWidth:"300px"}} />
              <ArrowForwardIcon />
                <Select disabled={isErr} renderValue={(selected)=>{
                  return selected
                }} label="cuurency" variant="filled" value={toCurrency.name} onChange={handleCurrency}>
                    {arr.map((item,index)=>{
                      return(
                          <MenuItem key={index} value={item} >{item.name}</MenuItem>
                      )
                    })}
                </Select>
              </div>
              <div style={{width:"fit-content",margin:"30px auto",}}>
                <TextField 
                  InputProps={{
                    endAdornment:<InputAdornment position="start">{toCurrency.code}</InputAdornment>,
                    readOnly: true,
                  }}
                  value={result}
                  id="filled-basic" 
                  error={isErr} 
                  label={`Amount in ${toCurrency.name}`} 
                  variant="filled" />
              </div>
            </div>
            {/* <p>{result}</p> */}
          </div>

        </div>
        <div className='footer'>

        </div>
    </div>
  );
}

export default App;
