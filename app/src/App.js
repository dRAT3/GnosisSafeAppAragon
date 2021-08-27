import React from 'react'
import { useState } from 'react'
import { useAragonApi } from '@aragon/api-react'
import {
  Header,
  Main,
  SyncIndicator,
  Tabs,
  SidePanel
} from '@aragon/ui'

import styled from 'styled-components'
import Transfer from './components/TransferComponent'
import Call from './components/CallComponent'
import Transactions from './components/TransactionsComponent'

function App() {
  const { api, appState, path, requestPath } = useAragonApi()
  const { executor, isSyncing } = appState

  const [selected, setSelected] = useState([0])
  const [opened, setOpened] = useState(false)

  return (
    <Main>
      {isSyncing && <SyncIndicator />}
      <Header
        primary="Gnosis Safe Controller"
        secondary={executor}
      />
      <Tabs
        items={['Transfer', 'Contract Call', 'Transactions']}
        selected={selected}
        onChange={setSelected}
      />
      <Transfer invalidAddressOpened={openedProp => setOpened(openedProp)} />

    <SidePanel title="Invalid Address" opened={opened}>
      Address has to be a valid addres
    </SidePanel>

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
