const express = require('express')

const router = express.Router()
router.use('/photo', require('./photo.js'))

module.exports = router
