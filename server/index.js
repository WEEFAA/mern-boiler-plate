const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDbStore = require('connect-mongodb-session')(session)
// app||server instance
const app = express()

// only use local env on 'development'
if(process.env.NODE_ENV !== "production"){
	require('dotenv').config()
}

const { 
	PORT, DEV_DB, SESSION_SECRET,
	MONGO_DB_USER, MONGO_DB_PASSWORD, MONGO_DB_HOST,
	MONGO_DB_NAME, MONGO_DB_PORT, MONGO_DB_PREFIX
 } = process.env 

// construct database uri 
const mongo_uri = DEV_DB || `${MONGO_DB_PREFIX}://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/${MONGO_DB_NAME}?${MONGO_DB_OPTIONS}`

const db_options = {
	useNewUrlParser: true,
	useFindAndModify: true,
	dbName:MONGO_DB_NAME,
	useCreateIndex: true
}

// connect to the database production||development
const database = mongoose.connect(mongo_uri, db_options)

//create a session store
const sessionStore = new MongoDbStore({ uri: mongo_uri })

// configuring session
app.use(session({
	secret: SESSION_SECRET,
	cookie: { 
		maxAge: 1000 * 60 * 60 * 24 * 1 /* one day*/ 
	},
	resave: false,
	saveUninitialized:false,
	store: sessionStore // your session store can be seen in your database collections
}))

//test route <-- delete this route once all setup are complete
app.get('/', function(req,res){
	res.sendStatus(200)
})

//Listen in current port
app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT:${PORT}`))

//EVENTS
// listen for connection
mongoose.connection.on('connected',() => console.log("--Database connected--") )
// listen for session store connection
sessionStore.on('error',() => console.log('--Session Store Error--'))