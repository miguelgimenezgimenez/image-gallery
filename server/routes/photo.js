const express = require('express')
const photoController = require('../controllers/photo')

const router = express.Router()

const asyncWrapper = require('../../utils/asyncWrapper')

router.get('/', asyncWrapper(async (req, res, next) => {
  const { page } = req.query
  const photoList = await photoController.listByPage(page)
  return res.json(photoList)
}))
router.get('/:id', asyncWrapper(async (req, res, next) => {
  const { id } = req.params
  const photoInfo = await photoController.photoInfo(id)
  return res.json(photoInfo)
}))

module.exports = router
