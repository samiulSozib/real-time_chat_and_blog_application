const router=require('express').Router()
const {createPostGetController,createPostPostController,postDetailsController,getEditPostController,postEditPostController,deletePostController}=require('../controller/postController')
const {isAuthenticated}=require('../middlewares/authMiddleware')
const upload=require('../middlewares/uploadMiddleware')
const postvalidator=require('../validator/post/postValidator')


router.get('/create-post',isAuthenticated,createPostGetController)
router.post('/create-post',upload.single('post-thumbnail'),isAuthenticated,postvalidator,createPostPostController)


router.get('/:postId',isAuthenticated,postDetailsController)


router.get('/edit-post/:postId',isAuthenticated,getEditPostController)
router.post('/edit-post/:postId',upload.single('post-thumbnail'),isAuthenticated,postvalidator,postEditPostController)


router.get('/delete/:postId',isAuthenticated,deletePostController)

module.exports=router  