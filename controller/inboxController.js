exports.getInboxController=async(req,res,next)=>{
    return res.render('pages/inbox/inbox.ejs',{title:'Inbox'})
}

exports.getInboxTestController=async(req,res,next)=>{
    return res.render('pages/inbox/inboxTest.ejs',{title:'Inbox Test'})
}