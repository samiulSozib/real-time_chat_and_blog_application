const User=require('../models/User')
const Conversation=require('../models/Conversation')
const Message=require('../models/Message')


exports.getInboxController=async(req,res,next)=>{
    try{

        const conversations=await Conversation.find({
            $or:[
                {"creator.id":req.user._id},
                {"participant.id":req.user._id}
            ]
        })

        //console.log(conversations)
        return res.render('pages/inbox/inbox.ejs',{title:'Inbox',conversations})
    }catch(e){
        console.log(e)
        next(e)
    }
    
}

// search user

exports.searchUser=async(req,res,next)=>{
    const user=req.body.user
    const searchQuery=user

    const name_search_regex=new RegExp(escape(searchQuery),"i")
    const email_search_regex=new RegExp("^"+escape(searchQuery)+"$","i")

    try{

        if(searchQuery!==""){
            const users=await User.find({
                $or:[
                    {
                        name:name_search_regex,
                    },
                    {
                        email:email_search_regex
                    }
                ]
            },
            "name avatar"
            );

            res.json(users)
        }

    }catch(e){
        console.log(e)
        next(e)
    }
}


// add conversation 

exports.addConversation=async(req,res,next)=>{
    try{

        const newConversation=new Conversation({
            creator:{
                id:req.user._id,
                name:req.user.name,
                avatar:req.user.avatar
            },
            participant:{
                id:req.body.id,
                name:req.body.participant,
                avatar:req.body.avatar||""
            }
        })

        console.log(newConversation)

        const result=await newConversation.save()
        res.status(200).json({
            message:'Conversation add success'
        })

    }catch(e){
        console.log(e)
        next(e)
    }
}

// get message of a conversation

exports.getMessage=async(req,res,next)=>{
    try{

        const messages=await Message.find({
            conversation_id:req.params.conversation_id
        }).sort("-createdAt")

        const {participant}=await Conversation.findById(req.params.conversation_id)

        res.status(200).json({
            data:{
                messages:messages,
                participant
            },
            user:req.user._id,
            conversation_id:req.params.conversation_id
        });

    }catch(e){
        res.status(500).json({
            errors: {
                common: {
                  msg: "Unknows error occured!",
                },
              },
        })
            
            
    }
}

// send new message

exports.sendMessage=async(req,res,next)=>{
    let message=req.body.message
    console.log(message)
    if(message){
        
        try{
            // // save message
             let attachments=null
            // if(req.files && req.files.lenght>0){
                 attachments=[]

            //     req.files.forEach((file)=>{
            //         attachments.push(file.filename)
            //     })
            // }

            const newMessage=new Message({
                text:message,
                attachment:attachments,
                sender: {
                    id: req.user._id,
                    name: req.user.name,
                    avatar: req.user.avatar || null,
                  },
                  receiver: {
                    id: req.body.receiverId,
                    name: req.body.receiverName,
                    avatar: req.body.avatar || null,
                  },
                  conversation_id:req.body.conversationId
            })

            console.log(newMessage)
            const result=await newMessage.save()
            console.log(result)
            // emit socket event

            global.io.emit("new_message",{
                    message: {
                        conversation_id: req.body.conversationId,
                        sender: {
                          id: req.user._id,
                          name: req.user.name,
                          avatar: req.user.avatar || null,
                        },
                        message: req.body.message,
                        attachment: attachments,
                        date_time: result.date_time,
                    }
            })

            res.status(200).json({
                message:"Successful",
                data:result
            })

        }catch(e){
            res.status(500).json({
                message:e.errors
            })
        }
    }else{
        console.log('some thing wrong')
    }
}