import { Basket } from "./features/basket/Basket";
import { Products } from "./features/products/Products";
import { Total } from "./features/total/Total";

import "./App.css";

const App = () => (
  <main>
    <h1>Beeline Challenge</h1>
    <div className="container">
      <div className="store-container">
        <Products />
      </div>
      <div className="vertical-container">
        <div className="basket-container">
          <Basket />
          <Total />
        </div>
      </div>
    </div>
  </main>
);

export default App;
