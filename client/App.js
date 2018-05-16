
import React, { Component } from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ListView from './components/organisms/ListView/index'

const muiTheme = getMuiTheme({ userAgent: 'all' })

class App extends Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme} >
        <div >
          <ListView
            rowHeight={200}
          />
        </div>
      </MuiThemeProvider>)
  }
}

export default App
