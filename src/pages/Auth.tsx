import { observer } from 'mobx-react-lite'
import React, { FormEvent, useState } from 'react'
import { Alert, Box, Button, Container, Grid, TextField } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'
import useLogin from '../hooks/useLogin'

const Auth = observer(() => {
  const isLoginPage = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [name, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{
    email: string
    name: string
    password: string
  }>({ email: '', name: '', password: '' })
  const [alertMsg, setAlertMsg] = useState('')
  const authHandler = useLogin(isLoginPage, setAlertMsg, name, email, password)

  const validateForm = (): boolean => {
    let result = true
    setErrors((prev) => ({ ...prev, email: '', name: '', password: '' }))
    if (!isLoginPage) {
      if (!name) {
        setErrors((prev) => ({ ...prev, name: 'Найменування обовязкове' }))
        result = false
      }
    }
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Email обовязкове' }))
      result = false
    }
    if (!/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: 'Email має бути в email-форматі',
      }))
      result = false
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Пароль обовязковий' }))
      result = false
    }
    if (password.length < 4) {
      setErrors((prev) => ({
        ...prev,
        password: 'Довжина паролю має бути більша за 4 символи',
      }))
      result = false
    }

    return result
  }
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    await authHandler()
  }

  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{
        display: 'flex',
        height: window.innerHeight - 56,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box style={{ width: 600 }} className='p-3'>
        <h2 className='m-auto'>{isLoginPage ? 'Авторизація' : 'Реєстрація'}</h2>
        <Box component='form' className='row g-3' noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label='Введіть ваш email...'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={!isLoginPage}
                fullWidth
                helperText={errors.email}
                error={errors.email.length > 0}
              />
            </Grid>
            {!isLoginPage && (
              <Grid item xs={12}>
                <TextField
                  required
                  label="Введіть ваше ім'я..."
                  value={name}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  helperText={errors.name}
                  error={errors.name.length > 0}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                label='Введіть ваш пароль...'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={!isLoginPage}
                fullWidth
                helperText={errors.password}
                error={errors.password.length > 0}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                color='success'
                variant='outlined'
                className='ms-auto'
                fullWidth
              >
                {isLoginPage ? 'Увійти' : 'Зареєструватись'}
              </Button>
            </Grid>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                Немає аккаунту?{' '}
                <NavLink to={isLoginPage ? REGISTRATION_ROUTE : LOGIN_ROUTE}>
                  {isLoginPage ? 'Зареєструтесь' : 'Авторизуйтесь'}
                </NavLink>
              </Grid>
            </Grid>
            {alertMsg && (
              <Grid item xs={12}>
                <Alert severity='error' onClose={() => setAlertMsg('')}>
                  {alertMsg}
                </Alert>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  )
})

export default Auth
