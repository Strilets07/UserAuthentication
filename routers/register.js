const router = require('express').Router();
const session = require('express-session');

router.post('/', function(req, res) {
  console.log('req.body', req.body);
});

module.exports = router;
