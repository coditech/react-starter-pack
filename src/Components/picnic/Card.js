import "picnic/picnic.min.css"
import React from 'react'
import { classes } from './utils'

export const Card = ({className, stack, children, title, ...props}) => (
  <article className={classes('card', { stack }, className)}>
    <header>
      { title && <h3>{title}</h3> }
    </header>
    <footer>
      { children }
    </footer>
  </article>
)

export default Card