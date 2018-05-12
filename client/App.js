
import React, { Component } from 'react'
import io from 'socket.io-client'

export default class App extends Component {
  componentDidMount () {
    this.initSocket()
  }

  initSocket () {
    const socket = io('http://localhost:3000')

    socket.emit('chat message', 'aasdasdasdasdasadsasfrqw')
    socket.on('connect', () => {
      console.log('connected')
    })
    console.log('mounteweed', socket)
  }

  render () {
    return (
      <div  />
    )
  }
}
