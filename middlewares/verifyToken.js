// const jwt = require('jsonwebtoken');

// module.exports = (req,res,next) => {
//     const header = req.get('Authenticate') || req.get('authenticate')
//     if(!header) {
//         return res.status(401).json('token is required')
//     }
//     const token = header.split(' ')[1];
//     try {
//         const user = jwt.verify(token,process.env.jwtSecretKey)
//         req.currentUser = user;
//         next()
//     } catch (error) {
//         return res.status(401).json('unauthorized')
//     }
// }