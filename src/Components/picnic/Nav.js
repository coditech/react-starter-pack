import "picnic/picnic.min.css"
import React from 'react'
import { classes, getId } from './utils'

export const Nav = ({ logo, title, url, label, stack, className, id=getId() }) => (
  <nav id={id} className={classes({ stack }, className)}>
    { ( logo || title ) && <a href={url} class="brand">
      { logo && <img class="logo" src={logo} /> }
      { title && <span>{ title }</span> }
      </a>
    }

    <input id={id+'checkbox'} type="checkbox" class="show"/>
    <label htmlFor={id+'checkbox'} class="burger pseudo button">{ label || '≡' }</label>

    <div class="menu">
      { children }
    </div>
  </nav>
)

export default Nav