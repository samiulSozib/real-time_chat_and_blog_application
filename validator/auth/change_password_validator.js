const {body}=require('express-validator')


module.exports=[
    body('oldPassword')
    .not().isEmpty()
    .withMessage('Old password can not be empty'),


    body('newPassword')
    .not().isEmpty()
    .withMessage('New Password can not be empty'),

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