import React, { Component } from 'react'
import { connect } from 'react-redux'
import { photoInfo } from '../../../actions/photo'
import PhotoInfo from '../PhotoInfo'

const imageStyle = {
  height: '100%',
  width: '100%',
  padding: 30
}
class Photo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false
    }
  }

  onMouseEnter (item) {
    photoInfo(this.props.dispatch, item.id)
    this.setState({ active: true })
  }

  onMouseLeave () {
    this.setState({ active: false })
  }

  render () {
    const { item } = this.props
    const imageUrl = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`

    const style = {
      ...imageStyle,
      backgroundImage: `url(${imageUrl})`
    }

    return (

      <div
        style={style}
        onMouseEnter={() => this.onMouseEnter(item)}
        onMouseLeave={() => this.onMouseLeave()}
      >
        {this.state.active &&
        <PhotoInfo />}
      </div>

    )
  }
}

export default connect()(Photo)
