import "picnic/picnic.min.css"
import React from 'react'
import { classes } from './utils'
import { Checkable } from './Checkable'

export const Checkbox = (props) => <Checkable {...props} className={classes('checkable',props.className)}/>

export default Checkbox