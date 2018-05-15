import React, { Component } from 'react'
import { connect } from 'react-redux'

class PhotoInfo extends Component {
  render () {
    const { loading, current } = this.props

    return loading ? 'loading'
      : (
        <div >
          { current.name }
          { current.date }
          { current.title }
          { current.location }
        </div>)
  }
}
const mapStateToProps = state => ({
  loading: state.photo.loading,
  current: state.photo.currentPhoto
})
export default connect(mapStateToProps)(PhotoInfo)
