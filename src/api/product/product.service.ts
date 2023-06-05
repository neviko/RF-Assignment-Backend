import { IProduct } from "../../common/interfaces/IProduct";
import knex from "../../db/db";

const tableName = "products";
export const getAllAvailableBySeller = async (
  sellerName: string
): Promise<IProduct[]> => {
  const products = (await knex(tableName)
    .select("*")
    .where({ seller_name: sellerName, available: true })) as IProduct[];

  return products;
};

export const add = async (product: IProduct) => {
  try {
    return knex(tableName).insert(product);
  } catch (e) {
    console.error(`something went wrong while inserting a product\n ${e}`);
  }
};

export const update = async (product: IProduct) => {
  try {
    return knex(tableName)
      .update(product)
      .where({ asin: product.asin, locale: product.locale });
  } catch (e) {
    console.error(`something went wrong while updating a product\n ${e}`);
  }
};

export const getByAsinLocale = async (
  asin: string,
  locale: string
): Promise<IProduct | undefined> => {
  try {
    const products = await knex(tableName)
      .select("*")
      .where({ asin, locale })
      .limit(1);
    console.log(products);
    return products[0];
  } catch (e) {
    console.error(`something went wrong while fetching a product\n ${e}`);
  }
};
