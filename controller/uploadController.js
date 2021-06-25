const User=require('../models/User')
const fs=require('fs')

exports.uploadProfilePics=async(req,res,next)=>{
    if(req.file){
        try{
           let oldProfilePics=req.user.avatar
           let profile=await User.findOne({_id:req.user._id})
           let avatar=`/uploads/${req.file.filename}`
           
           if(profile){
               await User.findByIdAndUpdate(
                   {_id:req.user._id},
                   {$set:{avatar}}
               )
           }

           if(oldProfilePics!='/uploads/default.png'){
               fs.unlink(`public/${oldProfilePics}`,error=>{
                   if(error){
                       console.log(error)
                   }
               })
           }

           res.status(200).json({
               avatar
           })

        }catch(e){
            console.log(e)
            res.status(500).json({
                avatar:req.user.avatar
            })
        }
    }else{
        res.status(500).json({
            avatar:req.user.avatar
        })
    }


}

exports.removeProfilePics=async(req,res,next)=>{
    try{
        let defaultProfile='/uploads/default.png'
        let currentProfilePics=req.user.avatar
        

        fs.unlink(`public${currentProfilePics}`,async(error)=>{
            let profile=await User.findOne({_id:req.user._id})

            if(profile){
                await User.findOneAndUpdate(
                    {_id: req.user._id},
                    {$set:{avatar: defaultProfile}}
                )
            }

        })
        res.status(200).json({
            avatar:defaultProfile
        })

    }catch(e){
        console.log(e)
        res.status(500).json({
            message: 'Can not remove Profile pic'
        })
    }
}



exports.postImageUploadController=(req,res,next)=>{
    if(req.file){
        return res.status(200).json({
            imageUrl:`/uploads/${req.file.filename}`
        })
    }

    return res.status(500).json({
        message:'Server Error'
    })
}