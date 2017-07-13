const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const fs = require('fs');
const app = express();
const jade = require('jade');
const index = require('./routers/index');
const register = require('./routers/register');
const moment = require('moment');

app.set('views', './views');
app.set('view engine', 'jade');

let sess = {
    secret: 'keyboard cat',
    counterErrors: 0,
    accessRegister: true
};

app.use(session(sess));
let jsonParser = bodyParser.json();
session.counterErrors = 0;
session.time = 0;

app.post("/register", jsonParser, function(req, res) {
  // console.log('req.body', req.body);
    if(req.body) {
      let is_ok = false;
      let currentTime = moment().format('X');
      let datajson = fs.readFileSync('data.json', 'utf-8');
      if (currentTime - session.time > 60) {
        datajson = JSON.parse(datajson);
          datajson.map(item => {
            if(item.username === req.body.username && item.password === req.body.password) {
              is_ok = true;
            }
          })
      if(is_ok) {
        session.login = req.body.username;
        session.counterErrors = 0;
        session.time = null;
        res.json({code: true});
      } else {
        session.counterErrors++;
        if(session.counterErrors % 3==0) {
          session.accessRegister = false;
          session.time = moment().format('X');
          res.json({'msg': 'Попробуй через минуту', 'code': false});
        }
          console.log(session);
      }
    }
    else {
      console.log('wait');
      res.json({'msg': 'Минута еще не прошла ', 'code': false});
    }
  }
})
app.post("/logout", jsonParser, function(req, res) {
  if(session.login) {
    session.login = null;
    res.end()
  }
})

app.get("/", index);

app.use(express.static(__dirname + "/public"));
app.use(function(req, res) {
  res.end('not found any matches')
});
app.listen(3000);
