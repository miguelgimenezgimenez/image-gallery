import React, { Component } from 'react'
import { connect } from 'react-redux'
import { photoInfo } from '../../../actions/photo'

const imageStyle = {
  height: 140,
  width: 140
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
  }

  onMouseLeave () {

  }

  render () {
    const { item, current } = this.props
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
        {this.state.active && current.name}
      </div>

    )
  }
}
const mapStateToProps = state => ({
  current: state.photo.current
})
export default connect(mapStateToProps)(Photo)
