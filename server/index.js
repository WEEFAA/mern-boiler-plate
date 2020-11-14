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
	PORT = 4040, 
	DEV_DB = "mongodb://localhost:27017/mern", // PORT 27017 is the default port for mongodb 
	SESSION_SECRET = "default_secret"
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