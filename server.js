const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

app.use('/static', express.static(__dirname + '/dist/static'));

io.on('connection', socket => {
  console.log('a user connected')
  socket.on('chat message', msg => {
    io.emit('chat message', msg)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(4000, () => {
  console.log('The server is running: http://localhost:4000')
})
