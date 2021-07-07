const User=require('../models/User')
const Conversation=require('../models/Conversation')
const Message=require('../models/Message')

exports.getInboxTestController=async(req,res,next)=>{
    try{

        const conversations=await Conversation.find({
            $or:[
                {"creator.id":req.user._id},
                {"participant.id":req.user._id}
            ]
        })

        console.log(conversations)
        return res.render('pages/inbox/inboxTest.ejs',{title:'Inbox Test',conversations})
    }catch(e){
        console.log(e)
        next(e)
    }
}

exports.getInboxController=async(req,res,next)=>{
    try{

        const conversations=await Conversation.find({
            $or:[
                {"creator.id":req.user._id},
                {"participant.id":req.user._id}
            ]
        })

        console.log(conversations)
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
                message:messages.
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