import { Router } from "express";
import {
    createQuote,
    getUserQuotes,
    getQuoteById,
    updateQuote,
    deleteQuote,
    requestQuote
} from "../controllers/quote.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Secured routes
router.route("/").get(verifyJWT, getUserQuotes);
router.route("/create").post(verifyJWT, createQuote)
router.route("/:id").get(verifyJWT, getQuoteById)
router.route("/:id").put(verifyJWT, updateQuote)
router.route("/:id").delete(verifyJWT, deleteQuote);
router.route("/:id/request").post(verifyJWT, requestQuote);

export default router;
