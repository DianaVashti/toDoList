const express = require('express')
const router = express.Router()
const Todos = require('../database/db').Todos

router.post('/add', function(req, res, next) {
  const todoItem = req.body
  console.log("In routes", todoItem)
  Todos.addTodo( todoItem )
    .then( result => {
      res.redirect('/')
    })
})

router.get('/delete/:id', function(req, res, next) {
  const todoId = req.params.id
  console.log('ToDo id', todoId)
  Todos.deleteTodo(todoId)
    .then( () => {
      res.redirect('/')
    })
})

router.get('/', function(req, res, next){
  Todos.getAll()
    .then( results => {
      res.render('index', { allToDos:results })
    })
})

module.exports = router;
