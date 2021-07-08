const router=require('express').Router()

const {getInboxController,searchUser,addConversation,getMessage,sendMessage}=require('../controller/inboxController')
const {isAuthenticated}=require('../middlewares/authMiddleware')


router.post('/search',isAuthenticated,searchUser)
router.post('/add-conversation',isAuthenticated,addConversation)


router.get('/message/:conversation_id',isAuthenticated,getMessage)
router.post('/message',isAuthenticated,sendMessage)

// router.get('/test',isAuthenticated,getInboxTestController)
router.get('/',isAuthenticated,getInboxController)


module.exports=router