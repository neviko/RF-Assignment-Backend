import { Request, Response } from "express";
import { productsRouter } from "./api/product/product.routes";
import { app } from "./app";
import { StatusCodes } from "http-status-codes";

export const activateRoutes = () => {
  app.use("/api/products", productsRouter);
  app.all("*", async (req: Request, res: Response) => {
    res.status(StatusCodes.NOT_FOUND);
  });
};
