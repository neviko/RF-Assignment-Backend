import request from "supertest";
import { app } from "../../app";
import { IProduct } from "../../common/interfaces/IProduct";
import { StatusCodes } from "http-status-codes";
import { generateProduct } from "./product.helper";

describe("adding product suite", () => {
  it("should insert product into db", async () => {
    const product: IProduct = generateProduct();

    return request(app)
      .post("/api/products")
      .send(product)
      .expect(StatusCodes.CREATED);
  });

  it("should be FAILED - insert product into db", async () => {
    const product: IProduct = generateProduct();
    product.name = "";

    return request(app)
      .post("/api/products")
      .send(product)
      .expect(StatusCodes.BAD_REQUEST);
  });
});

describe("adding product suite", () => {
  it("should insert product into db", async () => {
    const product: IProduct = generateProduct();

    return request(app)
      .post("/api/products")
      .send(product)
      .expect(StatusCodes.CREATED);
  });

  it("should be FAILED - insert product into db", async () => {
    const product: IProduct = generateProduct();
    product.name = "";

    return request(app)
      .post("/api/products")
      .send(product)
      .expect(StatusCodes.BAD_REQUEST);
  });
});
