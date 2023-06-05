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

  describe("get seller product by <asin,locale> - GET", () => {
    it("should return seller product by <asin,locale>", async () => {
      const newProduct = generateProduct();
      const { asin, locale } = newProduct;

      await request(app)
        .post("/api/products")
        .send(newProduct)
        .expect(StatusCodes.CREATED);

      return request(app)
        .get("/api/products")
        .query({
          asin,
          locale,
        })
        .expect(StatusCodes.OK);
    });
  });

  it("should failed /GET - asin missing", async () => {
    const newProduct: IProduct = generateProduct();
    const { locale } = newProduct;

    await request(app)
      .post("/api/products")
      .send(newProduct)
      .expect(StatusCodes.CREATED);

    return request(app)
      .get("/api/products")
      .query({
        locale,
      })
      .expect(StatusCodes.BAD_REQUEST);
  });
});
