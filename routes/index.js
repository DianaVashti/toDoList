const express = require('express')
const router = express.Router()
const Todos = require('../database/db').Todos

router.post('/add/:id', function(req, res, next) {
  const todoItem = req.body
  const table_id = parseInt(req.params.id)
  console.log(todoItem);
  Todos.addTodo( todoItem, table_id )
    .then( result => {
      res.redirect('/table/' + table_id)
    })
})

router.get('/delete/:id', function(req, res, next) {
  const todoId = req.params.id
  Todos.deleteTodo(todoId)
    .then( () => {
      res.redirect('/')
    })
})

router.post('/table/edit/name', function(req, res, next) {
  var obj = {}
  const name = req.query.name;
  const todoID = parseInt(req.query.id);
  console.log('ID', todoID);
  console.log('NAME', name);
  Todos.updateName(name, todoID)
    .then( results => {
      console.log(results);
      res.json(results)
    })
})

router.post('/table/edit/desc', function(req, res, next) {
  var obj = {}
  const desc = req.query.desc;
  const todoID = parseInt(req.query.id);
  console.log('ID',todoID);
  console.log('DESC',desc);
  Todos.updateDesc(desc, todoID)
    .then( results => {
      res.json(results)
    })
})

router.get('/completed/:id', function(req, res, next) {
  const todoID = parseInt(req.params.id);
  Todos.markComplete(todoID)
    .then( results => {
      res.redirect('/table/' + results.table_id)
    })
})

router.get('/', function(req, res, next){
  //havent done auth so redirect to thumbnail page
  res.render('index')
  // res.redirect('/home')
})

router.get('/home', function(req, res, next){
  //havent done auth so redirect to thumbnail page
  const user_id = 1
  Todos.getUsersTables(user_id)
    .then( results => {
      res.render('thumbnails', {tables:results} )
    })
})

router.post('/home/add_table', function(req, res, next){
  const {table_name} = req.body
  const user_id = parseInt(req.body.user_id)
  return Todos.createNewList(user_id, table_name)
})

router.get('/table/:id', function(req, res, next){
  // temp until auth is done
  const table_id = parseInt(req.params.id);
  console.log(table_id);
  Todos.getAll(table_id)
    .then( results => {
      res.render('table', { uncompleted:results[0], completed:results[1], name:results[2], table_id})
    })
})

module.exports = router;
