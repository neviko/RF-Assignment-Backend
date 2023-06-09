import { NextFunction, Request, Response } from "express";
import { body, validationResult, query, param } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const addProductValidator = () => {
  return [
    body("asin")
      .isString()
      .withMessage("asin property have to be valid")
      .notEmpty()
      .withMessage("asin property is empty"),

    body("locale")
      .isString()
      .withMessage("locale property have to be valid")
      .notEmpty()
      .withMessage("locale property is empty"),

    body("seller_name")
      .isString()
      .withMessage("seller_name property have to be valid")
      .notEmpty()
      .withMessage("seller_name property is empty"),

    body("availability")
      .isBoolean()
      .withMessage("availability property have to be valid")
      .notEmpty()
      .withMessage("availability property is empty")
      .optional(),

    body("price")
      .isFloat({ min: 0, max: 9999999 })
      .withMessage("price property have to be valid")
      .notEmpty()
      .withMessage("price property is empty"),

    body("name")
      .isString()
      .withMessage("name property have to be valid")
      .notEmpty()
      .withMessage("name property is empty"),

    body("link")
      .isString()
      .isURL()
      .withMessage("link property have to be valid")
      .notEmpty()
      .withMessage("link property is empty"),

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

export const deleteProductsValidator = () => {
  return [
    body("products")
      .isArray({ min: 1 })
      .withMessage("products have to be valid array"),
    body("*.asin", "asin have to be valid"),
    body("*.locale", "locale have to be valid"),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          StatusCode: StatusCodes.BAD_REQUEST,
          errors: errors.array(),
        });
      }
      next();
    },
  ];
};

export const getProductBySellerValidator = () => {
  return [
    param("seller").notEmpty().withMessage("seller param should be valid"),
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

//TODO: insert validateErrors instead od duplicated code
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
