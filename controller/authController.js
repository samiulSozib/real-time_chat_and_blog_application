const User=require('../models/User')
const bcrypt=require('bcrypt')
const {validationResult}=require('express-validator')
const errorFormatter=require('../utils/validationErrorFormatter')


// get signup page

exports.signupGetController=async(req,res,next)=>{
    return res.render('pages/auth/signup',{title:"Sign Up",error:{}})
}

// post signup page

exports.signupPostController=async(req,res,next)=>{
    let {name,email,password,confirmPassword}=req.body

    let errors=validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()){
        console.log(errors.mapped());
        return res.render('pages/auth/signup',{title:'Sign Up',error:errors.mapped()})
    }
    
    try{

        let hashPassword=await bcrypt.hash(password,11)
        
        let user=new User({
            name,
            email,
            password:hashPassword,
            bio:'',
            avatar:'/uploads/default.png'
        })

        let createdUser=await user.save()
        if(createdUser){
            return res.redirect('/auth/signin')
        }else{
            return res.redirect('/auth/signup')
        }

    }catch(e){
        console.log(e)
        next(e)
    }
}


// get signin page

exports.signinGetController=async(req,res,next)=>{
    return res.render('pages/auth/signin',{title:"Sign In",error:{}})
}


// post signin page

exports.signinPostController=async(req,res,next)=>{
    let {email,password}=req.body
    console.log(email,password)

    let errors=validationResult(req).formatWith(errorFormatter)

    if(!errors.isEmpty()){
        console.log(errors.mapped())
        return res.render('pages/auth/signin',{title:'Sign In',error:errors.mapped()})
    }

    try{

        let user=await User.findOne({email})
        if(!user){
            console.log('authentication fail')
            return res.render('pages/auth/signin',{title:'Sign In',error:{}})
        }

        let match=await bcrypt.compare(password,user.password)

        if(!match){
            console.log('Authentication fail')
            return res.render('pages/auth/signin',{title:'Sign In',error:{}})
        }

        req.session.isLoggedIn=true
        req.session.user=user
        req.session.save(error=>{
            if(error){
                console.log(error)
                return next(error)
            }
            return res.redirect('/')
        })

        


    }catch(e){
        console.log(e)
        nextt(e)
    }
}


// signout 
exports.signoutController=(req,res,next)=>{
    req.session.destroy(error=>{
        if(error){
            console.log(error)
            return newxt(eror)
        }

        res.redirect('/auth/signin')
    })
}