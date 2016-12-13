const express = require('express')
const router = express.Router()
const Todos = require('../database/db').Todos

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/add', function(req, res, next) {
  const todoItem = req.body
  console.log("In routes", todoItem)
  Todos.addTodo( todoItem )
    .then( result => {
      res.redirect('/')
    })
})

router.get('/list', function(req, res, next){
  Todos.getAll()
    .then( results => {
      console.log(results);
    })
})

module.exports = router;
