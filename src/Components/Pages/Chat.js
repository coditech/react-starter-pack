import React, { Component } from 'react';
import io from 'socket.io-client';
import Default from '../Wrappers/Default'

const Message = ({ id, text, me }) => (
  <div>
    <strong>{id}{me?'*':''}</strong>
    <span>:</span>
    <span>{text}</span>
  </div>
)

class Chat extends Component {
  state = {
    messages:[],
    user_id:null
  }
  componentDidMount(){
    
    const socket = io();
    this.socket = socket;
    
    socket.on('message',({id,text}) => {
      const message = { id, text, me:false, key:this.state.messages.length }
      if(id === this.state.id ){
        message.me = true
      }
      const messages = this.state.messages.slice()
      messages.push(message)
      this.setState({messages})
    })

    socket.on('user_id',(id)=>{
      this.setState({id})
    })
  }
  onSubmit = (evt) =>{
    evt.preventDefault()
    const message = evt.target.userMessage.value
    this.socket.emit('message',message)
  }
  render() {
    const { messages, id } = this.state
    return (
      <Default title="Chat">
        <h1>{id}</h1>
        { messages.map( message => <Message {...message}/>) }
        <form onSubmit={this.onSubmit}>
          <input name="userMessage"/>
        </form>
      </Default>
    );
  }
}

export default Chat;
