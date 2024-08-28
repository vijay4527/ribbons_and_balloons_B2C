"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/[city]/cart/page.module.css";

export default function OrderSummary({
  data,
  finalAmount,
  discountAmount,
  totalAmount,
}) {
  const totalPrice =
    finalAmount !== 0
      ? finalAmount
      : data.reduce((acc, item) => acc + item.cost, 0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data);
  }, [data])

  return (
    <>
      <ul className={styles.cartPriceAmt}>
        {products &&
          products.length > 0 &&
          products.map((item, index) => (
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
      
      {discountAmount !== 0 && discountAmount !== undefined && (
        <div className="d-flex justify-content-sm-between">
          <h4>Discount Amount</h4>
          <h5>₹ {discountAmount}</h5>
        </div>
      )}

      <div className={styles.cartPriceTotalAmt}>
        <h4>Final Amount</h4>
        <h5>₹ {totalPrice}</h5>
      </div>
    </>
  )
}
