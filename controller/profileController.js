const User=require('../models/User')
const Post=require('../models/Post')
const { validationResult } = require('express-validator')
const validationErrorFormatter = require('../utils/validationErrorFormatter')
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

// edit profile get controller
exports.getEditProfileController=async(req,res,next)=>{
    let profileId=req.user._id
  

    try{
        let profile=await User.findById(profileId)
        //console.log(profile)


        return res.render('pages/profile/edit-profile',{title:`${profile.name}`,profile,error:{}})

    }catch(e){
        console.log(e)
        next(e)
    }

    
}

// edit profile post controller
exports.postEditProfileController=async(req,res,next)=>{
    let profileId=req.user._id
    let {name,bio}=req.body
    let errors=validationResult(req).formatWith(validationErrorFormatter)
    

    try{
        let profile=await User.findById(profileId)

        if(!errors.isEmpty()){
            return res.render('pages/profile/edit-profile',{title:`${profile.name}`,profile,error:errors.mapped()})
        }

        await User.findByIdAndUpdate(
            {_id:profile._id},
            {$set:{name,bio}},
            {new:true}
        )
        //console.log(name,bio)

        return res.redirect('/profile')


    }catch(e){
        console.log(e)
        next(e)
    }
}

