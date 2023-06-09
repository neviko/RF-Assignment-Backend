import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  add,
  update,
  getAllAvailableBySeller,
  getByAsinLocale,
  deleteBatch,
  getBySeller,
} from "./product.service";
import { IProduct } from "../../common/interfaces/IProduct";

export const getProducts = async (req: Request, res: Response) => {
  const products = await getAllAvailableBySeller(req.body.name);

  return res.status(StatusCodes.OK).send(products);
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const product: IProduct = req.body;
    const createdProduct = await add(product);
    res.status(StatusCodes.CREATED).send(createdProduct[0]);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST);
  }
};

export const getProductByAsinLocale = async (req: Request, res: Response) => {
  const { asin, locale } = req.query;
  try {
    const product = await getByAsinLocale(asin as string, locale as string);
    res.status(StatusCodes.OK).send(product);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST);
  }
};

export const getProductBySeller = async (req: Request, res: Response) => {
  const { seller } = req.params;
  try {
    const products = (await getBySeller(seller as string)) as IProduct[];
    return res.status(StatusCodes.OK).send(products);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

/**
 *
 * @param we are assuming that we receive the whole product object
 */
export const updateProduct = async (req: Request, res: Response) => {
  const product: IProduct = req.body;
  try {
    await update(product);
    res.status(StatusCodes.CREATED).send(product);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST);
  }
};

export const deleteBatchProducts = async (req: Request, res: Response) => {
  const products = req.body as IProduct[];
  try {
    await deleteBatch(products);
    res.status(StatusCodes.CREATED).send({});
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST);
  }
};
