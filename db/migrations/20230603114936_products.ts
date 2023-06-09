import { Knex } from "knex";

const tableName = "products";
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("id").primary();
    table.string("asin").notNullable();
    table.string("locale").notNullable();
    table.string("seller_name").notNullable();
    table.boolean("availability").defaultTo(true);
    table.float("price").notNullable();
    table.string("name").notNullable();
    table.string("link").notNullable();
    table.boolean("deleted").defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
