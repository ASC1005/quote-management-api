import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Quote } from "../models/quote.model.js"
import { Product } from "../models/product.model.js"
import { emailer } from "../utils/emailer.js"

const createQuote = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        throw new ApiError(400, "Quote must include at least one item.");
    }

    let total = 0;

    for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product) {
            throw new ApiError(404, `Product with ID ${item.product} not found.`);
        }
        total += product.price * item.quantity;
    }

    const quote = await Quote.create({ userId, items, total });

    return res.status(201).json(
        new ApiResponse(201, quote, "Quote created successfully")
    );
});

const getUserQuotes = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const quotes = await Quote.find({ userId })
        .sort({ createdAt: -1 })
        .populate("items.product");

    return res.status(200).json(
        new ApiResponse(200, quotes, "Quotes fetched successfully")
    );
});

const getQuoteById = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { id } = req.params;

    const quote = await Quote.findOne({ _id: id, userId }).populate("items.product");

    if (!quote) {
        throw new ApiError(404, "Quote not found");
    }

    return res.status(200).json(
        new ApiResponse(200, quote, "Quote fetched successfully")
    );
});

const updateQuote = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { id } = req.params;
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        throw new ApiError(400, "Quote must include items.");
    }

    let total = 0;

    for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product) {
            throw new ApiError(404, `Product with ID ${item.product} not found.`);
        }
        total += product.price * item.quantity;
    }

    const filteredItems = items.filter(item => item.quantity > 0);
    const updatedQuote = await Quote.findOneAndUpdate(
        { _id: id, userId },
        { items: filteredItems, total },
        { new: true }
    );

    if (!updatedQuote) {
        throw new ApiError(404, "Quote not found or not authorized");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedQuote, "Quote updated successfully")
    );
});

const deleteQuote = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { id } = req.params;

    const deletedQuote = await Quote.findOneAndDelete({ _id: id, userId });

    if (!deletedQuote) {
        throw new ApiError(404, "Quote not found or not authorized");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Quote deleted successfully")
    );
});

const requestQuote = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { id } = req.params;

    const quote = await Quote.findOne({ _id: id, userId }).populate("items.product");

    if (!quote) {
        throw new ApiError(404, "Quote not found");
    }

    quote.requested = true;
    await quote.save();

    const adminEmail = process.env.ADMIN_EMAIL;

    const htmlContent = `
        <p>User <strong>${req.user.email}</strong> has requested a quote.</p>
        <p>Quote Details:</p>
        <pre>${JSON.stringify(quote, null, 2)}</pre>
    `;

    await emailer(adminEmail, `Quote Requested By ${req.user.email}`, htmlContent);

    return res.status(200).json(
        new ApiResponse(200, quote, "Quote requested successfully")
    );
});

export {
    createQuote,
    getUserQuotes,
    getQuoteById,
    updateQuote,
    deleteQuote,
    requestQuote
}
