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
const { get_device, get_extra_data } = require("./utils/other")
const crypto = require('crypto')
const { roulette } = require("./games/roulette")

const account_type = 1
const user_money = 100
const how_lucky = 7

io.on('connection', function(socket) {
  socket.on('signin_send', (data) => {
    let users_array = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./json/users.json")))
    let login_user = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./json/login.json")))
    let exists = false
    let obj = {}
    let pass01 = data.pass

    for(let i in users_array){
      let pass02 = decrypt(JSON.parse(users_array[i].pass))
      if(data.user === users_array[i].user || data.user === users_array[i].email){
        //the user was found
        exists = true
        if(pass01 === pass02){
          //the password was correct
          let device = get_device(socket.request.headers) // 0 = computer, 1 = mobile, 2 = other
          let timestamp = new Date().getTime()
          obj = {uuid: uuid, user: users_array[i].user, email: users_array[i].email, money: users_array[i].money, device: device}
        }
        break
      }
    }
    try{
      io.to(socket.id).emit('signin_read', {exists, obj})
    }catch(e){
      console.log('[error]','signin_read2--> ', e)
    }
  })

  socket.on('signup_send', (data) => {  
    let users_array = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./json/users.json")))
    let login_user = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./json/login.json")))
    let exists = false
    let obj = {}
    
    if(users_array){
      let user = users_array.filter(function(x){
        return x.user === data.user && x.email === data.email && x.pass === data.pass
      })
      if(user && user.length>0){
        //the user already exists --> old user --> he must sign in
        exists = true
      } else {
        //no user was found --> new user --> he must sign up
        get_extra_data().then(function(res) {
          let id = users_array.length // if the array is empty id will be 0
          let uuid = crypto.randomBytes(20).toString('hex')
          let device = get_device(socket.request.headers) // 0 = computer, 1 = mobile, 2 = other
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
            ip_address: extra_data.ip_address ? extra_data.ip_address : "",
            city: extra_data.city ? extra_data.city : "",
            country: extra_data.city ? extra_data.city : "",
          }
          login_user.push(new_login)
          let payload_login_user = JSON.stringify(login_user)
          fs.writeFileSync(path.resolve(__dirname, "./json/login.json"), payload_login_user)

          //emit
          obj = {
            uuid: uuid, 
            user: data.user, 
            email: data.email, 
            account_type: account_type, 
            money: user_money, 
            device: device
          }
          try{
            io.emit('signup_read', {exists, obj})
          } catch(e){
            console.log('[error]','signup_read :', e)
          }          
        })
      }
    } else {
      try{
        io.emit('signup_read', {exists, obj})
      } catch(e){
        console.log('[error]','signup_read :', e)
      }
    }   
  })  

  // games
	socket.on('roulette_send', function(data) {
    console.log('roulette_send ', data)
		if(data.uuid && data.spin_click === 1){
			let payload = roulette(data, how_lucky)
			try{
				//io.to(room_name).emit('roulette_spin_read', payload)
        io.emit('roulette_read', payload)
			} catch(e){
				console.log('[error]','roulette_read--> ', e)
			}
		}
	})	

  socket.on('join_room', function(room) {
    socket.join(room)
    console.log("User joined "+room)
  })

  socket.on("change_room",function(data){
    socket.leave(socket.room)
    socket.join(data.newroom)
  })

  socket.on('leave_room', function(room) {
      socket.leave(room)
      console.log("User left "+room)
  })

  socket.on('heartbeat', function(data) {
		console.log('heartbeat', data)
	})
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})