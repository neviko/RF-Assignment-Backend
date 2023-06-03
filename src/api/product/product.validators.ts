import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const addBookValidator = () => {
  return [
    body("name")
      .isString()
      .withMessage("name property have to be valid")
      .notEmpty(),

    body("id")
      .isString()
      .notEmpty()
      .withMessage("id property have to be valid"),
    body("author")
      .isString()
      .optional()
      .withMessage("author property have to be valid"),
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
