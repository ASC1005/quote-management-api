import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, products, "Products fetched successfully")
    );
});

const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image } = req.body;

    if (!name || !price || !description || !image) {
        throw new ApiError(400, "All fields are required.");
    }

    const product = await Product.create({ name, price, description, image });

    return res.status(201).json(
        new ApiResponse(201, product, "Product created successfully")
    );
});

export { getAllProducts, createProduct };