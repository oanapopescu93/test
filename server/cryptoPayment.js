var express = require("express")
var bodyParser = require('body-parser')
var cryptoPayment = express.Router()

var jsonParser = bodyParser.json() 

cryptoPayment.post("/api/crypto", jsonParser, (req, res, next) => {
  
})

module.exports = cryptoPayment