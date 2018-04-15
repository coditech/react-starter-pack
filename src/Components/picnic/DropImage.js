import "picnic/picnic.min.css"
import React from 'react'
import { classes } from './utils'
import { InputImage } from './InputImage'
import { readFileLater } from './utils'

const filesList_to_filesArray = (files,multiple) => {
  const sliceStart = 0
  const sliceEnd = multiple ? undefined : 1
  const files = Array.prototype.slice.call(input.files,sliceStart,sliceEnd)
} 

const addGetContents = files => files.map(file=>({ ...file, getContents:readFileLater(file) }))

export class DropImage extends React.Component{
  onChange = (evt) => {
    const { multiple } = this.props
    const input = evt.target
    const value = input.value
    const files = addGetContents(filesList_to_filesArray(input.files))
    if(this.props.onChange){
      if(files.length){
        if(multiple){
          this.props.onChange(files[0],value)
        }else{
          this.props.onChange(files,value)
        }
      }
    }
  }
  render ( ){
    const props = { ...this.props, onChange:this.onChange }
    return <InputImage {...props}/>
  }
}

export default DropImage