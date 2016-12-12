const _=require('lodash')

const fs =require('fs')

if(fs.existSync('.env')){
  require('dotenv').config()
}

const connectionString = process.env.DATABASE_URL;
