const _ = require( 'lodash' )

const fs =require( 'fs' )

if( fs.existsSync( '.env' ) ){
  require( 'dotenv' ).config()
}

const connectionString = process.env.DATABASE_URL

const pgp = require( 'pg-promise' )()

const db = pgp( connectionString )

// - - - QUERIES - - -
const INSERT_TODO = 'INSERT INTO list_item(table_id, item_title, item_description) VALUES($1, $2, $3) ON CONFLICT DO NOTHING RETURNING *'

const GET_ALL_TODOS = 'SELECT * FROM list_item WHERE is_completed = FALSE AND table_id = $1 ORDER BY id DESC'

const GET_ALL_COMP = 'SELECT * FROM list_item WHERE is_completed = TRUE AND table_id = $1 ORDER BY id DESC'

const DELETE_TODO = 'DELETE FROM list_item WHERE id = $1 RETURNING table_id'

const UPDATE_NAME = 'UPDATE list_item SET item_title = $1 WHERE id=$2'

const UPDATE_DESC = 'UPDATE list_item SET item_description = $1 WHERE id=$2'

const MARK_COMPLETE = 'UPDATE list_item SET is_completed = TRUE WHERE id = $1 RETURNING table_id'

const GET_TABLE_NAME = 'SELECT table_name FROM list WHERE id=$1'

const GET_ALL_TABLE_NAMES = 'SELECT table_name, id FROM list WHERE user_id=$1'

const CREATE_NEW_LIST = 'INSERT INTO list(user_id, table_name) VALUES($1, $2) RETURNING *'

const ADD_NEW_USER = 'INSERT INTO person(email, password) VALUES($1, $2) RETURNING *'

const GET_PW = 'SELECT * FROM person WHERE email=$1'

const Todos = {
  addTodo: ( todo, table_id ) => {
    const {item_title, item_description} = todo
    return db.one( INSERT_TODO, [table_id, item_title, item_description])
      .then( result => {
      })
  },
  addNewUser: ( newUserInput ) => {
    const {email, password} = newUserInput
    return db.one( ADD_NEW_USER, [email, password] )
  },
  deleteTodo: ( todoID ) => {
    return db.one( DELETE_TODO, [todoID] )
  },
  updateName: ( item_title, id ) => {
    return db.none( UPDATE_NAME, [item_title, id])
  },
  updateDesc: ( desc, id ) => {
    return db.none( UPDATE_DESC, [desc, id])
  },
  markComplete: ( todoID ) => {
    return db.one( MARK_COMPLETE, [todoID])
  },
  getAll: ( table_id ) => {
      return Promise.all( [db.any( GET_ALL_TODOS, [table_id] ), db.any( GET_ALL_COMP, [table_id]), db.one( GET_TABLE_NAME, [table_id]) ] )
  },
  getUsersTables: ( user_id ) => {
    return db.any( GET_ALL_TABLE_NAMES, [user_id] )
  },
  createNewList: ( user_id, table_name ) => {
    return db.any( CREATE_NEW_LIST, [user_id, table_name] )
  },
  getPassword: ( email ) => {
    return db.one( GET_PW, [email])
  }
}

module.exports = {Todos};
