import React from 'react'
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from './consts'
import Home from '../pages/Home'
import Auth from '../pages/Auth'
import { RouteObject } from 'react-router-dom'

export const authRoutes: RouteObject[] = [{ path: HOME_ROUTE, element: <Home /> }]
export const publicRoutes: RouteObject[] = [
  { path: LOGIN_ROUTE, element: <Auth /> },
  { path: REGISTRATION_ROUTE, element: <Auth /> },
]
