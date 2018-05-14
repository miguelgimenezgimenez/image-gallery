
import React, { Component } from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ListView from './components/organisms/ListView/index'

const muiTheme = getMuiTheme({})

class App extends Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme} >
        <ListView rowHeight={30} />
      </MuiThemeProvider>)
  }
}

export default App
