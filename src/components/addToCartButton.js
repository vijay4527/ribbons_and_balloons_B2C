"use client";
import React from "react";
import styles from "@/app/[city]/p/[productbyname]/page.module.css";
import { useState, useEffect, useContext } from "react";
import useSharedStore from "@/components/calculatedPrice";
import { AuthOtpContext } from "@/components/authContext";
import AddOnModal from "@/components/AddOnModal";
import Cookies from "js-cookie";


const addToCartButton = ({ data, city }) => {
  const { Variable, Variety, Unit, Value, Message } = useSharedStore();
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { isLogged } = useContext(AuthOtpContext);
  const apiUrl = process.env.API_URL;

  const cartId =
    typeof window !== "undefined" ? sessionStorage.getItem("cartId") : "";
  useEffect(() => {
    const userObject =
      typeof window !== "undefined"
        ? JSON.parse(sessionStorage.getItem("userData"))
        : "";
    setUser(userObject);
  }, [isLogged]);

  const handleAddToCart = async () => {
    if (!isLoading) {
      setLoading(true);
      setTimeout(() => setLoading(false), 3700);
    }
    try {
      const cartItem = {
        user_id: user ? user?.user_id : "",
        cart_id: cartId ? cartId : "",
        product_id: data.product_id,
        variety_id: Variety,
        city: city,
        unit: Unit,
        value: Value.toString(),
        msg_cake: Message,
        type: "AC",
        product_type: "P",
      };
      const responseData = await fetch(apiUrl + `CartMaster/SaveCartDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });
      const response = await responseData.json()
      if (response.resp == true) {
        if (!cartId) {
          Cookies.set("cartId", response.respObj.cart_id);
          sessionStorage.setItem("cartId", response.respObj.cart_id);
        }
        setTimeout(() => {
          setOpenModal(true);
        }, 3500);
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
              ? `${styles.button} ${styles.loading} ${styles.adToCartButton}`
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
      {openModal && (
        <AddOnModal
          isOpen={openModal}
          onRequestClose={() => setOpenModal(false)}
          closeModal={() => setOpenModal(false)}
          city={city}
          data={data}
        />
      )}

    </div>
  );
};

export default addToCartButton;
