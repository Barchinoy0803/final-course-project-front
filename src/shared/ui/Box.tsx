import React, { type ReactNode } from 'react'

const Box = ({children, className}:{children:ReactNode,className?:undefined | string}) => {
  return (
    <div className={`bg-white p-6 rounded shadow ${className}`}>{children}</div>
  )
}

export default React.memo(Box)