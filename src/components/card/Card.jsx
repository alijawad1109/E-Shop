import React from 'react'
import './Card.scss'
const Card = ({children,cardClass}) => {
  return (
    <div className={`${cardClass} card`}>
    {children}
    </div>
  )
}

export default Card
