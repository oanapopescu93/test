var express = require("express")
var bodyParser = require('body-parser')
var paypalPayment = express.Router()

var paypal_mode = require('../var/constants').PAYPAL_MODE
var paypal_client_id = require('../var/constants').PAYPAL_CLIENT_ID
var paypal_client_secret = require('../var/constants').PAYPAL_CLIENT_SECRET

var jsonParser = bodyParser.json() 
const paypal = require('paypal-rest-sdk')
paypal.configure({
  'mode': paypal_mode,
  'client_id': paypal_client_id,
  'client_secret': paypal_client_secret
})

paypalPayment.post('/api/paypal', jsonParser, (req, res, next) => {
    let list = req.body.list
    let amount = req.body.amount
    const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: "/success",
          cancel_url: "/cancel",
        },
        transactions: [
          {
            item_list: {
              items: [
                {
                    name: "Red Sox Hat",
                    sku: "001",
                    price: "25.00",
                    currency: "USD",
                    quantity: 1,
                  },
                  {
                    name: "Red Sox Hat",
                    sku: "001",
                    price: "25.00",
                    currency: "USD",
                    quantity: 1,
                  },
              ],
            },
            amount: {
              currency: "USD",
              total: "50.00",
            },
            description: "Hat for the best team ever",
          },
        ],
    }     
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response)
            throw error
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === "approval_url") {
                    res.json({forwardLink: payment.links[i].href})
                }
            }
        }
    })
})
paypalPayment.post('/success', jsonParser, (req, res) => {
    const payerId = req.query.PayerID
    const paymentId = req.query.paymentId  
  
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "50.00"
            }
        }]
    }
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response)
            throw error
        } else {
            res.json({paypal_results: JSON.stringify(payment)})
        }
    })
})
paypalPayment.post('/cancel', jsonParser, (req, res) => {
    res.json({paypal_results: "cancel"})
})

module.exports = paypalPayment