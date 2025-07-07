import React, { type ReactNode } from 'react'

const Title = ({children, className}:{children:ReactNode, className?:undefined | string}) => {
  return (
    <h2 className={`text-2xl font-semibold ${className ? className : ""}`}>{children}</h2>
  )
}

export default React.memo(Title)