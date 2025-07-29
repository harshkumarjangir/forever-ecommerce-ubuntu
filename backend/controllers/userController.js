import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.json({
                success: true,
                token,
                message: "User logged in successfully"
            })
        } else {
            res.json({
                success: false,
                message: "Invalid credentials"
            })
        }

    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({
                success: false,
                message: "User already exists with this email"
            })
        }
        // Validate input -- Validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Invalid email format"
            })
        }
        // if (!validator.isStrongPassword(password)) {
        //     return res.json({
        //         success: false,
        //         message: "Password must be at least 8 characters long, contain uppercase and lowercase letters, numbers, and symbols"
        //     })
        // }
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Password must be at least 8 characters long"
            })
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })
        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({
            success: true,
            token,
            message: "User registered successfully"
        })

    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ message: error.message || "Internal server error" });

    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        // if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
        //     return res.json({
        //         success: false,
        //         message: "Invalid admin credentials"
        //     });
        // }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.status(200).json({
                success: true,
                token,
                message: "Admin logged in successfully"
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid admin credentials"
            });
        }

    } catch (error) {
        console.error("Error in adminLogin:", error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

export { loginUser, registerUser, adminLogin }