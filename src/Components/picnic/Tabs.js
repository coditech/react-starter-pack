import "picnic/picnic.min.css"
import React,  { Children } from 'react'
import { classes, getId, numToWord } from './utils'

export const Tab = ({ key, id, name, checked, className, label, value, onChange }) => {
  
  return [
    <input key={key+'-input'} id={id} type='radio' onChange={onChange} value={value} name={name} checked />,
    <label key={key+'-label'} className={className} htmlFor={id}>{ label }</label>
  ]
}

export const Tabs = ({ children, className, name, pseudo=true, value:selected, onChange, ...props }) => {
  const count = Children.count(children)
  const num = numToWord(count)
  const tabClasses = classes({pseudo},"button toggle")
  if(!name){ name = 'tabs-'+getId() }
  const labels = Children.reduce( ( arr, child, index) => {
    const key = child.key + 'label'
    const id = (child.props.id ? child.props.id : index) + 'toggle'
    const checked = selected === index
    const value = index
    const label = child.props.label || child.props.title || child.props.alt || index
    const tab = Tab({ key, id, name, checked, className:tabClasses, label, value, onChange })
    arr.push(tab)
    return arr
  }, [])
  return (
    <div className={classes('tabs',num,className)}>
      { labels }
      <div class="row">
        { children }
      </div>
    </div>
  )
}

export default Tabs