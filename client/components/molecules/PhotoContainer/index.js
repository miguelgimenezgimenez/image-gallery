import React, { Component } from 'react'
import { connect } from 'react-redux'
import { photoInfo } from '../../../actions/photo'
import PhotoInfo from '../PhotoInfo'

const containerStyle = {
  margin: 10,
  padding: 10,
  flex: '1 25%'
}

class PhotoContainer extends Component {
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
    const { item, height } = this.props
    const imageUrl = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`

    const imageStyle = {
      height,
      width: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundImage: `url(${imageUrl})`
    }

    return (
      <div style={containerStyle}>
        <div style={imageStyle} >
          {this.state.active &&
          <PhotoInfo />}
        </div>
      </div>
    )
  }
}

export default connect()(PhotoContainer)
