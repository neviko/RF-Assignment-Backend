import { Request, Response } from "express";
import { booksRouter } from "./api/product/product.routes";
import { app } from "./app";
import { StatusCodes } from "http-status-codes";

export const activateRoutes = () => {
  app.use("/api/books", booksRouter);
  app.all("*", async (req: Request, res: Response) => {
    res.status(StatusCodes.NOT_FOUND);
  });
};
