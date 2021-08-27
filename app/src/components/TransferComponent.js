import React from 'react'
import { useState } from 'react'
import { useAragonApi } from '@aragon/api-react'
import {
  Box,
  Button,
  TextInput,
  GU,
  Text,  
  textStyle,
} from '@aragon/ui'
var Web3 = require("web3")
const Transfer = (props) => {
  let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  
  const { api } = useAragonApi()
  const [amtValue, setAmtValue] = useState('')
  const [toValue, setToValue] = useState('')
    
  return (
    <Box
        css={`
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: ${50 * GU}px;
          ${textStyle('title3')}
        `}
     >
        Transfer
    <div>
       <TextInput
          placeholder="address"
          value={toValue}
          onChange={event => {
              setToValue(event.target.value)
          }}
       />
       <TextInput.Number
          placeholder="Amount"
          value={amtValue}
          onChange={event => {
              setAmtValue(event.target.value)
          }}
       />

       <Button
          label="Transfer"
          onClick={() => {
            let wei = web3.utils.toWei(amtValue, 'ether')
              if(web3.utils.isAddress(toValue)) {
                api.transfer(toValue, wei)
                   .toPromise()
                   /*
                   .catch(function(e) {
                      alert(e)
                   })
                   */
              } else {
                props.invalidAddressOpened(true) 
              }
            }
         }
       />
      </div> 
    </Box>
  );
};

export default Transfer;
