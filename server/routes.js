var express = require("express")
var path = require("path")
var router = express.Router()

var products = require('./var/products').products

router.use(express.static(path.resolve(__dirname, '../client/build')))

router.get("/api/home", (req, res) => {
  res.json({ products })
})

router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

module.exports = router