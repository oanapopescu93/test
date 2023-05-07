var express = require("express")
var bodyParser = require('body-parser')
var stripePayment = express.Router()

var jsonParser = bodyParser.json() 

stripePayment.post("/api/stripe", jsonParser, (req, res, next) => {
  
})

module.exports = stripePayment