import { observer } from 'mobx-react-lite'
import React, { FormEvent, useState } from 'react'
import { Button, Card, Container, Form, Row, Col, Alert } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'
import useLogin from '../hooks/useLogin'

const Auth = observer(() => {
  const location = useLocation()
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
    const newErrors = { email: '', name: '', password: '' }
    if (!isLoginPage) {
      if (!name) {
        newErrors.name = 'Найменування обовязкове'
        result = false
      }
    }
    if (!email) {
      newErrors.email = 'Email обовязкове'
      result = false
    }
    if (!/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(email)) {
      newErrors.email = 'Email має бути в email-форматі'
      result = false
    }
    if (!password) {
      newErrors.password = 'Пароль обовязковий'
      result = false
    }
    if (password.length < 4) {
      newErrors.password = 'Довжина паролю має бути більша за 4 символи'

      result = false
    }

    setErrors(newErrors)
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
      className='d-flex justify-content-center align-items-center'
      style={{ height: window.innerHeight - 56 }}
    >
      <Card style={{ width: 600 }} className='p-3'>
        <h2 className='m-auto'>{isLoginPage ? 'Авторизація' : 'Реєстрація'}</h2>
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
          {!isLoginPage && (
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
              <NavLink to={isLoginPage ? REGISTRATION_ROUTE : LOGIN_ROUTE}>
                {isLoginPage ? 'Зареєструтесь' : 'Авторизуйтесь'}
              </NavLink>
              <Button type='submit' variant={'outline-success'} className='ms-auto'>
                {isLoginPage ? 'Увійти' : 'Зареєструватись'}
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
