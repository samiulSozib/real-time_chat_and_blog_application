const Post=require('../models/Post')
const readingTime=require('reading-time')
const {validationResult}=require('express-validator')
const errorFormatter=require('../utils/validationErrorFormatter')
const fs=require('fs')

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
        author_name:req.user.name,
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

exports.postDetailsController=async(req,res,next)=>{
    let {postId}=req.params
    //console.log(posrtId)

    try{


        //let post=await Post.findOne({_id:postId})
        //console.log(post)

        let post=await Post.findById(postId)
            .populate({
                path:'comments',
                populate:{
                    path:'user',
                    select:'name avatar'
                },
            })
            .populate({
                path:'comments',
                populate:{
                    path:'replies.user',
                    select:'name avatar'
                }
            })

          return res.render('pages/post/post-details',{title:`${post.title}`,post})
        //console.log(post)
        

    }catch(e){
        console.log(e)
        next(e)
    } 

    
}

// get update post controller
exports.getEditPostController=async(req,res,next)=>{

    let {postId}=req.params

    try{

        let post=await Post.findById(postId)
        //console.log(post)
        return res.render('pages/post/edit-post',{title:`${post.title}`,post,error:{}})

    }catch(e){
        console.log(e)
        next(e)
    }

    
}

// post update post controller

exports.postEditPostController=async(req,res,next)=>{
    let {postId}=req.params
    let {title,body}=req.body

    let errors=validationResult(req).formatWith(errorFormatter)

    try{

        let post=await Post.findById(postId)

        if(!post){
            return res.json({
                message:'There is no post'
            })
        }

        if(!errors.isEmpty()){
            return res.render('pages/post/edit-post',{title:`${post.title}`,post,error:errors.mapped()})
        }

        let thumbnail=post.thumbnail
        let old_thumbnail=post.thumbnail
        if(req.file){
            thumbnail=`/uploads/${req.file.filename}`
        }

        let updatedPost=await Post.findOneAndUpdate(
            {_id:post._id},
            {$set:{title,body,thumbnail}},
            {new:true}
        )

        if(updatedPost.thumbnail!=old_thumbnail){
            fs.unlink(`public${old_thumbnail}`,error=>{
                if(error){
                    console.log('thumbnail delete fail')
                }
            })
        }

        return res.redirect(`/post/${postId}`)

    }catch(e){
        console.log(e)
        next(e)
    }
}