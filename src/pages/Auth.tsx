import { observer } from 'mobx-react-lite'
import React, { FormEvent, useContext, useState } from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Context } from '..'
import UserAPI from '../http/userAPI'
import { LOGIN_ROUTE, HOME_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'
import { UserType } from '../store/UserStore'

const Auth = observer(() => {
  const { userStore } = useContext(Context) as UserType
  const location = useLocation()
  const navigate = useNavigate()
  const isRegPage = location.pathname === REGISTRATION_ROUTE

  const [email, setEmail] = useState('')
  const [name, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{
    email: string
    name: string
    password: string
  }>({ email: '', name: '', password: '' })

  const validateForm = (): boolean => {
    setErrors({ email: '', name: '', password: '' })
    if (isRegPage) {
      if (!name) {
        setErrors((prev) => ({ ...prev, name: 'Найменування обовязкове' }))
      }
    }
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Email обовязкове' }))
    }
    if (!/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: 'Email має бути в email-форматі',
      }))
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Пароль обовязковий' }))
    }
    if (password.length < 4) {
      setErrors((prev) => ({
        ...prev,
        password: 'Довжина паролю має бути більша за 4 символи',
      }))
    }

    return !errors.email && !errors.name && !errors.password
  }
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    try {
      let data
      if (!isRegPage) {
        data = await UserAPI.login(email, password)
      } else {
        data = await UserAPI.registration(email, name, password)
      }

      userStore.user = data
      userStore.isAuth = true

      navigate(HOME_ROUTE)
    } catch (error: any) {
      console.log(error)
      alert(error.response.data.message)
    }
  }

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: window.innerHeight - 56 }}
    >
      <Card style={{ width: 600 }} className='p-3'>
        <h2 className='m-auto'>{!isRegPage ? 'Авторизація' : 'Реєстрація'}</h2>
        <Form name='formAuth' className='d-flex flex-column' onSubmit={onSubmit}>
          <Form.Control
            className='mt-3'
            placeholder='Введіть ваш email...'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <div>
              <p>{errors.email}</p>
            </div>
          )}
          {isRegPage && (
            <Form.Control
              className='mt-3'
              placeholder="Введіть ваше ім'я..."
              value={name}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          {isRegPage && errors.name && (
            <div>
              <p>{errors.name}</p>
            </div>
          )}
          <Form.Control
            className='mt-3'
            placeholder='Введіть ваш пароль...'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <div>
              <p>{errors.password}</p>
            </div>
          )}
          <Row className='d-flex justify-content-between mt-3'>
            <div className='d-flex align-items-center'>
              Немає аккаунту?{' '}
              <NavLink to={!isRegPage ? REGISTRATION_ROUTE : LOGIN_ROUTE}>
                {!isRegPage ? 'Зареєструтесь' : 'Авторизуйтесь'}
              </NavLink>
              <Button type='submit' variant={'outline-success'} className='ms-auto'>
                {!isRegPage ? 'Увійти' : 'Зареєструватись'}
              </Button>
            </div>
          </Row>
        </Form>
      </Card>
    </Container>
  )
})

export default Auth
