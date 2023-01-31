const asyncHandler = (fn) => async (req,res,next) => {
    try {
        await fn(req,res,next)
    } catch (err) {
        res.status(err.code).json({
            success:false,
            message:err.message
        })
    }
}

export default asyncHandler;