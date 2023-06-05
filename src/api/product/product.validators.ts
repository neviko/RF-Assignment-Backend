import { NextFunction, Request, Response } from "express";
import { body, validationResult, query } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const addProductValidator = () => {
  return [
    body("asin")
      .isString()
      .withMessage("name property have to be valid")
      .notEmpty(),

    body("locale")
      .isString()
      .withMessage("id property have to be valid")
      .notEmpty(),

    body("seller_name")
      .isString()
      .withMessage("author property have to be valid")
      .notEmpty(),

    body("availability")
      .isBoolean()
      .withMessage("availability property have to be valid")
      .notEmpty(),

    body("price")
      .isFloat({ min: 0, max: 9999999 })
      .withMessage("price property have to be valid")
      .notEmpty(),

    body("name")
      .isString()
      .withMessage("seller_name property have to be valid")
      .notEmpty(),

    body("link")
      .isString()
      .isURL()
      .withMessage("link property have to be valid")
      .notEmpty(),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(StatusCodes.BAD_REQUEST).send({
          StatusCode: StatusCodes.BAD_REQUEST,
          errors: errors.array(),
        });
      }
      next();
    },
  ];
};

export const getProductByAsinLocaleValidator = () => {
  return [
    query("asin").notEmpty().withMessage("asin param should be valid"),
    query("locale").notEmpty().withMessage("asin param should be valid"),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(StatusCodes.BAD_REQUEST).send({
          StatusCode: StatusCodes.BAD_REQUEST,
          errors: errors.array(),
        });
      }
      next();
    },
  ];
};

//TODO: insert validateErrors instead od reusable code
const validateErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).send({
      StatusCode: StatusCodes.BAD_REQUEST,
      errors: errors.array(),
    });
  }
  next();
};
