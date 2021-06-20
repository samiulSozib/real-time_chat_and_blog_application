const router=require('express').Router()

const {isAuthenticated}=require('../../middlewares/authMiddleware')
const {likeGetController,dislikesGetController}=require('../controllers/likeDislikeController')


router.get('/likes/:postId',isAuthenticated,likeGetController)
router.get('/dislikes/:postId',isAuthenticated,dislikesGetController)

module.exports=router