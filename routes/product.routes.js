import { Router } from "express";
import {
    createProduct,
    getAllProducts,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/all").get(getAllProducts);
router.route("/create").post(createProduct);

export default router;