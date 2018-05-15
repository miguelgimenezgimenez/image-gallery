import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List } from 'material-ui/List'
import { connect } from 'react-redux'

import Item from '../../molecules/Item'

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
    const { dispatch } = this.props
  }

  handleScroll (event) {
    this.setState({
      scrollTop: event.target.scrollTop
    })
  }

  render () {
    const { availableHeight, scrollTop } = this.state
    const { list, rowHeight } = this.props
    const numRows = list.length
    const totalHeight = rowHeight * numRows

    // Render only the items that are in the viewport by adding them to an array
    const startIndex = Math.floor(scrollTop / rowHeight)
    const endIndex = startIndex + Math.ceil(availableHeight / rowHeight)
    let items = []
    if (list.length) {
      items = list.slice(startIndex, endIndex).map(item => (<Item
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
        style={{ height: '100vh', overflowY: 'scroll' }}
        ref={node => (this.node = node)}
      >
        <div
          style={{
            height: totalHeight - (startIndex * rowHeight),
            paddingTop: startIndex * rowHeight
          }}
        >
          <List>{items}</List>
        </div>

      </div>
    )
  }
}

ListView.propTypes = {
  rowHeight: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  list: state.photo.list,
  loading: state.photo.loading

})
export default connect(mapStateToProps)(ListView)
