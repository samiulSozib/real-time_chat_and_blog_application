const router=require('express').Router()
const {isAuthenticated}=require('../middlewares/authMiddleware')
const upload=require('../middlewares/uploadMiddleware')
const {postImageUploadController}=require('../controller/uploadController')


router.post('/postimage',isAuthenticated,upload.single('post-image'),postImageUploadController)

module.exports=router