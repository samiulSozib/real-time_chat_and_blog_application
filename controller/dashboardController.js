const Post=require('../models/Post')
const {validationResult}=require('express-validator')
const errorFormatter=require('../utils/validationErrorFormatter')
const User = require('../models/User')
const bcrypt=require('bcrypt')


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

        let match_old_password=await bcrypt.compare(oldPassword,user.password)
        if(match_old_password){
            let password=await bcrypt.hash(newPassword,11)
            let updatedUser=await User.findByIdAndUpdate(
                {_id:userId},
                {$set:{password}},
                {new:true}
            )
            //console.log(updatedUser)
            //alert('Password change success')
            return res.redirect('/')
        }
        

    }catch(e){
        console.log(e)
        next(e)
    }
}