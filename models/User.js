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
        type:String,
        default:'/uploads/default.png'
    }
},{
    timestamps:true
})

const User=model('User',userSchema)
module.exports=User