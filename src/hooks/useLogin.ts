import { useContext } from 'react'
import { Context } from '../index'

import UserAPI from '../http/userAPI'
import { useNavigate } from 'react-router-dom'
import { IUser, UserType } from '../store/UserStore'
import { HOME_ROUTE } from '../utils/consts'

const useLogin = (
  isLoginPage: boolean,
  showError: (msg: string) => void,
  name: string,
  email: string,
  password: string,
) => {
  const { userStore } = useContext(Context) as UserType
  const navigate = useNavigate()

  return async () => {
    try {
      let data: IUser
      if (isLoginPage) {
        data = await UserAPI.login(email, password)
      } else {
        data = await UserAPI.registration(email, name, password)
      }

      userStore.user = data
      userStore.isAuth = true

      navigate(HOME_ROUTE)
    } catch (error: any) {
      console.log(error)
      showError(error.response.data.message)
    }
  }
}

export default useLogin
