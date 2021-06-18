const router=require('express').Router()
const {profileGetController}=require('../controller/profileController')
const {isAuthenticated}=require('../middlewares/authMiddleware')

router.get('/',isAuthenticated,profileGetController)


module.exports=router