import "picnic/picnic.min.css"
import React from 'react'
import { classes, getId, onEscape } from './utils'

export const ModalTrigger = ({ children, label, ...props }) => (
  <label {...props} >{label}{ children }</label>
)

export const ModalWindow = ({ id, footer, checkboxRef, children, className, stack, ...props  }) => (
  <div class={classes("modal",className)}>
    <input id={id} type="checkbox" ref={checkboxRef}/>
    <ModalTrigger className="overlay" htmlFor={id}/>
    <article>
      <header>
        { title && <h3>{title}</h3>}
        <ModalTrigger className="close" htmlFor={id} label="&times;"/>
      </header>
      <section class="content">
        { children }
      </section>
      <footer>
        {footer}
      </footer>
    </article>
  </div>
) 
 
export class Modal extends React.Component{
  constructor(props,context){
    super(props,context)
    this.id = getId()
  }
  componentDidMount(){
    onEscape(this.uncheck)
  }
  uncheck = () => {
    if(!this.checkbox){ return }
    this.checkbox.checked = false
  }
  checkboxRef = (el) => {
    this.checkbox = el
  }
  render(){
    const { label, id:_id, ...props } = this.props
    const id = _id || this.id
    return (
      <span>
        <ModalTrigger htmlFor={id}/>
        <ModalWindow id={id} checkboxRef={this.checkboxRef} {...props}/>
      </span>
    )
  }
}

export default Modal