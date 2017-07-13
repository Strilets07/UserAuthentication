const router = require('express').Router();
const session = require('express-session');

router.get('/', function(req, res) {
  if(session.login != null) {
    res.render('profile', { username: session.login });
  } else {
    res.render('register', {title: "Система Аутентификации пользователей"})
  }
});

module.exports = router;
