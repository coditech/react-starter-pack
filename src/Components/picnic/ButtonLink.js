import "picnic/picnic.min.css"
import React from 'react'
import { classes } from './utils'

export const ButtonLink = ({ children, className, stack, success, warning, error, pseudo, ...props }) => 
  <a className={classes('button',{ stack, success, warning, error, pseudo }, className)} {...props}>{children}</a>

export default ButtonLink