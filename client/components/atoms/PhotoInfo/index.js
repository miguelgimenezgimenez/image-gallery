import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BubbleSpinLoader } from 'react-css-loaders'

class PhotoInfo extends Component {
  render () {
    const { loading, current } = this.props

    return loading ? <BubbleSpinLoader size={10} color="#EC5281" />
      : (
        <div
          style={{
            color: 'white',
            width: '100%',
            margin: 'auto',
            opacity: '0.8',
            backgroundColor: 'gray' }}
        >
          { current.username }
        </div>)
  }
}
const mapStateToProps = state => ({
  loading: state.photo.infoLoading,
  current: state.photo.currentPhoto
})
export default connect(mapStateToProps)(PhotoInfo)
