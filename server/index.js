const express = require("express")
const PORT = process.env.PORT || 1111
const app = express()

var http = require('http').createServer(app)
var io = require('socket.io')(http)

var routes = require("./routes")
app.use(routes) 

const path = require("path");
const fs = require('fs')

const { encrypt, decrypt } = require('./utils/crypto')
const { get_device, get_extra_data, sendEmail, check_streak, chatMessage} = require("./utils/other")
const crypto = require('crypto')
const stripe = require('stripe')("sk_test_51Mdvu1CWq9uV6YuM2iH4wZdBXlSMfexDymB6hHwpmH3J9Dm7owHNBhq4l4wawzFV9dXL3xrYGbhO74oc8OeQn5uJ00It2XDg9U")

const { roulette } = require("./games/roulette")
const { blackjack } = require("./games/blackjack")
const { slots } = require("./games/slots")
const { craps } = require("./games/craps")
const { race } = require("./games/race")
const { keno } = require("./games/keno")

const account_type = 1
const profile_pic = 0
const user_money = 100
const how_lucky = 7

var chatroom_users = []

io.on('connection', function(socket) {
  socket.on('signin_send', (data) => {    
    let users_array = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./json/users.json")))
    let login_user = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./json/login.json")))

    if(users_array){
      let user = users_array.filter(function(x){
        return (x.user === data.user || x.email === data.email) && decrypt(JSON.parse(x.pass)) === data.pass
      })
      if(user && user.length>0){
        let uuid = crypto.randomBytes(20).toString('hex')
        let device = get_device(socket.request.headers) // 0 = computer, 1 = mobile, 2 = other

        //emit
        let obj = {
          uuid: uuid, 
          user: user[0].user, 
          email: user[0].email, 
          account_type: account_type, 
          money: user_money, 
          device: device,
          profile_pic: user[0].profile_pic
        }
        try{
          io.emit('signin_read', {exists: true, obj: obj})
        } catch(e){
          console.log('[error]','signin_read :', e)
        }

        get_extra_data().then(function(res) {
          let uuid = crypto.randomBytes(20).toString('hex')
          let device = get_device(socket.request.headers) // 0 = computer, 1 = mobile, 2 = other
          
          let extra_data = {}
          if(res && res.data){
            extra_data = {
              city: res.data.city ? res.data.city : "",
              country: res.data.country ? res.data.country : "",
              ip_address: res.data.ip_address? res.data.ip_address : "",
            }            
          }   				
          let timestamp = new Date().getTime() + ""
          
          //update
          let objIndex = users_array.findIndex((obj => obj.id == user[0].id))

          //update user for users.json   
          users_array[objIndex].uuid = uuid
          let payload_user = JSON.stringify(users_array)
          fs.writeFileSync(path.resolve(__dirname, "./json/users.json"), payload_user)

          //update user for users.json  
          let login_id = login_user.length
          let new_login = {
            id: login_id,
            user_id: user[0].id,
            login_date: timestamp,
            device: device,
            ip_address: extra_data.ip_address,
            city: extra_data.city,
            country: extra_data.city,
          }
          login_user.push(new_login)
          let payload_login_user = JSON.stringify(login_user)
          fs.writeFileSync(path.resolve(__dirname, "./json/login.json"), payload_login_user)
        })
      } else {
        try{
          io.to(socket.id).emit('signin_read', {exists: false, obj: {}})
        }catch(e){
          console.log('[error]','signin_read2--> ', e)
        }
      }
    } else {
      try{
        io.to(socket.id).emit('signin_read', {exists: false, obj: {}})
      }catch(e){
        console.log('[error]','signin_read2--> ', e)
      }
    }
  })
  socket.on('signup_send', (data) => {  
    let users_array = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./json/users.json")))
    let login_user = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./json/login.json")))
    
    if(users_array){
      let user = users_array.filter(function(x){
        return x.user === data.user && x.email === data.email && decrypt(JSON.parse(x.pass)) === data.pass
      })
      if(user && user.length>0){
        //the user already exists --> old user --> he must sign in
        try{
          io.emit('signup_read', {exists: true, obj: {}})
        } catch(e){
          console.log('[error]','signup_read :', e)
        }
      } else {
        //no user was found --> new user --> he must sign up
        let uuid = crypto.randomBytes(20).toString('hex')
        let device = get_device(socket.request.headers) // 0 = computer, 1 = mobile, 2 = other

        //emit
        let obj = {
          uuid: uuid, 
          user: data.user, 
          email: data.email, 
          account_type: account_type, 
          money: user_money, 
          device: device,
          profile_pic: profile_pic
        }
        try{
          io.emit('signup_read', {exists: false, obj: obj})
        } catch(e){
          console.log('[error]','signup_read :', e)
        } 

        get_extra_data().then(function(res) {
          let id = users_array.length // if the array is empty id will be 0          
          let timestamp = new Date().getTime() + ""   
          let pass = JSON.stringify(encrypt(data.pass))   

          //update users
          let new_user = {
            id: id,
            uuid: uuid,
            user: data.user, 
            email: data.email,
            pass: pass,
            account_type: account_type,
            profile_pic: profile_pic,
            money: user_money,
            signup: timestamp
          } 
          users_array.push(new_user) 
          let payload_user = JSON.stringify(users_array)
          fs.writeFileSync(path.resolve(__dirname, "./json/users.json"), payload_user)

          //update login
          let extra_data = {}
          if(res && res.data){
            extra_data = {
              city: res.data.city ? res.data.city : "",
              country: res.data.country ? res.data.country : "",
              ip_address: res.data.ip_address? res.data.ip_address : "",
            }            
          }          
          let login_id = login_user.length
          let new_login = {
            id: login_id,
            user_id: id,
            login_date: timestamp,
            device: device,
            ip_address: extra_data.ip_address,
            city: extra_data.city,
            country: extra_data.city,
          }
          login_user.push(new_login)
          let payload_login_user = JSON.stringify(login_user)
          fs.writeFileSync(path.resolve(__dirname, "./json/login.json"), payload_login_user)                   
        })
      }
    } else {
      try{
        io.emit('signup_read', {exists: false, obj: {}})
      } catch(e){
        console.log('[error]','signup_read :', e)
      }
    }   
  })  
  socket.on('forgotPassword_send', (data) => {    
    let users_array = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./json/users.json")))
    let user = null    
    for(let i in users_array){
      if(users_array[i].email === data.email){
        user = users_array[i]        
        break
      }
    } 
    if(user){
      sendEmail(user, data).then(function(res){
        try{
          io.to(socket.id).emit('forgotPassword_read', res)
        }catch(e){
          console.log('[error]','forgotPassword_read2--> ', e)
        }
      })      
    } else {
      try{
        io.to(socket.id).emit('forgotPassword_read', {send: "no_user"})
      }catch(e){
        console.log('[error]','forgotPassword_read3--> ', e)
      }
    } 
  })

  // GAMES
	socket.on('roulette_send', function(data) {
		if(data.uuid){
      let room = data.room
			let payload = roulette(data, how_lucky)
			try{
				io.to(room).emit('roulette_read', payload)
			} catch(e){
				console.log('[error]','roulette_read--> ', e)
			}
		}
	})
  socket.on('blackjack_send', function(data) {
		if(data.uuid){
      let room = data.room
      let payload = blackjack(data, how_lucky, chatroom_users)
			try{
				io.to(room).emit('blackjack_read', payload)
			} catch(e){
				console.log('[error]','roulette_read--> ', e)
			}
		}
	})
  socket.on('slots_send', function(data) {
		if(data.uuid){
			let payload = slots(data, how_lucky)
			try{
				//io.to(room_name).emit('slots_read', payload)
        io.emit('slots_read', payload)
			} catch(e){
				console.log('[error]','slots_read--> ', e)
			}
		}
	})
  socket.on('craps_send', function(data) {
		if(data.uuid){
			let payload = craps(data, how_lucky)
			try{
				//io.to(room_name).emit('craps_read', payload)
        io.emit('craps_read', payload)
			} catch(e){
				console.log('[error]','craps_read--> ', e)
			}
		}
	})
  socket.on('race_send', function(data) {
		if(data.uuid){
			let payload = race(data, how_lucky)
			try{
				//io.to(room_name).emit('race_read', payload)
        io.emit('race_read', payload)
			} catch(e){
				console.log('[error]','race_read--> ', e)
			}
		}
	})
  socket.on('keno_send', function(data) {
		if(data.uuid){
			let payload = keno(data, how_lucky)
			try{
				//io.to(room_name).emit('keno_read', payload)
        io.emit('keno_read', payload)
			} catch(e){
				console.log('[error]','keno_read--> ', e)
			}
		}
	})

  socket.on('game_results_send', function(data) {
    let history_user = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./json/history.json")))
    if(history_user){
      console.log('game_results_send ==> ', data)
      if(data.uuid){
        try{
          io.to(socket.id).emit('game_results_read', data)
        } catch(e){
          console.log('[error]','game_results_read--> ', e)
        }
      }
    }    
	})

  // DASHBOARD
  socket.on('dashboardChanges_send', function(data){
    if(data.uuid){
      let users_array = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./json/users.json")))
      for(let i in users_array){
        if(users_array[i].uuid === data.uuid){
          switch(data.type) {
            case "pic":
              users_array[i].profile_pic = data.value
              break
            case "user":
              users_array[i].user = data.value
              break
            case "pass":
              users_array[i].pass = data.value
              break
          }
          break
        }
      }
      let payload_user = JSON.stringify(users_array)
      fs.writeFileSync(path.resolve(__dirname, "./json/users.json"), payload_user)
    }   
  })

  // CHATROOM
  socket.on('join_room', function(data){
    let room = data.room
    socket.join(data.room)

    let timestamp = new Date().getTime()
    let message = {text: 'join', timestamp: timestamp, user: data.user} 
    
    let index = chatroom_users.findIndex((x) => x.uuid === data.uuid)
    if(index === -1){
      //new user in the room
      chatroom_users.push({uuid: data.uuid, user: data.user, room: room, timestamp: timestamp})
    } else {
      //the user exists and he just changed rooms
      chatroom_users[index].room = room
      chatroom_users[index].timestamp = timestamp
    }

    try{
      io.to(room).emit('message_read', message)
      io.to(room).emit('chatroom_users_read', chatroom_users)
    } catch(e){
      console.log('[error]','message_read--> ', e)
    }
  })
  socket.on('leave_room', function(data){
    let room = data.room
    socket.leave(room)
    let timestamp = new Date().getTime()
    let message = {text: 'leave', timestamp: timestamp, user: data.user}
    
    let new_chatroom_users = chatroom_users.filter((x) => x.uuid !== data.uuid)
    chatroom_users = new_chatroom_users

    try{
      io.to(room).emit('message_read', message)
      io.to(room).emit('chatroom_users_read', chatroom_users)
    } catch(e){
      console.log('[error]','message_read--> ', e)
    }
  })
  socket.on('message_send', function(data){
    let room = data.room
    let timestamp = new Date().getTime()
    let message = {text: data.text, timestamp: timestamp, user: data.user}
		try{
      io.to(room).emit('message_read', message)
    } catch(e){
      console.log('[error]','message_read--> ', e)
    }
	})  

  // PAYMENT
  socket.on('payment_stripe_send', function(data) {
    let payload = data.payload
    let gateway = data.gateway
    if(gateway === "stripe"){
      let amount = data.amount
      if(amount){
        let customer = null
        let customerInfo = {
          name: payload.firstname + ' ' + payload.lastname,
          phone: '1234567890',
          email: "customer@gmail.com",
          address: {
            country: payload.country,
            city: payload.city,
            postal_code: payload.postalZipCode,
            line1: payload.address,
            state: payload.country,
          },
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
            name: payload.firstname + ' ' + payload.lastname,
            address_city: payload.city,
            address_country: payload.country,
            address_line1: payload.address,
            address_state: payload.country,
            address_zip: payload.postalZipCode,
          },
        }

        let chargeInfo = {
          receipt_email: "oanapopescu93@gmail.com",
          amount: amount * 100,
          currency: 'usd',
          description: 'bunnybet',
        }
      
        createNewCustomer(customerInfo).then(function(res1) {
          customer = res1
          addNewCard(cardInfo).then(function(res2) {
            card_token = res2          
            createSource(customer.id, card_token.id).then(function(res3) {
              card = res3
              chargeInfo.source = card.id
              chargeInfo.customer = customer.id
              createCharge(chargeInfo).then(function(res4) {
                let obj = res4
                try{
                  io.to(socket.id).emit('payment_stripe_read', obj)
                }catch(e){
                  console.log('[error]','payment_stripe_read--> ', e)
                }
              })
            })
          })
        })
      }
    }
	})

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
  

  socket.on('heartbeat', function(data) {
		console.log('heartbeat', data)
	})
  socket.on('disconnect', function() {  
    console.log('Got disconnect!')
 })
})

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})