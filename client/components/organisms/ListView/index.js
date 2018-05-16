import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PhotoContainer from '../../molecules/PhotoContainer'

class ListView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      availableHeight: 0,
      availableWidth: 0,
      scrollTop: 0
    }
  }

  componentDidMount () {
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
    const itemsPerRow = Math.floor(availableWidth / (itemWidth + 100)) || 1

    const numRows = list.length / itemsPerRow

    const totalHeight = (rowHeight / numRows) * list.length
    // const totalHeight = rowHeight * list.length

    // Render only the items that are in the viewport by adding them to an array
    const startIndex = Math.floor(scrollTop / rowHeight)
    const endIndex = startIndex + Math.ceil((rowHeight * itemsPerRow) / availableHeight)
    let items = []
    if (list.length) {
      items = list.slice(startIndex, endIndex).map(item => (<PhotoContainer
        key={item.id}
        height={rowHeight}
        width={itemWidth}
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
          height: '100vy',
          overflowY: 'scroll' }}
        ref={node => (this.node = node)}
      >
        <div
          style={{
            // width: 800,
            height: totalHeight - (startIndex * rowHeight),
            paddingTop: startIndex * rowHeight,
            display: 'flex',
            justifyContent: 'center',
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
