import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { add, getAllAvailableBySeller } from "./product.service";
import { IProduct } from "../../common/interfaces/IProduct";

export const getProducts = async (req: Request, res: Response) => {
  const products = await getAllAvailableBySeller(req.body.name);

  return res.status(StatusCodes.OK).send(products);
};

export const addProduct = async (req: Request, res: Response) => {
  const product: IProduct = req.body;
  try {
    await add(product);
    res.status(StatusCodes.CREATED).send(product);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST);
  }
};
