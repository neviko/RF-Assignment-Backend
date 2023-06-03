import express from "express";
import { getBooks, addBook } from "./product.handler";
import { addBookValidator } from "./product.validators";

const router = express.Router();

router.get("/", getBooks);
router.post("/", addBookValidator(), addBook);

export { router as booksRouter }; // or ES6
