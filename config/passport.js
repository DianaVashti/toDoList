const passport = require('passport')
const strategy = require('passport-local')
const user = require('../database/db')

const verify = (email, password, done) => {
  User.find( email, password )
    .then( user => {
      done( null, user ? user : false )
    })
    .catch( error => done( error ))
}

const usernameInput = 'email'
const passwordInput = 'password'
