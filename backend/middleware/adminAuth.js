import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized access, Login" });
        }

        // Verify the token
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user is an admin
        if (token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: Admin only"
            });
        }

        // Attach user information to the request object
        // req.user = token_decoded;

        next();
    } catch (error) {
        console.error("Error in adminAuth middleware:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default adminAuth