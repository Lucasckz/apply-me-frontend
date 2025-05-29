import React from 'react'
import { cardInterface } from '../types'
import styles from './Card.module.css'
const Card = ({btn,description,downloadLink,title}: cardInterface) => {
  return (
    <article>
      {title}
    </article>
  )
}

export default Card
