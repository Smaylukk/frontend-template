import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { MDBBtn, MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav } from 'mdb-react-ui-kit'
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
      <MDBNavbar bgColor='success' dark>
        <MDBContainer>
          <MDBNavbarBrand href='/'>
            <img src={logo} height='30' alt='' loading='lazy' />
            ToDo-list {userStore.isAuth ? `- ${userStore.user.email}(${userStore.user.name})` : ''}
          </MDBNavbarBrand>
          <MDBNavbarNav className='ms-auto w-auto'>
            {userStore.isAuth && (
              <>
                <MDBBtn className='ms-2' onClick={logout} color='danger'>
                  Вийти
                </MDBBtn>
              </>
            )}
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
    </>
  )
})

export default NavBar
