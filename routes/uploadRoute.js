const router=require('express').Router()
const {isAuthenticated}=require('../middlewares/authMiddleware')
const upload=require('../middlewares/uploadMiddleware')
const {uploadProfilePics,removeProfilePics,postImageUploadController}=require('../controller/uploadController')


router.post('/profilePics',isAuthenticated,upload.single('profilePics'),uploadProfilePics)
router.delete('/profilePics',isAuthenticated,removeProfilePics)

router.post('/postimage',isAuthenticated,upload.single('post-image'),postImageUploadController)

module.exports=router