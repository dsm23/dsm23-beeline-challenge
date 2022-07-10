import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { Product, StockLevel } from "types";

export const app = express();

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

app.use(express.json());
app.use(cors({ origin: true }));

const products: Product[] = [
  {
    name: "Beeline Moto",
    description:
      "The Beeline Moto navigation device solves the problem of finding your way on a motorcycle or scooter. The minimalist interface guides you intuitively with a single clear arrow to ensure you’re always on track.",
    price: 150,
    image:
      "https://cdn.shopify.com/s/files/1/1897/8919/products/Beeline-Moto-PR072019-19.jpg",
  },
  {
    name: "Beeline Moto Metal Edition Gunmetal Grey",
    description:
      "Beeline Moto Metal Edition is built from machined alloy, with a choice of classic silver or stealthy gunmetal grey finishes. For those who want the most rugged and tactile experience, the Metal Edition is the perfect companion for your pride and joy.",
    price: 200,
    image:
      "https://cdn.shopify.com/s/files/1/1897/8919/products/metal_gmg_front.jpg",
  },
  {
    name: "Beeline Moto Metal Edition Silver",
    description:
      "Fully IP67 waterproof and shockproof, with a sunlight readable display and 30 hour battery life, Beeline Moto is built for whatever you can throw at it.",
    price: 150,
    image:
      "https://cdn.shopify.com/s/files/1/1897/8919/products/metal_silver_front.jpg",
  },
];

const stockLevels: StockLevel = {
  "Beeline Moto": 42,
  "Beeline Moto Metal Edition Gunmetal Grey": 0,
  "Beeline Moto Metal Edition Silver": 2,
};

app.get("/products", async (_: Request, res: Response) => {
  await sleep(1000);

  res.send(products);
});

app.get("/stock-levels", async (_: Request, res: Response) => {
  await sleep(1000);

  res.send(stockLevels);
});
