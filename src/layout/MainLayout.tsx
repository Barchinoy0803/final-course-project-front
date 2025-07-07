import React, { useEffect, useState } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Nav from './components/nav/Nav'
import { useAuth } from '@/features/auth/service/useAuth'
import { useDispatch } from 'react-redux'
import { logout } from '@/features/auth/store/auth.slice'

const MainLayout = () => {
  const {getMe} = useAuth()
  const { isError } = getMe()
  const dispatch = useDispatch()
  const [show, setShow] = useState<boolean>(true)

  useEffect(()=> {
    if(isError){
      dispatch(logout())
    }
  }, [isError])
  
  return (
    <div className='flex'>
        <Sidebar show={show}/>
        <main className='flex-1 bg-base-bg max-w-full overflow-hidden'>
            <Nav setShow={setShow} show={show}/>
            <div className='p-4'>
              <Outlet/>
            </div>
        </main>
    </div>
  )
}

export default React.memo(MainLayout)