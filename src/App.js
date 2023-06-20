import { InputLabel, Select,MenuItem, FormControl,Grid,TextField,InputAdornment } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import dataRates from "../src/assets/xaf.json"
import './app.css'
import { useEffect, useState } from 'react';

const arr = []

//Function that reads data from json and converts the data to a suitable and usable format
const myFunc =() =>{
  Object.keys(dataRates).forEach(state => {
    arr.push({code:dataRates[state].code , rate:dataRates[state].rate,name:dataRates[state].name})
  });
}
myFunc()

function App() {
  //Variabble that holds the selected currency of the user
  const [toCurrency,setTocurrency] = useState(arr[0])

  //variable that holds the amout the user inputs
  const [amt,setAmt] = useState(1);

  //variable for when user enters a value that is not a number in the input text field
  const [isErr,setIsErr] = useState(false)

  //upon currency selection, the rate also changes as each currency has a different rate
  const [rateamt,setRate] = useState(arr[0].rate)

  //holds the final amount after conversion
  const [result,setResult] = useState(amt * rateamt)


  //Anytime the cuurency selected or the amount entered changes, the final amount of the conversion is recalculated
  useEffect(()=>{
    setResult(amt * rateamt)
  },[toCurrency,amt])


  //Anytime an amount is entered, this function checks to see if the amount entered is a number or not
  //In case the value entered is not a number, User is alerted with red underlines of text fields
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

  //function called when user enters an amount, set the new amount value
  const handleAmt =(e)=>{
    setAmt(e.target.value)
  }

    //function called when user chooses a currency, set the new currency value
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
                <Select disabled={isErr} renderValue={(selected)=>{return selected}} label="cuurency" variant="filled" value={toCurrency.name} onChange={handleCurrency}>
                    {arr.map((item,index)=>{
                      return(
                          <MenuItem key={index} value={item} >{item.name}</MenuItem>
                      )
                    })}
                </Select>
              </div>
              <div style={{width:"fit-content",margin:"30px auto",}}>
                <TextField InputProps={{
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
          </div>

        </div>
        <div className='footer'>

        </div>
    </div>
  );
}

export default App;
