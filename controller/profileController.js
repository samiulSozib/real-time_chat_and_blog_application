const User=require('../models/User')
// get profile page

exports.profileGetController=async(req,res,next)=>{

    try{
        //let id=req._id;
        let profile=await User.findOne({_id:req.user._id})
        console.log(profile.name)

        return res.render('pages/profile/profile',{title:"Profile",profile})

    }catch(e){
        console.log(e)
        next(e)
    }

    
}