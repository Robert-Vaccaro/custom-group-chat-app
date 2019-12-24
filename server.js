require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

var Message = mongoose.model('Message',{
  name : String,
  message : String,
})
app.get("/", ()=>{
  console.log("hello world")
})
var dbUrl = process.env.KEY;

app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

app.get("/delete", (req,res)=>{
  res.sendFile(__dirname + '/delete.html');
})

app.post("/deletemessages", (req, res) => {
  pw = {pw:req.body.pw};
  if (pw.pw == process.env.PW){
  mongoose.connection.db.dropCollection('messages', function(err, result) {
    res.sendFile(__dirname + '/index.html');
  });
} else {
  console.log("wrong1")
}
})


app.get('/messages/:user', (req, res) => {
  var user = req.params.user
  Message.find({name: user},(err, messages)=> {
    res.send(messages);
  })
})


app.post('/messages', async (req, res) => {
  try{
    var message = new Message(req.body);

    var savedMessage = await message.save()
      console.log('saved');

    var censored = await Message.findOne({message:'badword'});
      if(censored)
        await Message.remove({_id: censored.id})
      else
        io.emit('message', req.body);
      res.sendStatus(200);
  }
  catch (error){
    res.sendStatus(500);
    return console.log('error',error);
  }
  finally{
    console.log('Message Posted')
  }

})



io.on('connection', () =>{
  console.log('a user is connected')
})

mongoose.connect(dbUrl,{ useNewUrlParser: true } ,(err) => {
  console.log('mongodb connected',err);
})

var server = http.listen(process.env.PORT || 3000)
