import { IProduct } from "../../common/interfaces/IProduct";
import knex from "../../../db/db";
import { IAsinLocale } from "../../common/interfaces/IAsinLocale";

const tableName = "products";

export const getAllAvailableBySeller = async (
  sellerName: string
): Promise<IProduct[]> => {
  const products = (await knex(tableName).select("*").where({
    seller_name: sellerName,
    available: true,
    deleted: false,
  })) as IProduct[];

  return products;
};

export const add = async (product: IProduct) => {
  try {
    return knex(tableName).insert(product).returning("*");
  } catch (e) {
    const text = `something went wrong while inserting a product\n ${e}`;
    console.error(text);
    throw new Error(text);
  }
};

export const update = async (product: IProduct) => {
  try {
    return knex(tableName)
      .update(product)
      .where({ asin: product.asin, locale: product.locale });
  } catch (e) {
    throw new Error(`something went wrong while updating a product\n ${e}`);
  }
};

export const deleteBatch = async (products: IAsinLocale[]) => {
  try {
    knex.transaction(async (trx) => {
      const queries: any = [];
      for (const product of products) {
        const query = await knex(tableName)
          .where({ asin: product.asin, locale: product.locale })
          .update({ deleted: true })
          .transacting(trx);
        queries.push(query);
      }

      try {
        await Promise.all(queries);
      } catch (e) {
        throw new Error("Error while deleting items");
      }
    });
  } catch (e) {
    throw new Error(`something went wrong while updating a product, ${e}`);
  }
};

export const getByAsinLocale = async (
  asin: string,
  locale: string
): Promise<IProduct | undefined> => {
  try {
    const product = await knex(tableName)
      .select(["id", "asin", "locale", "price", "product_name", "product_link"])
      .where({ asin, locale })
      .limit(1)
      .first();
    console.log(product);
    return product;
  } catch (e) {
    throw new Error(`something went wrong while fetching a product\n ${e}`);
  }
};

export const getBySeller = async (
  seller: string
): Promise<IProduct[] | undefined> => {
  try {
    const products = await knex(tableName)
      .select(["id", "asin", "locale", "price", "name", "link"])
      .where({ seller_name: seller, availability: true, deleted: false });
    return products;
  } catch (e) {
    throw new Error("something went wrong while fetching products by seller");
  }
};
