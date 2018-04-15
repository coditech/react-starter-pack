import "picnic/picnic.min.css"
import React from 'react'
import { classes } from './utils'

export const Checkable = ({ children, className, stack, success, warning, error, pseudo, checked, onChange, onClick, ...props }) => (
  <label>
    <input onChange={onChange} type="checkbox" checked/>
    <span onClick={onClick} className={ classes({stack, success, warning, error, pseudo}, className)}>{children}</span>
  </label>
)

export default Checkable