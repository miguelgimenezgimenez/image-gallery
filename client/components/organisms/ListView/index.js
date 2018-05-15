import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Photo from '../../molecules/Photo'

class ListView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      availableHeight: 0,
      availableWidth: 0,
      scrollTop: 0
    }
  }

  componentWillMount () {
    console.log(this.node)
  }

  componentDidMount () {
    console.log(this.node)
    // eslint-disable-next-line
    this.setState({
      availableHeight: this.node.clientHeight,
      availableWidth: this.node.clientWidth
    })
  }

  getNextSet () {
    const { dispatch } = this.props
  }

  handleScroll (event) {
    this.setState({
      scrollTop: event.target.scrollTop
    })
  }

  render () {
    const { availableHeight, scrollTop, availableWidth } = this.state
    const { list, rowHeight, itemWidth } = this.props

    const itemsPerRow = Math.floor(availableWidth / (itemWidth + 100))
    const numRows = list.length / itemsPerRow

    const totalHeight = (rowHeight / numRows) * list.length

    // Render only the items that are in the viewport by adding them to an array
    const startIndex = Math.floor(scrollTop / rowHeight)
    const endIndex = startIndex + Math.ceil(availableHeight / rowHeight)
    let items = []
    if (list.length) {
      items = list.slice(startIndex, endIndex).map(item => (<Photo
        key={item.id}
        style={{ height: rowHeight }}
        item={item}
      />))
    }

    const { loading } = this.props
    // Lazy load the next set of items
    if (!loading && list.length - endIndex < 10) {
      this.getNextSet()
    }
    return (
      <div
        onScroll={e => this.handleScroll(e)}
        style={{
          // height: '100vy',
          overflowY: 'scroll' }}
        ref={node => (this.node = node)}
      >
        <div
          style={{
            height: totalHeight - (startIndex * rowHeight),
            paddingTop: startIndex * rowHeight,
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          {items}
        </div>
      </div>
    )
  }
}

ListView.propTypes = {
  rowHeight: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  list: state.photo.list,
  loading: state.photo.loading
})
export default connect(mapStateToProps)(ListView)
