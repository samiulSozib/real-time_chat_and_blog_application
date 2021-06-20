const authRoute=require('./authRoute')
const dashboardRouter=require('./dashboardRoute')
const profileRouter=require('./profileRoute')
const postRouter=require('./postRoute')
const uploadRoute=require('./uploadRoute')
const apiRoute=require('../api/routes/apiRoutes')

const routes=[
    {
        path:'/post',
        handler:postRouter
    },
    {
        path:'/profile',
        handler:profileRouter
    },
    {
        path:'/uploads',
        handler:uploadRoute
    },
    {
        path:'/auth',
        handler:authRoute
    },
    {
        path:'/api',
        handler:apiRoute
    },
    {
        path:'/',
        // handler:(req,res,next)=>{
        //     return res.json({
        //         message:'Welcome to my application'
        //     })
        // }
        handler:dashboardRouter
    }
]


module.exports=(app)=>{
    routes.forEach(r=>{
        if(r.path=='/'){
            app.get(r.path,r.handler)
        }else{
            app.use(r.path,r.handler)
        }
    })
}