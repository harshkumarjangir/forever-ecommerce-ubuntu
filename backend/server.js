import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectMongoDB from "./config/mongoDb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoutes.js";

// App Configuration
const app = express()
const PORT = process.env.PORT || 4000;

// Database Configuration
connectMongoDB() // Connect to MongoDB using the connectMongoDB function

// Cloudinary Configuration
connectCloudinary() // Connect to Cloudinary using the connectCloudinary function

// Middleware
app.use(express.json())
app.use(cors())

// Api Routes Endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send('Welcome to Backend Server for React App')
})

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})