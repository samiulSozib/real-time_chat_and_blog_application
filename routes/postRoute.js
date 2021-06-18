const router=require('express').Router()
const {createPostGetController,createPostPostController}=require('../controller/postController')
const {isAuthenticated}=require('../middlewares/authMiddleware')
const upload=require('../middlewares/uploadMiddleware')
const postvalidator=require('../validator/post/postValidator')


router.get('/create-post',isAuthenticated,createPostGetController)
router.post('/create-post',upload.single('post-thumbnail'),isAuthenticated,postvalidator,createPostPostController)

module.exports=router 