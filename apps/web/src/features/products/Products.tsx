import { Fragment, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addToBasket, basketSelector } from "../basket/slice";
import { fetchProducts, listProducts, statusProducts } from "./slice";
import {
  initialAsync as fetchStockLevels,
  stockLevelsSelector,
} from "../stock-levels/slice";
import { Button } from "ui";

import styles from "./styles.module.css";

export const Products = () => {
  const basket = useAppSelector(basketSelector);
  const products = useAppSelector(listProducts);
  const stockLevels = useAppSelector(stockLevelsSelector);
  const status = useAppSelector(statusProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchStockLevels());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (name: string) => () => {
    dispatch(addToBasket(name));
  };

  return (
    <div>
      {status === "loading" && <div>loading...</div>}
      {products.map(({ name, description, price, image }) => (
        <div className={styles.card} key={name}>
          <img
            src={image}
            className={styles.thumbnail}
            loading="lazy"
            alt={name}
          />
          <div>
            <dl>
              <dt>name:</dt>
              <dd>{name}</dd>
              <dt>description:</dt>
              <dd>{description}</dd>
              <dt>price:</dt>
              <dd>£{price}.00</dd>
            </dl>

            <Button onClick={handleClick(name)}>Add to basket</Button>

            {basket[name] === stockLevels[name] && (
              <div className="error-text">Error: Out of stock</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
