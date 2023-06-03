import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getBooks = (req: Request, res: Response) => {
  console.log("nevo");

  return res.status(StatusCodes.OK).send("book inal abook");
};

export const addBook = (req: Request, res: Response) => {
  return 0;
};
