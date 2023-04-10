import { makeAutoObservable } from 'mobx'

export interface IUser {
  name: string
  email: string
  id: number
}
export type UserType = {
  userStore: UserStore
}
export default class UserStore {
  private _isAuth: boolean
  private _user: IUser
  constructor() {
    this._isAuth = false
    this._user = {
      name: '',
      email: '',
      id: 0,
    }
    makeAutoObservable(this)
  }

  set isAuth(bool: boolean) {
    this._isAuth = bool
  }

  set user(user: IUser) {
    this._user = user
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  get isAuth(): boolean {
    return this._isAuth
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  get user(): IUser {
    return this._user
  }
}
