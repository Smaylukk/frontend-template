import { observer } from 'mobx-react-lite'
import React, { FormEvent, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'
import {
  MDBBtn,
  MDBCard,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBValidation,
  MDBValidationItem,
} from 'mdb-react-ui-kit'
import useLogin from '../hooks/useLogin'

const Auth = observer(() => {
  const location = useLocation()
  const isLoginPage = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [name, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const passInput = useRef<HTMLInputElement>(null)
  const [alertMsg, setAlertMsg] = useState('')
  const authHandler = useLogin(isLoginPage, setAlertMsg, name, email, password)

  const validateForm = (): boolean => {
    let isValid = true
    if (isLoginPage) return isValid
    if (!passInput.current) return isValid

    if (password.length < 4) {
      passInput.current.setCustomValidity('Довжина паролю має бути більша за 4 символи')
      isValid = false
    }

    return isValid
  }
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    await authHandler()
  }

  return (
    <MDBContainer
      className='d-flex justify-content-center align-items-center'
      style={{ height: window.innerHeight - 56 }}
    >
      <MDBCard style={{ width: 600 }} className='p-3'>
        <h2 className='m-auto'>{isLoginPage ? 'Авторизація' : 'Реєстрація'}</h2>
        <MDBValidation className='row g-3' isValidated onSubmit={onSubmit}>
          <MDBValidationItem
            className='col-md-12'
            feedback='Будь ласка введіть коректний email'
            invalid
          >
            <MDBInput
              label='Введіть ваш email...'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={!isLoginPage}
            />
          </MDBValidationItem>
          {!isLoginPage && (
            <MDBValidationItem className='col-md-12' feedback="Будь ласка заповніть ім'я" invalid>
              <MDBInput
                required
                label="Введіть ваше ім'я..."
                value={name}
                onChange={(e) => setUsername(e.target.value)}
              />
            </MDBValidationItem>
          )}
          <MDBValidationItem
            className='col-md-12'
            invalid
            feedback="Пароль обов'язковий і повинен бути 4 і більше символів"
          >
            <MDBInput
              label='Введіть ваш пароль...'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={!isLoginPage}
              min={!isLoginPage ? 4 : undefined}
              ref={passInput}
            />
          </MDBValidationItem>

          <MDBRow className='d-flex justify-content-between mt-3'>
            <div className='d-flex align-items-center'>
              Немає аккаунту?{' '}
              <NavLink to={isLoginPage ? REGISTRATION_ROUTE : LOGIN_ROUTE}>
                {isLoginPage ? 'Зареєструтесь' : 'Авторизуйтесь'}
              </NavLink>
              <MDBBtn type='submit' color={'success'} outline className='ms-auto'>
                {isLoginPage ? 'Увійти' : 'Зареєструватись'}
              </MDBBtn>
            </div>
          </MDBRow>
          {alertMsg && (
            <MDBRow xs={12} className='mt-3'>
              <div className='myAlert d-flex justify-content-around'>
                <span style={{ flexGrow: 1 }}>{alertMsg}</span>
                <MDBBtn
                  className='btn-close mr-auto'
                  color='none'
                  aria-label='Close'
                  onClick={() => setAlertMsg('')}
                />
              </div>
            </MDBRow>
          )}
        </MDBValidation>
      </MDBCard>
    </MDBContainer>
  )
})

export default Auth
