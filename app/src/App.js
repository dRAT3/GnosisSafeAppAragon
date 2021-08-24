import React from 'react'
import { useState } from 'react'
import { useAragonApi } from '@aragon/api-react'
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

import styled from 'styled-components'
import Transfer from './components/TransferComponent'
import Call from './components/CallComponent'
import Transactions from './components/TransactionsComponent'

function App() {
  const { api, appState, path, requestPath } = useAragonApi()
  const { count, isSyncing } = appState

  const [selected, setSelected] = useState([0])

  return (
    <Main>
      {isSyncing && <SyncIndicator />}
      <Header
        primary="Gnosis Safe Controller"
      />
      <Tabs
        items={['Transfer', 'Contract Call', 'Transactions']}
        selected={selected}
        onChange={setSelected}
      />
      <Transfer />
    </Main>
  )
}

const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 40px;
  margin-top: 20px;
`

export default App
