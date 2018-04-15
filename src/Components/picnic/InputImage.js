import "picnic/picnic.min.css"
import React from 'react'
import { classes } from './utils'
import { Checkable } from './Checkable'

export const InputImage = ({image, stack, className, children, label, ...props }) => {
  const style = image ? { backgroundImage:`url("${image}")`, ...props.style } : props.style 
  return (
  <div style="width: 200px">
    <label style={style} className={classes('dropimage',{ stack }, className)}>
      <input title={label} type="file"/>
    </label>
    { children }
  </div>
  )
}

export default InputImage
