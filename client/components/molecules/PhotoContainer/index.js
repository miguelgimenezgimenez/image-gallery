import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as photoActions from '../../../actions/photo'
import PhotoInfo from '../PhotoInfo'

const containerStyle = {
  margin: 10,
  flex: '0 20%',
  cursor: 'pointer'
}
const infoStyle = {
  textAlign: 'center',
  width: '100%',
  bottom: 0,
  position: 'absolute'

}

class PhotoContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false
    }
  }

  onMouseEnter (item) {
    photoActions.setCurrentPhoto(this.props.dispatch, item.id)
    this.setState({ active: true })
  }

  onMouseLeave () {
    this.setState({ active: false })
  }

  render () {
    const { item } = this.props
    const imageUrl = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`

    const imageStyle = {
      height: '100%',
      width: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative',
      backgroundImage: `url(${imageUrl})`
    }

    return (
      <div
        onClick={() => photoActions.toggleModal(this.props.dispatch)}
        onMouseEnter={() => this.onMouseEnter(item)}
        onMouseLeave={() => this.onMouseLeave()}
        style={containerStyle}
      >
        <div style={imageStyle} >

          <div style={infoStyle}>
            {this.state.active &&
              <PhotoInfo />}
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(PhotoContainer)
