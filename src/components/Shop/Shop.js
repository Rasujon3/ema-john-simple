import React, { useState } from "react";
import fakeData from "../../fakeData";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products] = useState(first10);
  const [cart, setCart] = useState([]);

  const handleAddProduct = (product) => {
    console.log("Product added", product);
    const newCart = [...cart, product];
    setCart(newCart);
  };

  return (
    <div className="shpo-container">
      <div className="product-container">
        {products.map((pd) => (
          <Product handleAddProduct={handleAddProduct} product={pd}></Product>
        ))}
      </div>

      <div className="card-container">
        <h3>This is card</h3>
        <h5>Order Summary : {cart.length}</h5>
      </div>
    </div>
  );
};

export default Shop;
