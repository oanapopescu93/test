var express = require("express")
var bodyParser = require('body-parser')
var stripePayment = express.Router()

var jsonParser = bodyParser.json() 

stripePayment.post("/api/stripe", jsonParser, (req, res, next) => {
    let payload = req.body.payload
    let amount = req.body.amount
    amount = 100
    if(amount){
        let customer = null
        let customerInfo = {
          name: payload.name,
          email: payload.email,
          description: "stripe customer"
        }

        let card_token = null
        let card = null
        let cardInfo = {
          card: {
            number: '4242424242424242',
            exp_month: 4,
            exp_year: 2024,
            cvc: '314',
            name: payload.name,
          },
        }

        let chargeInfo = {
          receipt_email: "oanapopescu93@gmail.com",
          amount: amount * 100,
          currency: 'usd',
          description: 'bunnybet',
        }

        createNewCustomer(customerInfo).then(function(res1) {            
            if(res1){
                customer = res1
                addNewCard(cardInfo).then(function(res2) {
                    if(res2){
                        card_token = res2          
                        createSource(customer.id, card_token.id).then(function(res3) {
                            if(res3){
                                card = res3
                                chargeInfo.source = card.id
                                chargeInfo.customer = customer.id
                                createCharge(chargeInfo).then(function(res4) {
                                    res.json({type: "stripe", result: "success", payload: res4})
                                })
                            } else {
                                res.json({type: "stripe", result: "error", payload: res3})
                            }
                        })
                    } else {
                        res.json({type: "stripe", result: "error", payload: res2})
                    }
                })
            } else {
                res.json({type: "stripe", result: "error", payload: res1})
            }
        })
    } else {
        res.json({type: "stripe", result: "error", payload: 'no_money'})
    }
})

module.exports = stripePayment

function createNewCustomer(data){
    return new Promise(function(resolve, reject){
        stripe.customers.create(data).then(function(res){
            resolve(res)
        }).catch(err => console.error('error-createNewCustomer--> ' + err)) 
    })
}  
function addNewCard(data){
    return new Promise(function(resolve, reject){
        stripe.tokens.create(data).then(function(res){
            resolve(res)
        }).catch(err => console.error('error-addNewCard--> ' + err))
    })
}
function createSource(customer_id, card_token_id){
    return new Promise(function(resolve, reject){
        stripe.customers.createSource(customer_id, {source: card_token_id }).then(function(res){
            resolve(res)
        }).catch(err => console.error('error-createSource--> ' + err)) 
    })
} 
function createCharge(data){
    return new Promise(function(resolve, reject){
        stripe.charges.create(data).then(function(res){
            resolve(res)
        }).catch(err => console.error('error-addNewCard--> ' + err)) 
    })
}  