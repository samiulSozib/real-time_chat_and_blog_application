const {body}=require('express-validator')
const User=require('../../models/User')

module.exports=[
    body('name')
    .isLength({min:2,max:100})
    .withMessage('Name Must Be greater than 2 chars'),

    body('email')
    .isEmail()
    .withMessage('Please Provide a valid email')
    .custom(async email=>{
        let user=await User.findOne({email})
        if(user){
            return Promise.reject('Email Already Exixts')
        }
    }).normalizeEmail(),

    body('password')
     .isLength({min:6})
     .withMessage('Password must be grater than 5 char'),

     body('confirmPassword')
     .isLength({min:5})
     .withMessage('Password must be greater than 5 char')
     .custom((confirmPassword,{req})=>{
         if(confirmPassword!=req.body.password){
             return Promise.reject('Password does not match')
         }
         return true
     })
]