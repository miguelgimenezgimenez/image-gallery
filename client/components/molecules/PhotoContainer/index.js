import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { photoInfo } from '../../../actions/photo'
import PhotoInfo from '../PhotoInfo'

const containerStyle = {
  margin: 10,
  flex: '0 25%'
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
      height: '100%',
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
PhotoContainer.propTypes = {
  height: PropTypes.number.isRequired
}

export default connect()(PhotoContainer)
