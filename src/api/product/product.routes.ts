import express from "express";
import { addProduct } from "./product.controller";
import { addProductValidator } from "./product.validators";

const router = express.Router();

router.get("/");
router.post("/", addProductValidator(), addProduct);

export { router as productsRouter }; // or ES6
