import React, { useState, useEffect } from "react";
import styles from "@/app/[city]/cart/page.module.css";
import { useEffect,useState } from "react";
export default function OrderSummary({ data }) {
  const totalPrice = data.reduce((acc, item) => acc + item.cost, 0);
  const [products,setProducts] = useState([])

  useEffect(()=>{
     setProducts(data)
  },[data])
  return (
    <>
      <ul className={styles.cartPriceAmt}>
        {products && products.length > 0 && products.map((item, index) => (
          <li key={index}>
            <h4>
              {item.product_name}
              <span>
                (
                {item.product_type == 3 ? (
                  <>{item.value}</>
                ) : (
                  <>{item.value + " " + item.unit}</>
                )}
                )
              </span>
            </h4>
            <h5>₹{item.cost}</h5>
          </li>
        ))}
      </ul>
      <div className={styles.cartPriceTotalAmt}>
        <h4>Total</h4>
        <h5>₹{totalPrice}</h5>
      </div>
    </>
  );
}
