import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'

import App from './App'
import UserStore, { UserType } from './store/UserStore'
import { ChakraProvider } from '@chakra-ui/react'

export const Context = createContext<UserType | null>(null)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        userStore: new UserStore(),
      }}
    >
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Context.Provider>
  </React.StrictMode>,
)
