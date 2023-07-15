import React from 'react'
import dataRates from "../assets/xaf.json"

function MissenTo() {
    const arr =[]
    // const myFunc =() =>{
    //     Object.keys(dataRates).forEach(state => {
    //       arr.push({code:dataRates[state].code , rate:dataRates[state].rate,name:dataRates[state].name})
    //     });
    //   }
      const myFunc =() =>{
        Object.keys(dataRates).forEach(state => {
          arr.push({code:dataRates[state].code,name:dataRates[state].name})
        });
      }
      myFunc()
      console.log(arr)
  return (
    <div>
        <p>Available currencies to convert to :</p>
        <div>
            [
                {arr.map((item,key)=>{
                    return(
                        <span>{item.code}({item.name}) ,</span>
                    )
                })}
            ]
        </div>
    </div>
  )
}

export default MissenTo
