import "picnic/picnic.min.css"
import React from 'react'
import { classes, numToWord } from './utils'

const breakPointClass = new RegExp('((off)?'+[
  'full',
  'half',
  'third',
  'two-?third',
  'fourth',
  'three-fourth',
  'fifth',
  'two-?fifth',
  'three-?fifth',
  'four-?fifth',
  'sixth',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve'
].join('|')+')-?(\d+)?)|grow|center','i')

const retrieveBreakPointsClasses = (props) => {
  const classNames = Object.keys(props).map(key=>{
    if(props[key]){
      if(breakPointClass.test(key)){
        const className = key.replace(/([a-z\d])([A-Z])/g, '$1-$2').replace(/(\d+)$/g,'-$1').toLowerCase()
        return className
      }
    }
  }).filter(Boolean).join(' ')
  return classNames
}

export const Grid = ({ children, className, columns, ...props }) => (
  <div className={classes('flex',columns && numToWord(columns), retrieveBreakPointsClasses(props), className)} {...props}>
    { children }
  </div>
)

export default Grid