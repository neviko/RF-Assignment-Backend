import express from "express";
import { addProduct, getProductByAsinLocale } from "./product.controller";
import {
  addProductValidator,
  getProductByAsinLocaleValidator,
} from "./product.validators";

const router = express.Router();

router.get("/", getProductByAsinLocaleValidator(), getProductByAsinLocale);
router.post("/", addProductValidator(), addProduct);

export { router as productsRouter }; // or ES6
