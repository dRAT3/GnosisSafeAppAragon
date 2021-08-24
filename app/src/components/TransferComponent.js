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
const Transfer = () => {
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
          onClick={() => api.execute(toValue, amtValue, 0, 0).toPromise()}
       />
      </div> 
    </Box>

  );
};

export default Transfer;
