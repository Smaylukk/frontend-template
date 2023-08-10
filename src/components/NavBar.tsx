import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '..'
import { UserType } from '../store/UserStore'
import logo from '../logo.png'
import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material'

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
      <AppBar color='secondary' position='static' enableColorOnDark>
        <Container>
          <Toolbar variant={'dense'}>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              href='/'
            >
              <img src={logo} height='30' alt='' loading='lazy' />
            </IconButton>
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='/'
              sx={{
                display: { xs: 'none', md: 'flex' },
                color: 'inherit',
                textDecoration: 'none',
                flexGrow: 1,
              }}
            >
              ToDo-list{' '}
              {userStore.isAuth ? `- ${userStore.user.email}(${userStore.user.name})` : ''}
            </Typography>

            {userStore.isAuth && (
              <>
                <Button className='ms-2' onClick={logout} color='error' variant={'contained'}>
                  Вийти
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
})

export default NavBar
