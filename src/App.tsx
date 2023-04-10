import React, { useContext, useEffect, useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter } from 'react-router-dom'
import './css/App.css'
import { observer } from 'mobx-react-lite'
import { Context } from './index'
import UserAPI from './http/userAPI'
import { Container, Spinner } from 'react-bootstrap'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { UserType } from './store/UserStore'

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
      <Container
        className='d-flex justify-content-center align-items-center'
        style={{ height: window.innerHeight }}
      >
        <Spinner animation='border' />
      </Container>
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
