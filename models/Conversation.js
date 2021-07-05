const {Schema,model}=require('mongoose')

const conversationSchema=new Schema({
    creator:{
        id:Schema.Types.ObjectId,
        name:String,
        avatar:String
    },
    participant:{
        id:Schema.Types.ObjectId,
        name:String,
        avatar:String
    },
    last_update:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
})

const Conversation=model('conversation',conversationSchema)
module.exports=Conversation