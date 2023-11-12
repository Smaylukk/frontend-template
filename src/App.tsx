import React, { useContext, useEffect, useState } from 'react'
import { CircularProgress, Container } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import './css/App.css'
import { observer } from 'mobx-react-lite'
import { Context } from './index'
import UserAPI from './http/userAPI'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { UserType } from './store/UserStore'

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
        <CircularProgress size='lg' />
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
