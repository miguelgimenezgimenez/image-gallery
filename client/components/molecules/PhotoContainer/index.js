import React, { Component } from 'react'
import { connect } from 'react-redux'
import { photoInfo } from '../../../actions/photo'
import PhotoInfo from '../PhotoInfo'

const imageStyle = {
  backgroundRepeat: 'no-repeat',
  margin: 10,
  flex: '0 25%',
  backgroundSize: 'cover'
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
    const { item, height, width } = this.props
    const imageUrl = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`

    const style = {
      // height,
      // width,
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

export default connect()(PhotoContainer)
