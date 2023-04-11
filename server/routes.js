var express = require("express")
var path = require("path")
var router = express.Router()

var products = require('./var/home').products
var market = require('./var/home').market
var profiles = require('./var/home').profiles
var donations = require('./var/home').donations

router.use(express.static(path.resolve(__dirname, '../client/build')))

router.get("/api/home", (req, res) => {
  res.json({ products, market, profiles, donations })
})

router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

module.exports = router