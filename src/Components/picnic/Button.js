import "picnic/picnic.min.css"
import React from 'react'
import { classes } from './utils'


export const Button = ({ children, className, stack, success, warning, error, pseudo, ...props }) => 
  <button className={classes({ stack, success, warning, error, pseudo }, className)} {...props}>{children}</button>

export default Button