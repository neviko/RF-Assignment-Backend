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

describe("update product suite", () => {
  it("should update product", async () => {
    const product: IProduct = generateProduct();

    await request(app)
      .post("/api/products")
      .send(product)
      .expect(StatusCodes.CREATED);

    const updatedProduct = product;
    const newName = "Nevo";
    updatedProduct.name = newName;

    const res = await request(app)
      .put("/api/products")
      .send(updatedProduct)
      .expect(StatusCodes.CREATED);

    expect(res.body.name).toEqual(newName);
  });

  it("should be FAILED - update product", async () => {
    const product: IProduct = generateProduct();
    product.name = "";

    return request(app)
      .put("/api/products")
      .send(product)
      .expect(StatusCodes.BAD_REQUEST);
  });
});

describe("get seller product by seller_name - GET", () => {
  it("should return seller products by seller name", async () => {
    const newProduct = generateProduct();
    const { seller_name } = newProduct;

    const { body: product } = await request(app)
      .post("/api/products")
      .send(newProduct)
      .expect(StatusCodes.CREATED);

    const { body: fetchedProduct } = await request(app)
      .get(`/api/products/seller/${seller_name}`)
      .expect(StatusCodes.OK);

    expect(product.id).toEqual(fetchedProduct.id);
  });
});

// describe("delete product suite", () => {
//   it("should delete products", async () => {
//     const products: IProduct[] = [];
//     for (let i = 0; i < 20; i++) {
//       const product: IProduct = generateProduct();
//       products.push(product);
//     }

//     await request(app)
//       .delete("/api/products")
//       .send()
//       .expect(StatusCodes.CREATED);

//     const updatedProduct = product;
//     const newName = "Nevo";
//     updatedProduct.name = newName;

//     const res = await request(app)
//       .put("/api/products")
//       .send(updatedProduct)
//       .expect(StatusCodes.CREATED);

//     expect(res.body.name).toEqual(newName);
//   });

//   it("should be FAILED - update product", async () => {
//     const product: IProduct = generateProduct();
//     product.name = "";

//     return request(app)
//       .put("/api/products")
//       .send(product)
//       .expect(StatusCodes.BAD_REQUEST);
//   });
// });

// describe("delete product suite", () => {});
