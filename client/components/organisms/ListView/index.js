import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BarLoader } from 'react-css-loaders'

import PhotoContainer from '../../molecules/PhotoContainer'
import { searchNextPage } from '../../../actions/photo'

const loaderStyle = {
  position: 'absolute',
  top: '60% ',
  left: '50% '
}

class ListView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      availableHeight: 0,
      scrollTop: 0
    }
  }

  componentDidMount () {
    // eslint-disable-next-line
    this.setState({
      availableHeight: this.node.clientHeight
    })
  }

  getNextSet () {
    const { dispatch, currentPage } = this.props
    searchNextPage(dispatch, currentPage)
  }

  handleScroll (event, totalHeight) {
    const maxScroll = Math.min(totalHeight - this.state.availableHeight, event.target.scrollTop)
    this.setState({
      scrollTop: maxScroll
    })
  }

  render () {
    const { availableHeight, scrollTop } = this.state
    const { list, rowHeight, loading } = this.props
    /*  The Flex properties are set to have 4 items per row, so the total height will be divided by 4 */
    // Render only the items that are in the viewport by adding them to an array
    const startIndex = Math.floor(scrollTop / rowHeight) * 4
    const endIndex = startIndex + (startIndex && 1) + (Math.ceil((availableHeight / rowHeight)) * 4)
    let items = []
    if (list.length) {
      items = list.slice(startIndex, endIndex + (endIndex && 1)).map(item => (<PhotoContainer
        key={item.id}
        item={item}
      />))
    }
    const totalHeight = rowHeight * Math.ceil(list.length / 4)

    // Lazy load the next set of items
    if (!loading && list.length - endIndex < 10) {
      this.getNextSet()
    }
    return (
      <div
        onScroll={e => this.handleScroll(e, totalHeight)}
        style={{
          width: '100%',
          height: '100vh',
          overflowY: 'scroll' }}
        ref={node => (this.node = node)}
      >
        <div
          style={{
            height: totalHeight / 4 - (startIndex * 4 * rowHeight),
            paddingTop: startIndex * rowHeight / 4,
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          {items}
        </div>
        {
          this.props.loading &&
          <BarLoader
            style={loaderStyle}
            color="#EC5281"
            size={
              22
            }
          />
        }
      </div>
    )
  }
}

ListView.propTypes = {
  rowHeight: PropTypes.number.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape).isRequired
}

const mapStateToProps = (state, ownProps) => ({
  list: state.photo.list,
  loading: state.photo.listLoading,
  currentPage: state.photo.currentPage
})
export default connect(mapStateToProps)(ListView)
