const express = require("express")
const PORT = process.env.PORT || 1111
const app = express()

var http = require('http').createServer(app)
var io = require('socket.io')(http)

var routes = require("./routes")
app.use(routes) 

const path = require("path");
const fs = require('fs')
let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./json/users.json")))

io.on('connection', function(socket) {
  socket.on('signin_send', (data) => {
    let exists = false
    let obj = {}
    for(let i in users){
      if(users[i].user === data.user){
        exists = true
        if(users[i].pass === data.pass){
          obj = {user: users[i].user}
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
    try{
      io.emit('signup_read', data)
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