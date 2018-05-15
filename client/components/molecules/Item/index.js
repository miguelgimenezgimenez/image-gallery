import React, { Component } from 'react'
import { ListItem } from 'material-ui/List'

class Item extends Component {
  render () {
    const { item } = this.props

    return (

      <ListItem
        // onClick={() => this.handleClick(item.name || item.title)}
        primaryText={item.id}
        // secondaryText={secondaryText}
        secondaryTextLines={2}
      />
    )
  }
}
export default Item
