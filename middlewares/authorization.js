module.exports = (role) => {
    return (req,res,next) => {
        if(role != req.currentUser.role ) {
            return next('You are not Authorized')
        }
        next()
    }
}