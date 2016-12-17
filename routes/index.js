const express = require('express')
const router = express.Router()
const Todos = require('../database/db').Todos
router.post('/newUser/', function(req, res, next) {
    const newUserInput = req.body
    Todos.addNewUser( newUserInput )
    .then( result => {
      res.redirect('/')
    })
})

router.post('/add/:id', function(req, res, next) {
  const todoItem = req.body
  const user_id = req.query.user
  const table_id = parseInt(req.params.id)
  Todos.addTodo( todoItem, table_id )
    .then( results => {
      res.redirect('/table/' + table_id + '/?user=' + user_id)
    })
})

router.get('/delete/:id', function(req, res, next) {
  const todoId = req.params.id
  const user_id = req.query.user
  Todos.deleteTodo(todoId)
    .then( ( results ) => {
      res.redirect('/table/' + results.table_id + '/?user=' + user_id)
    })
})

router.post('/table/edit/name', function(req, res, next) {
  var obj = {}
  const name = req.query.name;
  const todoID = parseInt(req.query.id);
  Todos.updateName(name, todoID)
    .then( results => {
      res.json(results)
    })
})

router.post('/table/edit/desc', function(req, res, next) {
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
  const user_id = req.query.user
  Todos.markComplete(todoID)
    .then( results => {
      res.redirect('/table/' + results.table_id + '/?user=' + user_id)
    })
})

router.get('/', function(req, res, next){
  res.render('login')
})

router.get('/signup/', function(req, res, next){
  res.render('signup')
})

router.post('/auth', function(req, res, next){
  const {email, password} = req.body
  Todos.getPassword( email )
    .then( results => {
      if (results.password === password){
        const user_id = results.id
        res.redirect('/home/?user='+user_id)
      } else {
        res.redirect('/')
      }
    })
})

router.get('/home', function(req, res, next){
  const user_id = req.query.user
  Todos.getUsersTables(user_id)
    .then( results => {
      res.render('thumbnails', {tables:results, user_id} )
    })
})

router.post('/home/add_table', function(req, res, next){
  const {table_name} = req.body
  const user_id = parseInt(req.body.user_id)
  return Todos.createNewList(user_id, table_name)
    .then( results => {
      Todos.getUsersTables(user_id)
      .then( results => {
        res.render('thumbnails', {tables:results, user_id} )
      })
    })
})

router.get('/table/:id', function(req, res, next){
  const table_id = parseInt(req.params.id);
  const user_id = req.query.user
  Todos.getAll(table_id)
    .then( results => {
      res.render('table', { uncompleted:results[0], completed:results[1], name:results[2], table_id, user_id})
    })
})

module.exports = router;
