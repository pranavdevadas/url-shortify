import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import User from '../model/user.js'

const protect = expressAsyncHandler(async (req, res, next) => {
    let token

    token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            res.status(401).json({message : 'Not authorized, invalid token'})
        }
    } else {
        res.status(401).json({message : 'Not authorized, no token'})
    }
})

export default protect