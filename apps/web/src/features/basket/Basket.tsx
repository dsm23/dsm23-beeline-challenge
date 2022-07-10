import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { stockLevelsSelector } from "../stock-levels/slice";
import { addToBasket, basketSelector, removeFromBasket } from "./slice";

import styles from "./styles.module.css";

export const Basket = () => {
  const basket = useAppSelector(basketSelector);
  const stockLevels = useAppSelector(stockLevelsSelector);
  const dispatch = useAppDispatch();

  const handleAdd = (item: string) => () => dispatch(addToBasket(item));
  const handleRemove = (item: string) => () => dispatch(removeFromBasket(item));

  return (
    <div>
      {Object.entries(basket).map(([item, numInBasket]) => (
        <Fragment key={`${item}-basket`}>
          {numInBasket > 0 && (
            <>
              <div className={styles.mtop}>{item}</div>
              <div className={styles.buttonContainer}>
                <button onClick={handleRemove(item)}>-</button>
                <span>{numInBasket}</span>
                <button onClick={handleAdd(item)}>+</button>
              </div>
              {basket[item] === stockLevels[item] && (
                <div className="error-text">Error: Out of stock</div>
              )}
            </>
          )}
        </Fragment>
      ))}
    </div>
  );
};
