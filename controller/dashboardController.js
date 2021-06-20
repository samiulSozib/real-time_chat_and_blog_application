const Post=require('../models/Post')

// get dashboard

exports.getDashboard=async(req,res,next)=>{

    try{

        let posts=await Post.find().sort([['_id',-1]])

        return res.render('pages/dashboard/dashboard.ejs',{title:"Home Page",posts})

    }catch(e){
        console.log(e)
        next(e)
    }

    
}