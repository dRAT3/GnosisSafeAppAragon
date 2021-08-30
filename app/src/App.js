import React from 'react'
import { useState } from 'react'
import { useAragonApi } from '@aragon/api-react'
import {
  Header,
  Main,
  SyncIndicator,
  Tabs,
  SidePanel,
  Info,
  Button
} from '@aragon/ui'

import styled from 'styled-components'
import Transfer from './components/TransferComponent'
import Call from './components/CallComponent'
import Transactions from './components/TransactionsComponent'

function App() {
  const { api, appState, path, requestPath } = useAragonApi()
  const { executor, isSyncing } = appState

  const [selected, setSelected] = useState(0)
  const [opened, setOpened] = useState(false)
  const [sidePanelMsg, setSidePanelMsg] = useState('')

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
      {selected === 0 && <Transfer 
        sendMessage={message => setSidePanelMsg(message)}  
        sidePanelOpened={openedProp => setOpened(openedProp)} 
      />}

      {selected === 1 && <Call 
        sendMessage={message => setSidePanelMsg(message)}  
        sidePanelOpened={openedProp => setOpened(openedProp)} 
      />}

      {selected === 2 && <Transactions 
        sendMessage={message => setSidePanelMsg(message)}  
        sidePanelOpened={openedProp => setOpened(openedProp)} 
      />}

      <SidePanel 
        title="Create transaction" 
        opened={opened} 
        onClose={() => setOpened(false)}
      >
        <Info title="Action impossible" mode="error">
          {sidePanelMsg}
        </Info>

      <Button mode="strong" onClick={() => setOpened(false)}>
        Close
      </Button>
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
