import React from 'react'
import { useState } from 'react'
import { useAragonApi } from '@aragon/api-react'
import {
  Box,
  Button,
  GU,
  Text,  
  textStyle,
  TextInput,
  Tabs
} from '@aragon/ui'
var Web3 = require("web3")

const Call = (props) => {
  let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  const { api } = useAragonApi()

  const [amtValue, setAmtValue] = useState('')
  const [toValue, setToValue] = useState('')
  const [dataValue, setDataValue] = useState('')
  const [selectedOp, setSelectedOp] = useState(0)

  return (
    <Box
        css={`
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: ${50 * GU}px;
          ${textStyle('title3')};
        `}
     >
       Call Contract
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
      <TextInput
          placeholder="data"
          multiline="true"
          value={dataValue}
          onChange={event => {
              setDataValue(event.target.value)
          }}
       />
      <Tabs
        items={['Call', 'DelegateCall']}
        selected={selectedOp}
        onChange={setSelectedOp}
      />

       <Button
          label="Execute"
          onClick={() => {
            try {
              let wei = web3.utils.toWei(amtValue, 'ether')
              if(web3.utils.isAddress(toValue)) {
                api.execute(toValue, wei, dataValue, selectedOp).toPromise()
              } else {
                props.sendMessage("Ethereum address invalid")
                props.sidePanelOpened(true) 
              }
            } catch (e) {
              props.sendMessage("Amount has to be a valid number")
              props.sidePanelOpened(true) 
            }
          }}
       />
      </div> 
   
     </Box>
  );
};

export default Call;
