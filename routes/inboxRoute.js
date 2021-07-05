const router=require('express').Router()

const {getInboxController,getInboxTestController,searchUser,addConversation}=require('../controller/inboxController')
const {isAuthenticated}=require('../middlewares/authMiddleware')


router.post('/search',isAuthenticated,searchUser)
router.post('/add-conversation',isAuthenticated,addConversation)

router.get('/test',isAuthenticated,getInboxTestController)
router.get('/',isAuthenticated,getInboxController)


module.exports=router