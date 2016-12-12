var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/fart', function(req, res, next) {
  res.render('index', { title: 'this is poop' });
});

// router.post('/add', function(req, res, next) {
//
// }

module.exports = router;
