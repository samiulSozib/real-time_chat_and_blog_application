// get dashboard

exports.getDashboard=async(req,res,next)=>{
    return res.render('pages/dashboard/dashboard.ejs',{title:"Home Page"})
}