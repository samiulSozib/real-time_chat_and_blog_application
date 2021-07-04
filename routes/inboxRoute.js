const router=require('express').Router()

const {getInboxController,getInboxTestController}=require('../controller/inboxController')
const {isAuthenticated}=require('../middlewares/authMiddleware')

router.get('/test',isAuthenticated,getInboxTestController)
router.get('/',isAuthenticated,getInboxController)


module.exports=router