import "picnic/picnic.min.css"
import React from 'react'
import { classes } from './utils'

export const Label = ({ children, className, stack, success, warning, error, pseudo, ...props }) => 
  <label className={classes({ stack, success, warning, error, pseudo }, className)} {...props}>{children}</label>

export default Label