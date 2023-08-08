import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './css/index.css'

import App from './App'
import UserStore, { UserType } from './store/UserStore'

export const Context = createContext<UserType | null>(null)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        userStore: new UserStore(),
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>,
)
