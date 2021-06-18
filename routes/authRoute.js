const router=require('express').Router()
const signupValiator=require('../validator/auth/signup')
const signinValidator=require('../validator/auth/signin')
const {isUnAuthenticated}=require('../middlewares/authMiddleware')
const {signupGetController,signupPostController,signinGetController,signinPostController,signoutController}=require('../controller/authController')


router.get('/signup',isUnAuthenticated,signupGetController)
router.post('/signup',isUnAuthenticated,signupValiator,signupPostController)


router.get('/signin',isUnAuthenticated,signinGetController)
router.post('/signin',isUnAuthenticated,signinValidator,signinPostController)

router.get('/signout',signoutController)

module.exports=router