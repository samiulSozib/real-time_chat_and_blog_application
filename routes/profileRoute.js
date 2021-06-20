const router=require('express').Router()
const {profileGetController,getAuthorProfile}=require('../controller/profileController')
const {isAuthenticated}=require('../middlewares/authMiddleware')

router.get('/',isAuthenticated,profileGetController)

router.get('/:userId',isAuthenticated,getAuthorProfile)


module.exports=router