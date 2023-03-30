const express = require("express")
const PORT = process.env.PORT || 1111
const app = express()

var http = require('http').createServer(app)
var io = require('socket.io')(http)

var routes = require("./routes")
app.use(routes) 

io.on('connection', function(socket) {
  socket.on('message_send', (data) => {
    try{
      io.emit('message_read', data)
    }catch(e){
        console.log('[error]','message_read :', e)
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