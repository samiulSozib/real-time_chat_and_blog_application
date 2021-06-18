const Post=require('../models/Post')
const readingTime=require('reading-time')
const {validationResult}=require('express-validator')
const errorFormatter=require('../utils/validationErrorFormatter')

// get create page controller
exports.createPostGetController=async(req,res,next)=>{
    return res.render('pages/post/create-post',{title:'Create-Post',error:{}})
} 


// post create page controller

exports.createPostPostController=async(req,res,next)=>{
    let {title,body}=req.body

    let errors=validationResult(req).formatWith(errorFormatter)

    if(!errors.isEmpty()){
        console.log(errors.mapped())
        return res.render('pages/post/create-post',{title:'Create-Post',error:errors.mapped()})
    }


    let readTime=readingTime(body).text
    
    let post=new Post({
        title,
        body,
        thumbnail:'',
        readTime,
        author:req.user._id,
        likes:[],
        dislikes:[],
        comments:[]
    })

    if(req.file){
        post.thumbnail=`/uploads/${req.file.filename}`
    }

    console.log(post)

    try{

        let createdPost=await post.save()
        if(createdPost){
            return res.redirect('/')
        }else{
            return res.redirect('/')
        }
        
    }catch(e){
        console.log(e)
        next(e)
    }
}