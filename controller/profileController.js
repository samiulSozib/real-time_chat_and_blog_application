const User=require('../models/User')
const Post=require('../models/Post')
// get profile page

exports.profileGetController=async(req,res,next)=>{

    try{
        //let id=req._id;
        let profile=await User.findOne({_id:req.user._id})
        let posts=await Post.find({author:req.user._id})
        //console.log(posts)

        return res.render('pages/profile/profile',{title:"Profile",profile,posts})

    }catch(e){
        console.log(e)
        next(e)
    }
}


exports.getAuthorProfile=async(req,res,next)=>{
    let {userId}=req.params
    console.log(userId)

    if(userId==req.user._id){
        return res.redirect('/profile')
    }

    try{

        let profile=await User.findOne({_id:userId})
        
        let posts=await Post.find({author:userId})
        //console.log(posts)
        return res.render('pages/profile/author_profile',{title:`${profile.name}`,profile,posts})

    }catch(e){
        console.log(e)
        next(e)
    }
}