import "picnic/picnic.min.css"
import React from 'react'
import { classes } from './utils'
import { Checkable } from './Checkable'

export const ButtonToggle = (props) => <Checkable {...props} className={classes('toggle button',props.className)}/>

export default ButtonToggle