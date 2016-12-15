const express = require('express')
const router = express.Router()
const Todos = require('../database/db').Todos

router.post('/add', function(req, res, next) {
  const todoItem = req.body
  Todos.addTodo( todoItem )
    .then( result => {
      res.redirect('/')
    })
})

router.get('/delete/:id', function(req, res, next) {
  const todoId = req.params.id
  Todos.deleteTodo(todoId)
    .then( () => {
      res.redirect('/')
    })
})

router.post('/edit/name', function(req, res, next) {
  var obj = {}
  const name = req.query.name;
  const todoID = parseInt(req.query.id);
  Todos.updateName(name, todoID)
    .then( results => {
      console.log(results);
      res.json(results)
    })
})

router.post('/edit/desc', function(req, res, next) {
  var obj = {}
  const desc = req.query.desc;
  const todoID = parseInt(req.query.id);
  Todos.updateDesc(desc, todoID)
    .then( results => {
      res.json(results)
    })
})

router.get('/completed/:id', function(req, res, next) {
  const todoID = parseInt(req.params.id);
  Todos.markComplete(todoID)
  // Todos.setComplete(todoID)
    .then( results => {
      console.log('IN ROUTE', results);
      res.redirect('/')
    })
})


router.get('/', function(req, res, next){
  Todos.getAll()
    .then( results => {
      console.log('UNCOMPLETED', results[0] );
      console.log('COMPLETED', results[1] );
      res.render('index', { uncompleted:results[0],completed:results[1]})
    })
})

module.exports = router;
