const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const database = [];

// return the whole database
app.get('/api/coachreport', (req, res) => {
  res.json(database);
})

function updateDatabase(data) {
  console.log(data);
}

app.post('/api/answerquestion', (req, res) => {
  res.json(req.body)
  io.emit('update coach', {
    hello: 'world',
  });

  // const { username, questionID, isCorrect } = req.body.data;
  // const newAttempts = updateDatabase(req.body.data);
  // io.emit('update coach', {
  //   username: 'username',
  //   questionID: 'questionID',
  //   attempts: newAttempts,
  // });
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

app.use('/static', express.static(__dirname + '/dist/static'));

io.on('connection', socket => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(4000, () => {
  console.log('The server is running: http://localhost:4000')
})
