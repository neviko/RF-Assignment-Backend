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
