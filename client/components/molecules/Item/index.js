import React, { Component } from 'react'
import { ListItem } from 'material-ui/List'

class Item extends Component {
  handleClick (item) {
    const { type } = this.props
    this.props.history.push(`/${type}/${item}`)
  }

  render () {
    const primaryText = 'afsfds'
    return (

      <ListItem
        // onClick={() => this.handleClick(item.name || item.title)}
        primaryText={primaryText}
        // secondaryText={secondaryText}
        secondaryTextLines={2}
      />
    )
  }
}
export default Item
