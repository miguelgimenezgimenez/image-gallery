import path from 'path'
import express from 'express'
import reactServer from 'react-dom/server'
import React from 'react'

import { Provider } from 'react-redux'

import routes from './routes'
import App from '../client/App'
import errorMiddleware from './middlewares/error'
import getStore from '../utils/createStore'
import { listByPage } from './controllers/photo'
import renderFullPage from '../utils/renderFullPage'

const port = process.env.PORT || 3000
const app = express()

app.use(express.static(path.resolve(__dirname, '../dist')))

app.use('/api', routes)

app.get('/', async (req, res) => {
  const store = getStore()
  const data = await listByPage(1)
  store.dispatch({ type: 'PHOTO_NEXT_PAGE_SUCCESS', data })
  const html = reactServer.renderToString(<Provider store={store}><App /></Provider>)

  const preloadedState = store.getState()
  res.send(renderFullPage(html, preloadedState))
})

app.use(errorMiddleware)

app.listen(port, () => {
  // eslint-disable-next-line
  console.log('Express running on http://localhost:3000')
})
