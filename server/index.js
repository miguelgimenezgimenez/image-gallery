require('babel-register')

const path = require('path')
const express = require('express')
const reactServer = require('react-dom/server')
const React = require('react')

const { Provider } = require('react-redux')

const routes = require('./routes')
const App = require('../client/App').default
const errorMiddleware = require('./middlewares/error')
const getStore = require('../utils/createStore').default
const { listByPage } = require('./controllers/photo')
const renderFullPage = require('../utils/renderFullPage').default

const port = process.env.PORT || 3000
const app = express()

app.use(express.static(path.resolve(__dirname, '../dist')))

app.use('/api', routes)

app.get('/', async (req, res) => {
  const store = getStore()
  const data = await listByPage(1)
  store.dispatch({
    type: 'PHOTO_NEXT_PAGE_SUCCESS',
    data
  })
  const html = reactServer.renderToString(React.createElement(Provider, {
    store

  }, React.createElement(App)))
  const preloadedState = store.getState()
  res.send(renderFullPage(html, preloadedState))
})

app.use(errorMiddleware)

app.listen(port, () => {
  // eslint-disable-next-line
  console.log('Express running on http://localhost:3000')
})
