const express = require("express")
const PORT = process.env.PORT || 1111
const app = express()

var http = require('http').createServer(app)
var io = require('socket.io')(http)

var routes = require("./routes")
app.use(routes) 

const path = require("path");
const fs = require('fs')
let users_array = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./json/users.json")))
const { encrypt, decrypt, encrypt_jwt, decrypt_jwt } = require('./utils/crypto')
const { get_device } = require("./utils/other")
const crypto = require('crypto')

const account_type = 1
const user_money = 100

io.on('connection', function(socket) {
  socket.on('signin_send', (data) => {
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
    let user = users_array.filter(function(x){
      return x.user === data.user && x.email === data.email && x.pass === data.pass
    })
    let exists = false
    let obj = {}
    if(user && user.length>0){
      //the user already exists --> old user --> he must sign in
      exists = true
    } else {
      //no userwas found --> new user --> he must sign up
      let uuid = crypto.randomBytes(20).toString('hex')
      let device = get_device(socket.request.headers) // 0 = computer, 1 = mobile, 2 = other
      let timestamp = new Date().getTime()
      let pass = JSON.stringify(encrypt(data.pass))
      obj = {uuid:uuid, user: data.user, email: data.email, account_type: account_type, money: user_money, device: device}
      users_array.push({...obj, signup: timestamp, pass: pass})
    }
    try{
      io.emit('signup_read', {exists, obj})
    }catch(e){
        console.log('[error]','signup_read :', e)
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