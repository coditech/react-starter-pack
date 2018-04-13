import React from 'react'

export class Toggler extends React.Component{
  constructor(props,context){
    super(props,context)
    this.state = {
      isOpen:props.isOpen || false,
      maxHeight:0
    }
  }
  getHeight(){
    const maxHeight = this.container.scrollHeight
    if(maxHeight !== this.state.maxHeight){
      this.setState({maxHeight})
    }
  }
  componentDidMount(){
    this.getHeight()
  }
  componentDidUpdate(){
    this.getHeight()
  }
  toggle = () => this.setState({isOpen:!this.state.isOpen}) 
  render(){
    const { label, labelClose, children } = this.props
    const { isOpen, maxHeight } = this.state
    const text = (isOpen ? labelClose || label : label) || 'toggle'
    const height = isOpen ? maxHeight : 0
    const baseClassName = this.props.baseClassName || 'toggler'
    const className = `${baseClassName} ${baseClassName}-`+(isOpen ? 'open':'close')
    const style = {overflow:'hidden', height}
    return (
      <div className={className}>
        <button onClick={this.toggle} className={`${baseClassName}_button`}>
          <span>{text}</span>
        </button>
        <div ref={(element)=>this.container = element} style={style} className={`${baseClassName}_togglee`}>
          { children }
        </div>
      </div>
    )
  }
}

export default Toggler