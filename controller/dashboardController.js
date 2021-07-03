const Post=require('../models/Post')
const {validationResult}=require('express-validator')
const errorFormatter=require('../utils/validationErrorFormatter')
const User = require('../models/User')
// get dashboard

exports.getDashboard=async(req,res,next)=>{

    try{

        let posts=await Post.find()
            .populate({
                path:'author',
                select:'name'
            })
            .sort([['_id',-1]])

        //console.log(posts)
        return res.render('pages/dashboard/dashboard.ejs',{title:"Home Page",posts})

    }catch(e){
        console.log(e)
        next(e)
    }

    
}

// change password get controller
exports.getChangePasswordController=async(req,res,next)=>{
    return res.render('pages/dashboard/change_password.ejs',{title:'Change Password',error:{}})
}

exports.postChangePasswordController=async(req,res,next)=>{
    let {oldPassword,newPassword,confirmPassword}=req.body
    let userId=req.user._id
    let errors=validationResult(req).formatWith(errorFormatter)

    try{

        let user=await User.findById(userId)
        if(!errors.isEmpty()){
            //console.log(errors.mapped())
            return res.render('pages/dashboard/change_password.ejs',{title:'Change Password',error:errors.mapped()})
        }

    }catch(e){
        console.log(e)
        next(e)
    }
}