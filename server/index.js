const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDbStore = require('connect-mongodb-session')(session)

// app||server instance
const app = express()
// configurations
const config = !process.env.NODE_ENV ? require('../config') : process.env
const { 
	PORT, DEV_DB, SESSION_SECRET,
	MONGO_DB_USER, MONGO_DB_PASSWORD, MONGO_DB_HOST,
	MONGO_DB_NAME, MONGO_DB_PORT
 } = config 

// construct database uri 
const mongodb_uri = DEV_DB ||  `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}.mlab.com:${MONGO_DB_PORT}/${MONGO_DB_NAME}`
const db_options = {
	useNewUrlParser:true,
	useFindAndModify:true
}
// connect to the database production||development
const database = mongoose.connect(mongodb_uri, db_options)

//create a session store
const sessionStore = new MongoDbStore({ uri: mongodb_uri })

// configuring session
app.use(session({
	secret: SESSION_SECRET,
	cookie: { maxAge: 1000 * 60 * 60 * 24 * 1 /* one day*/ },
	resave: false,
	saveUninitialized:false,
	store: sessionStore
}))

//Listen in current port
app.listen(PORT, () => console.log(`>SERVER RUNNING ON PORT:${PORT}`))

//EVENTS
// listen for connection
mongoose.connection.on('connected',() => console.log("--Database connected--") )
// listen for session store connection
sessionStore.on('error',() => console.log('--Session Store Error--'))