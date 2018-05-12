require('babel-register')

const path = require('path')
const express = require('express')
const fs = require('fs-extra')
const reactServer = require('react-dom/server')
const React = require('react')

const routes = require('./routes')
const App = require('../client/App').default
const errorMiddleware = require('./middlewares/error')

const port = process.env.PORT || 3000
const app = express()

app.use(express.static(path.resolve(__dirname, '../dist')))

app.use('/api', routes)

app.get('/', async (req, res) => {
  let index = await fs.readFile('./public/index.html', 'utf-8')

  const appRendered = reactServer.renderToString(React.createElement(App))
  index = index.replace(`<%= preloadedApplication %>`, appRendered)
  res.send(index)
})

app.use(errorMiddleware)

app.listen(port, () => {
  // eslint-disable-next-line
    console.log('Express running on http://localhost:3000')
})
