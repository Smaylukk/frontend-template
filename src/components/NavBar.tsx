import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { Context } from '..'
import { UserType } from '../store/UserStore'
import logo from '../logo.png'

const NavBar = observer(() => {
  const { userStore } = useContext(Context) as UserType

  const logout = () => {
    userStore.user = {
      name: '',
      email: '',
      id: 0,
    }
    userStore.isAuth = false
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  return (
    <>
      <Navbar bg='primary' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>
            <img src={logo} height='30' alt='' loading='lazy' />
            ToDo-list {userStore.isAuth ? `- ${userStore.user.email}(${userStore.user.name})` : ''}
          </Navbar.Brand>
          <Nav className='ms-auto'>
            {userStore.isAuth && (
              <>
                <Button className='ms-2' variant={'outline-light'} onClick={logout}>
                  Вийти
                </Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  )
})

export default NavBar
