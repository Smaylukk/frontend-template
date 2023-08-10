import { observer } from 'mobx-react-lite'
import React, { FormEvent, useContext, useState } from 'react'
import { Button, Card, Container, Form, Row, Col, Alert } from 'react-bootstrap'
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
  const [alertMsg, setAlertMsg] = useState('')

  const validateForm = (): boolean => {
    let result = true
    setErrors({ email: '', name: '', password: '' })
    if (isRegPage) {
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
      setAlertMsg(error.response.data.message)
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
          <Form.Group as={Col} md='12' className='position-relative mt-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder='Введіть ваш email...'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
          </Form.Group>
          {isRegPage && (
            <Form.Group as={Col} md='12' className='position-relative mt-3'>
              <Form.Label>{"Ім'я користувача"}</Form.Label>
              <Form.Control
                placeholder="Введіть ваше ім'я..."
                value={name}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
            </Form.Group>
          )}
          <Form.Group as={Col} md='12' className='position-relative mt-3'>
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              placeholder='Введіть ваш пароль...'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
          </Form.Group>
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
          {alertMsg && (
            <Row xs={12} className='mt-3'>
              <Alert variant='danger' dismissible onClose={() => setAlertMsg('')}>
                {alertMsg}
              </Alert>
            </Row>
          )}
        </Form>
      </Card>
    </Container>
  )
})

export default Auth
