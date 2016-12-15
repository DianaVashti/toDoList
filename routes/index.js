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

router.post('/edit/name', function(req, res, next) {
  var obj = {}
  const name = req.query.name;
  const todoID = parseInt(req.query.id);
  // res.send(req.body)
  console.log(typeof(name));
  console.log(obj);
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
  // res.send(req.body)
  console.log(typeof(desc));
  console.log(obj);
  Todos.updateDesc(desc, todoID)
    .then( results => {
      console.log(results);
      res.json(results)
    })
})

router.post('/completed', function(req, res, next) {
  Todos.setComplete(completed, todoID)
    .then( results => {
      res.redirect('/')
    })
})


router.get('/', function(req, res, next){
  Todos.getAll()
    .then( results => {
      res.render('index', { allToDos:results, isEdit: false })
    })
})

module.exports = router;
