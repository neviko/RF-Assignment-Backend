import { faker } from "@faker-js/faker";
import { IProduct } from "../../common/interfaces/IProduct";

export const generateProduct = (): IProduct => {
  const product: IProduct = {
    asin: faker.string.uuid(),
    locale: faker.location.city(),
    seller_name: faker.person.firstName(),
    availability: faker.datatype.boolean(1),
    price: parseFloat(faker.finance.amount({ min: 5, max: 1000, dec: 2 })),
    name: faker.person.firstName(),
    link: faker.image.avatar(),
  };
  return product;
};
