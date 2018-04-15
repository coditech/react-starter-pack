import "picnic/picnic.min.css"
import React from 'react'
import { classes } from './utils'

export const Radio = ({ name, label, onChange, onClick, stack, className, ...props }) => (
  <label {...props} className={classes({ stack }, className)}>
    <input type='radio' name={ name } onChange={onChange}/>
    <span class="checkable" onClick={onClick}>{ label }</span>
  </label>
)

export default Radio