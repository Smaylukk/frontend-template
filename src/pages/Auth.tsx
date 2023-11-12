import { observer } from 'mobx-react-lite'
import React, { FormEvent, useState } from 'react'
import {
  Flex,
  Heading,
  Input,
  Button,
  Stack,
  Box,
  Avatar,
  FormControl,
  AlertIcon,
  Alert,
  FormErrorMessage,
} from '@chakra-ui/react'
import { NavLink, useLocation } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'
import useLogin from '../hooks/useLogin'

const Auth = observer(() => {
  const location = useLocation()
  const isLoginPage = location.pathname === LOGIN_ROUTE

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [alertMsg, setAlertMsg] = useState('')
  const authHandler = useLogin(isLoginPage, setAlertMsg, name, email, password)
  const [errors, setErrors] = useState<{
    email: string
    name: string
    password: string
  }>({ email: '', name: '', password: '' })

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
    console.log(newErrors)
    return result
  }
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setAlertMsg('')
    if (validateForm()) {
      await authHandler()
    }
  }

  return (
    <Flex
      flexDirection='column'
      width='100wh'
      height='100vh'
      backgroundColor='gray.200'
      justifyContent='center'
      alignItems='center'
    >
      <h2>{isLoginPage ? 'Авторизація' : 'Реєстрація'}</h2>
      <Stack flexDir='column' mb='2' justifyContent='center' alignItems='center'>
        <Avatar bg='teal.500' />
        <Heading color='teal.400'>Вітаємо</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={onSubmit}>
            <Stack spacing={4} p='1rem' backgroundColor='whiteAlpha.900' boxShadow='md'>
              <FormControl isInvalid={!!errors.email}>
                <Input
                  type='email'
                  placeholder='Email користувача'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              {!isLoginPage && (
                <FormControl isInvalid={!!errors.name}>
                  <Input
                    type='text'
                    placeholder="Ім'я користувача"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
              )}
              <FormControl isInvalid={!!errors.password}>
                <Input
                  type='password'
                  placeholder='Пароль'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <Button
                borderRadius={0}
                type='submit'
                variant='solid'
                colorScheme='teal'
                width='full'
              >
                {isLoginPage ? 'Авторизація' : 'Реєстрація'}
              </Button>
            </Stack>
          </form>
        </Box>
        <Alert status='error' display={alertMsg.length ? 'flex' : 'none'}>
          <AlertIcon />
          {alertMsg}
        </Alert>
      </Stack>
      <Box>
        Немає аккаунту?{' '}
        <NavLink to={isLoginPage ? REGISTRATION_ROUTE : LOGIN_ROUTE}>
          {isLoginPage ? 'Зареєструтесь' : 'Авторизуйтесь'}
        </NavLink>
      </Box>
    </Flex>
  )
})

export default Auth
