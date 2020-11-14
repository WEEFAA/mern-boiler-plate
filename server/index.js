// server stuff
const express = require('express')
const mongoose = require('mongoose')
// session management
const session = require('express-session')
const MongoDbStore = require('connect-mongodb-session')(session)

// Cross Origin Resource Sharing 
const cors = require('cors')

// app||server instance
const app = express()

// only use local env on 'development'
if(process.env.NODE_ENV !== "production"){
	require('dotenv').config()
}

const { 
	PORT = 4040, 
	DEV_DB = "mongodb://localhost:27017/mern", // PORT 27017 is the default port for mongodb 
	SESSION_SECRET = "default_secret",
	SESSION_COOKIE_NAME = "mern.weefa"
 } = process.env 


const db_options = {
	// these options are recommended by mongodb
	useNewUrlParser: true,
	useFindAndModify: true,
	// optional, more on this mongodb website.
	useCreateIndex: true
}

// connect to the database production||development
const database = mongoose.connect(DEV_DB, db_options)

//create a session store
const sessionStore = new MongoDbStore({ uri: DEV_DB })

// configuring CORS
app.use(cors())

// configuring session
app.use(session({
	secret: SESSION_SECRET,
	cookie: { 
		maxAge: 1000 * 60 * 60 * 24, /* one day*/ 
		httpOnly: true
	},
	resave: false,
	saveUninitialized:false,
	name: SESSION_COOKIE_NAME,
	// using a store is optional,
	// you can use the default MemoryStore of express-session by commenting this property
	// NOTE: only do that if you're in development
	store: sessionStore 
}))

//test route <-- delete this route once all setup are complete
app.get('/', function(req,res){
	res.sendStatus(200)
})

//Listen in PORT
app.listen(PORT, () => console.log(`> Server running on: http://localhost:${PORT}`))

//EVENTS
// listen for database connection
mongoose.connection.on('connected',() => console.log("> MongoDB Database connected"))
// listen for session store connection
sessionStore.on('error',() => console.log('> Session Store Failed'))