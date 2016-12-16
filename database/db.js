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

const DELETE_TODO = 'DELETE FROM list_item WHERE id = $1'

const UPDATE_NAME = 'UPDATE list_item SET item_title = $1 WHERE id=$2'

const UPDATE_DESC = 'UPDATE list_item SET item_description = $1 WHERE id=$2'

const MARK_COMPLETE = 'UPDATE list_item SET is_completed = TRUE WHERE id = $1 RETURNING table_id'

const GET_TABLE_NAME = 'SELECT table_name FROM table_name WHERE table_id=$1'

const GET_ALL_TABLE_NAMES = 'SELECT table_name, table_id FROM table_name JOIN list ON list.id=table_name.table_id WHERE user_id=$1'


const Todos = {
  addTodo: ( todo, table_id ) => {
    const {item_title, item_description} = todo
    console.log("In DB.js: ")
    console.log(item_title)
    console.log(item_description)
    return db.one( INSERT_TODO, [table_id, item_title, item_description])
      .then( result => {
        console.log( result )
      })
  },
  deleteTodo: ( todoID ) => {
    return db.none( DELETE_TODO, [todoID] )
  },
  updateName: ( item_title, id ) => {
    console.log('Update NAME!', item_title, id);
    return db.none( UPDATE_NAME, [item_title, id])
  },
  updateDesc: ( desc, id ) => {
    console.log('Update DESC', desc, id);
    return db.none( UPDATE_DESC, [desc, id])
  },
  markComplete: ( todoID ) => {
    return db.one( MARK_COMPLETE, [todoID])
  },
  getAll: ( table_id ) => {
    console.log('TABLE ID', table_id);
      return Promise.all( [db.any( GET_ALL_TODOS, [table_id] ), db.any( GET_ALL_COMP, [table_id]), db.one( GET_TABLE_NAME, [table_id]) ] )
  },
  getUsersTables: ( user_id ) => {
    console.log('USER TABLE #: ', user_id);
    return db.any( GET_ALL_TABLE_NAMES, [user_id] )
  }

}

module.exports = {Todos};
