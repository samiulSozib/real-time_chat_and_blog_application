exports.postImageUploadController=(req,res,next)=>{
    if(req.file){
        return res.status(200).json({
            imageUrl:`/uploads/${req.file.filename}`
        })
    }

    return res.status(500).json({
        message:'Server Error'
    })
}