import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const { token } = req.headers

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized access, Login to continue'
        })
    }
    try {
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decoded.id
        next()
    } catch (error) {
        console.log('Error in authUser middleware:', error)
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        })
    }
}

export default authUser