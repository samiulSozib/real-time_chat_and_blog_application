const router=require('express').Router()
const {isAuthenticated}=require('../middlewares/authMiddleware')
const {getChangePasswordController,postChangePasswordController}=require('../controller/dashboardController')
const changePasswordValidator=require('../validator/auth/change_password_validator')



router.get('/change-password',isAuthenticated,getChangePasswordController)
router.post('/change-password',isAuthenticated,changePasswordValidator,postChangePasswordController)

module.exports=router