import { $host, $authHost } from '.'
import jwt_decode, { JwtPayload } from 'jwt-decode'
import { IUser } from '../store/UserStore'

class UserAPI {
  async registration(email: string, name: string, password: string): Promise<IUser> {
    const { data, status } = await $host.post('api/user/reg', {
      email,
      name,
      password,
    })
    if (status === 200) {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      return jwt_decode(data.accessToken)
    } else {
      throw new Error(data.message)
    }
  }

  async login(email: string, password: string): Promise<IUser> {
    const { data, status } = await $host.post('api/user/login', {
      email,
      password,
    })
    if (status === 200) {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      return jwt_decode(data.accessToken)
    } else {
      throw new Error(data.message)
    }
  }

  async check(): Promise<IUser> {
    let accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      throw new Error('Access token not found')
    }

    const { exp } = jwt_decode<JwtPayload & IUser>(accessToken)

    if (!exp) {
      throw new Error('Bad access token')
    }

    if (Date.now() >= 1000 * exp!) {
      const refreshToken = localStorage.getItem('refreshToken')

      if (!refreshToken) {
        throw new Error('Refresh token not found')
      }

      const { data } = await $host.post('api/user/refresh', {
        refreshToken,
      })

      accessToken = data.accessToken

      localStorage.setItem('accessToken', accessToken!)
      return jwt_decode(accessToken!)
    } else {
      const { data } = await $authHost.get('api/user/auth')
      localStorage.setItem('accessToken', data.accessToken)
      return jwt_decode(data.accessToken)
    }
  }
}
export default new UserAPI()
