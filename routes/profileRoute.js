const router=require('express').Router()
const {profileGetController,getAuthorProfile,getEditProfileController,postEditProfileController}=require('../controller/profileController')
const {isAuthenticated}=require('../middlewares/authMiddleware')
const profileValidator=require('../validator/profile/edit_profile_validator')


router.get('/edit-profile/',isAuthenticated,getEditProfileController)
router.post('/edit-profile/',isAuthenticated,profileValidator,postEditProfileController)
router.get('/',isAuthenticated,profileGetController)

router.get('/:userId',isAuthenticated,getAuthorProfile)




module.exports=router