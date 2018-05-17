
import React, { Component } from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ListView from './components/organisms/ListView'
import PhotoModal from './components/atoms/PhotoModal'

const muiTheme = getMuiTheme({ userAgent: 'all' })

class App extends Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme} >
        <div >
          <ListView
            rowHeight={200}
          />
          <PhotoModal />
        </div>
      </MuiThemeProvider>)
  }
}

export default App
