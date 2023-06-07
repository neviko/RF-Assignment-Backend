export interface IProduct {
  id?: string;
  deleted?: boolean;
  asin: string;
  locale: string;
  seller_name: string;
  availability: boolean;
  price: number;
  name: string;
  link: string;
}
