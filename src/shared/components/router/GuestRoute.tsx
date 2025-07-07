import React, { type FC, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
    children: ReactNode,
    isAuth: boolean
}
const GuestRoute:FC<Props> = ({children, isAuth}) => {
  return !isAuth ? children : <Navigate replace to={"/"}/>
}
export default React.memo(GuestRoute)