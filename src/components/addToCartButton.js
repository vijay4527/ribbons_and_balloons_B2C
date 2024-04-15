"use client"
import React from "react";
import styles from "@/app/[city]/p/[productbyname]/page.module.css";
import { useState} from "react";
import useSharedStore from "@/components/calculatedPrice";
import { useRouter } from "next/navigation";
import {  axiosPost } from "@/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const addToCartButton = ({ data,city }) => {
  const { Variable, Variety, Unit, Value, Message } = useSharedStore();
 
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);
  const cartId =
    typeof window !== "undefined" ? sessionStorage.getItem("cartId") : "";
  const userObject =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("userData"))
      : "";
  const handleAddToCart = async () => {
    if (!isLoading) {
      setLoading(true);
      setTimeout(() => setLoading(false), 3700);
    }
    try {
      const cartItem = {
        user_id: userObject ? userObject.user_id : "",
        cart_id: cartId ? cartId : "",
        product_id: data.product_id,
        variety_id: Variety,
        city: city,
        unit: Unit,
        value: Value.toString(),
        msg_cake: Message,
        type: "AC",
      };
      const response = await axiosPost(`/CartMaster/SaveCartDetails`, cartItem);
      if (response.resp == true) {
        if (!cartId) {
          sessionStorage.setItem("cartId", response.respObj.cart_id);
        }
        setTimeout(() => {
          router.push(`/${city}/cart`);
        }, 3000);
      }
    } catch (error) {
     
      console.error("Error storing cartId in session storage:", error);
    }
  };
  return (
    <div className={styles.pdp_ProductContentButton}>
      <h4 className={styles.pdp_ProductContentPrice}>₹ {Variable}</h4>
      <div>
        <button
          className={
            isLoading
              ? `${styles.button} ${styles.loading}`
              : `${styles.button}`
          }
          onClick={handleAddToCart}
        >
          <span>Add to cart</span>
          <div className={styles.cart}>
            <svg viewBox="0 0 36 26">
              <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"></polyline>
              <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
            </svg>
          </div>
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default addToCartButton;
