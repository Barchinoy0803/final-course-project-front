import React from 'react'
import "./style.css"

const Loading = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='loader'></div>
    </div>
  )
}

export default React.memo(Loading)