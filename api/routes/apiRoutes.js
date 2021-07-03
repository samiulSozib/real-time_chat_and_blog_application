const router=require('express').Router()

const {isAuthenticated}=require('../../middlewares/authMiddleware')
const {likeGetController,dislikesGetController}=require('../controllers/likeDislikeController')
const {commentPostController,replyCommentPostController}=require('../controllers/commentController')


router.get('/likes/:postId',isAuthenticated,likeGetController)
router.get('/dislikes/:postId',isAuthenticated,dislikesGetController)

router.post('/comments/:postId',isAuthenticated,commentPostController)
router.post('/comments/replies/:commentId',isAuthenticated,replyCommentPostController)

module.exports=router