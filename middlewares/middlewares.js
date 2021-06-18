const express=require('express')
const morgan=require('morgan')
const session=require('express-session')
const MongoDBStore=require('connect-mongodb-session')(session)
const {bindUserWithRequest}=require('./authMiddleware')
const setLocals = require('./setLocals')


const MONGO_URL=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mycluster.oazue.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const store=new MongoDBStore({
    uri:MONGO_URL,
    collection:'session',
    expires:1000*60*60*2
})

const middlewares=[
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended:true}),
    express.json(),
    session({
        secret:process.env.SECRET_KEY || 'SECRET_KEY',
        resave:false,
        saveUninitialized:false,
        store:store
    }),
    bindUserWithRequest(),
    setLocals()
]

module.exports=(app)=>{
    middlewares.forEach(m=>{
        app.use(m)
    })
}