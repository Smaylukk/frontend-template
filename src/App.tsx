import React, { useContext, useEffect, useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter } from 'react-router-dom'
import './css/App.css'
import { observer } from 'mobx-react-lite'
import { Context } from './index'
import UserAPI from './http/userAPI'

import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { UserType } from './store/UserStore'
import { MDBContainer, MDBSpinner } from 'mdb-react-ui-kit'

library.add(fas)

const App = observer(() => {
  const { userStore } = useContext(Context) as UserType
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    UserAPI.check()
      .then((data) => {
        userStore.user = data
        userStore.isAuth = true
      })
      .finally(() => setLoading(false))
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return (
      <MDBContainer
        className='d-flex justify-content-center align-items-center'
        style={{ height: window.innerHeight }}
      >
        <MDBSpinner color='success'>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
      </MDBContainer>
    )
  }

  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <AppRouter />
      </div>
    </BrowserRouter>
  )
})

export default App
