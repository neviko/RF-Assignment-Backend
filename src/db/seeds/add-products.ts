import { Knex } from "knex";
// import fs from "fs";
// import readline from "readline";
import { IProduct } from "../../common/interfaces/IProduct";
import { generateProduct } from "../../api/product/product.helper";

const tableName = "products";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del();

  const products: IProduct[] = [];
  for (let i = 0; i < 1000; i++) {
    const product: IProduct = generateProduct();
    products.push(product);
  }
  await knex(tableName).insert(products);

  //   const products: IProduct[] = [];
  //   // Inserts seed entries
  //   const input = fs.createReadStream(`seller_products_template.csv`);
  //   const rl = readline.createInterface({ input });

  //   rl.on("line", (row) => {
  //     const items = row.split(",");
  //     const product: IProduct = {
  //       asin: items[0],
  //       locale: items[1],
  //       seller_name: items[2],
  //       availability: !!items[3],
  //       price: parseFloat(items[4]),
  //       name: items[5],
  //       link: items[6],
  //     };
  //     products.push(product);
  //   });

  //   rl.on("close", async () => {
  //     await knex(tableName).insert(products);
  //   });
}
