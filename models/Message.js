const {Schema,model, Types}=require('mongoose')

const messageSchema=new Schema({
    text:{
        type:String
    },
    attachment:[ 
        {
            type:String
        }
    ],
    sender:{
        id:Schema.Types.ObjectId,
        name:String,
        avatar:String  
    },
    receiver:{
        id:Schema.Types.ObjectId,
        name:String,
        avatar:String
    },
    date_time:{
        type:Date,
        default:Date.now,
    },
    conversation_id:{
        type:Schema.Types.ObjectId,
        required:true
    }
},{
    timestamps:true
})

const Message=model('Message',messageSchema)
module.exports=Message