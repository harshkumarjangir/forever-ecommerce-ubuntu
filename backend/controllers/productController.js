import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        // const image1 = req.files?.image1?.[0] || null
        // const image2 = req.files?.image2?.[0] || null
        // const image3 = req.files?.image3?.[0] || null
        // const image4 = req.files?.image4?.[0] || null

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter(item => item !== undefined)

        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
                return result.secure_url
            })
        )

        // console.log(name, description, price, category, subCategory, sizes, bestseller)
        // console.log(image1, image2, image3, image4)
        // console.log(images)
        // console.log(imageUrl)

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            // sizes: sizes ? sizes.split(',') : [],
            sizes: JSON.parse(sizes),
            image: imageUrl,
            date: Date.now()
        }

        console.log(productData)

        const product = new productModel(productData)
        await product.save()

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            messages: `Product ${name} with price ${price} added for sale`,
            title: "150 Rupya Dega"
        })

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}


const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found"
            });
        }
        res.status(200).json({
            success: true,
            products: products
        });
    } catch (error) {
        console.error("Error listing products:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.status(200).json({
            success: true,
            message: "Product removed successfully"
        });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}

const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            product: product
        });

    } catch (error) {
        console.error("Error fetching single product:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });

    }
}

export { addProduct, listProducts, removeProduct, singleProduct }