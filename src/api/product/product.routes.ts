import express from "express";
import {
  addProduct,
  getProductByAsinLocale,
  getProductBySeller,
  updateProduct,
} from "./product.controller";
import {
  addProductValidator,
  deleteProductsValidator,
  getProductByAsinLocaleValidator,
  getProductBySellerValidator,
} from "./product.validators";

const router = express.Router();

router.get("/", getProductByAsinLocaleValidator(), getProductByAsinLocale);
router.get(
  "/seller/:seller",
  getProductBySellerValidator(),
  getProductBySeller
);
router.post("/", addProductValidator(), addProduct);
router.put("/", addProductValidator(), updateProduct);
// router.delete("/", deleteProductsValidator(), deleteProducts);

export { router as productsRouter }; // or ES6
