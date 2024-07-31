"use client";
import React from "react";
import styles from "@/app/[city]/l/[category]/page.module.css";
import useSharedStore from "@/components/calculatedPrice";
// import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
// import Toastify from 'toastify-js';
// import 'toastify-js/src/toastify.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddToFavoritesButton({ productData, city }) {
  const { Variable, Variety, Unit, Value, Message } = useSharedStore();
  const apiUrl = process.env.API_URL;
  const addToFavourite = async (data) => {
    const cartId =
      typeof window !== "undefined" ? sessionStorage.getItem("cartId") : "";
    const userObject =
      typeof window !== "undefined"
        ? JSON.parse(sessionStorage.getItem("userData"))
        : "";
    try {
      var obj = {
        user_id: userObject ? userObject.user_id : "",
        cart_id: cartId ? cartId : "",
        product_id: productData.product_id,
        variety_id: Variety,
        city: city,
        unit: Unit,
        value: Value.toString(),
        msg_cake: Message,
        type: "WL",
        product_type: "P",
      };
      const responseData = await fetch(apiUrl + `CartMaster/SaveCartDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      const favouriteData = await responseData.json();
      if (favouriteData.resp == true) {
        if (!cartId) {
          Cookies.set("cartId", favouriteData.respObj.cart_id);
          sessionStorage.setItem("cartId", favouriteData.respObj.cart_id);
        }
        // Toastify({
        //   text: "✅ Your Product added to Favourite! 🎉",
        //   duration: 3000,
        //   newWindow: true,
        //   close: true,
        //   gravity: "top",
        //   position: "right",
        //   backgroundColor: "#47cf73",
        //   stopOnFocus: true,
        //   progressBar: true,
        // }).showToast();
        toast(" Your Product added to Favourite ! ", {
          autoClose: 3000,
          closeButton: true,
        });
      }
    } catch (error) {
      console.log("error while adding product to favourites", error);
    }
  };
  return (
    <>
      <div className={styles.addToFavButton} onClick={addToFavourite}>
        <i className={`${styles.HeartIcon} fa-solid fa-heart favBtn-heart`}></i>
      </div>
      <ToastContainer />
    </>
  );
}
