require('dotenv').config()

const express=require('express')
const mongoose=require('mongoose')

const setMiddlewares=require('./middlewares/middlewares')
const setRoutes=require('./routes/routes')


const app=express()
app.set('view engine','ejs')
app.set('views')

setMiddlewares(app)
setRoutes(app)



const PORT=process.env.PORT || 8888
const DB_USER=process.env.DB_USER
const DB_PASSWORD=process.env.DB_PASSWORD
const DB_NAME=process.env.DB_NAME

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@mycluster.oazue.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('Database connect success')
    app.listen(PORT,()=>{
        console.log('Server Is Ready')
    })
}).catch(e=>{
    return console.log(e)
})
