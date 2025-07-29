import userModel from "../models/userModel.js";

// Add product to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1; // Increment quantity if item already exists
            } else {
                cartData[itemId][size] = 1; // Add new size with quantity 1
            }
        } else {
            cartData[itemId] = {} // Create new item entry
            cartData[itemId][size] = 1; // Add size with quantity 1
        }

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({
            success: true,
            message: "Item added to cart",
            // cartData: cartData // Optionally return updated cart data
        });

    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

// Update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity; // Update the quantity for the specified item and size

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({
            success: true,
            message: "Cart updated successfully",
            // cartData: cartData // Optionally return updated cart data
        });

    } catch (error) {
        console.error("Error in updateCart:", error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

// Get user Cart Data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.status(200).json({
            success: true,
            message: "Cart data retrieved successfully",
            cartData: cartData
            // cartData: cartData || {} // Return empty object if no cart data exists
        });

    } catch (error) {
        console.error("Error in getUserCart:", error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }

}


export { addToCart, updateCart, getUserCart }