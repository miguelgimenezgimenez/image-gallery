const express = require('express')
const photoController = require('../controllers/photo')

const router = express.Router()

const asyncWrapper = require('../../utils/asyncWrapper')

router.get('/', asyncWrapper(async (req, res, next) => {
  const { page } = req.query
  const photoList = await photoController.listByPage(page)
  return res.json({ photoList })
}))

module.exports = router
