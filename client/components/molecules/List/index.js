import React, { Component } from 'react'

export default class List extends Component {
  render () {
    const style = { display: 'flex', flexWrap: 'wrap' }
    return (
      <div style={style} >
        {this.props.children}
      </div>
    )
  }
}
