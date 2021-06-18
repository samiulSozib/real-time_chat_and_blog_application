const {Schema,model}=require('mongoose')

const userSchema=new Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    bio:{
        type:String
    },
    avatar:{
        type:String
    }
},{
    timestamps:true
})

const User=model('user',userSchema)
module.exports=User