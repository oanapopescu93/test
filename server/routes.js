var express = require("express")
var bodyParser = require('body-parser')
var path = require("path")
var router = express.Router()

var products = require('./var/home').PRODUCTS
var market = require('./var/home').MARKET
var profiles = require('./var/home').PROFILES
var donations = require('./var/home').DONATIONS
var slot_prises = require('./var/home').SLOT_PRIZES
var race_rabbits = require('./var/home').RACE_RABBITS
var contact = require('./var/home').CONTACT
var career = require('./var/career').CAREER_ARRAY
var questions = require('./var/questions').QUESTION_ARRAY

var jsonParser = bodyParser.json() 
router.use(express.static(path.resolve(__dirname, '../client/build')))
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

router.post("/api/home", jsonParser, (req, res, next) => {
  let payload = {products, market, profiles, donations, career, questions, slot_prises, race_rabbits, contact: contact}
  res.send(JSON.stringify(payload))
})
router.post("/api/contact", jsonParser, (req, res, next) => {
  let payload = {send: true}
  res.send(payload)
})

module.exports = router