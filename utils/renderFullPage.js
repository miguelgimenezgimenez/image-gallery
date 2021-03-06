import { renderToString } from 'react-dom/server'
import React from 'react'
import { Provider } from 'react-redux'
import App from '../client/App'
import getStore from '../utils/createStore'
import { listByPage } from '../server/controllers/photo'

async function renderFullPage () {
  const store = getStore()
  let data
  try {
    data = await listByPage(1)
    store.dispatch({
      type: 'PHOTO_NEXT_PAGE_SUCCESS',
      data
    })
  } catch (error) {
    store.dispatch({
      type: 'PHOTO_ERROR',
      error
    })
  }

  const html = renderToString(<Provider store={store}><App /></Provider>)

  const preloadedState = store.getState()
  return `
    <!doctype html>
    <html>
      <head>
        <title> Assessment</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `
}

export default renderFullPage
