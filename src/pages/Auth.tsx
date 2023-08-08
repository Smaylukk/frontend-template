import { observer } from 'mobx-react-lite'
import React, { FormEvent, useContext, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Context } from '..'
import UserAPI from '../http/userAPI'
import { LOGIN_ROUTE, HOME_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'
import { IUser, UserType } from '../store/UserStore'
import {
  MDBBtn,
  MDBCard,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBValidation,
  MDBValidationItem,
} from 'mdb-react-ui-kit'

const Auth = observer(() => {
  const { userStore } = useContext(Context) as UserType
  const location = useLocation()
  const navigate = useNavigate()
  const isRegPage = location.pathname === REGISTRATION_ROUTE

  const [email, setEmail] = useState('')
  const [name, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const passInput = useRef<HTMLInputElement>(null)

  const validateForm = (): boolean => {
    let isValid = true
    console.log(passInput.current)
    if (!passInput.current) return true
    console.log('validation')
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
    try {
      let data: IUser
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
    <MDBContainer
      className='d-flex justify-content-center align-items-center'
      style={{ height: window.innerHeight - 56 }}
    >
      <MDBCard style={{ width: 600 }} className='p-3'>
        <h2 className='m-auto'>{!isRegPage ? 'Авторизація' : 'Реєстрація'}</h2>
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
              required={isRegPage}
            />
          </MDBValidationItem>
          {isRegPage && (
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
              required={isRegPage}
              min={isRegPage ? 4 : undefined}
              ref={passInput}
            />
          </MDBValidationItem>

          <MDBRow className='d-flex justify-content-between mt-3'>
            <div className='d-flex align-items-center'>
              Немає аккаунту?{' '}
              <NavLink to={!isRegPage ? REGISTRATION_ROUTE : LOGIN_ROUTE}>
                {!isRegPage ? 'Зареєструтесь' : 'Авторизуйтесь'}
              </NavLink>
              <MDBBtn type='submit' color={'success'} outline className='ms-auto'>
                {!isRegPage ? 'Увійти' : 'Зареєструватись'}
              </MDBBtn>
            </div>
          </MDBRow>
        </MDBValidation>
      </MDBCard>
    </MDBContainer>
  )
})

export default Auth
