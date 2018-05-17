import express from 'express'
import routes from './routes'
import errorMiddleware from './middlewares/error'
import renderFullPage from '../utils/renderFullPage'
import cors from 'cors'

const port = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(express.static('public'))

app.use('/api', routes)

app.get('/', async (req, res) => {
  const preloadedPage = await renderFullPage()
  res.send(preloadedPage)
})

app.use(errorMiddleware)

app.listen(port, () => {
  // eslint-disable-next-line
  console.log('Express running on http://localhost:3000')
})
