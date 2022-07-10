export type Product = {
  name: string;
  description: string;
  price: number;
  image: string;
};

export type StockLevel = Record<string, number>;
