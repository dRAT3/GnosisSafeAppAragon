import React from 'react'
import {
  Box,
  Button,
  GU,
  Header,
  IconMinus,
  IconPlus,
  Main,
  SyncIndicator,
  Tabs,
  Text,  
  textStyle,
} from '@aragon/ui'
const Transactions = () => {
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
      >Transactions
             </Box>
  );
};

export default Transactions;
