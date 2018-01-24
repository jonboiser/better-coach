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
  let userMatch = database.find(x => x.username === data.username);
  if (!userMatch) {
    database.push({
      username: data.username,
      history: [],
    });
  }
  userMatch = database.find(x => x.username === data.username);
  const questionMatch = userMatch.history.find(x => x.questionID === data.questionID);
  if (!questionMatch) {
    userMatch.history.push({
      questionID: data.questionID,
      attempts: [data.isCorrect],
    });
    return [data.isCorrect];
  } else {
    questionMatch.attempts.push(data.isCorrect)
    return [...questionMatch.attempts];
  }
}

app.post('/api/answerquestion', (req, res) => {
  const data = req.body;
  const newAttempts = updateDatabase(data);
  io.emit('update coach', {
    username: data.username,
    questionID: data.questionID,
    lastAttempt: data.isCorrect,
  });
  res.json(newAttempts);
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
