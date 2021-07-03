const router=require('express').Router()
const {isAuthenticated}=require('../middlewares/authMiddleware')
const {getDashboard}=require('../controller/dashboardController')



router.get('/',isAuthenticated,getDashboard)


module.exports=router