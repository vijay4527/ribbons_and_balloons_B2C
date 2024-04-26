"use client";
import React from "react";
import styles from "@/app/[city]/l/[category]/page.module.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { axiosPost } from "@/api";
import { useRouter } from "next/navigation";
import useSharedStore from "@/components/calculatedPrice";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "react-bootstrap/Toast";
import Head from "next/head";
import Cookies from 'js-cookie';

import { useState } from "react";
export default function AddToFavoritesButton({ productData, city }) {
  const { Variable, Variety, Unit, Value, Message } = useSharedStore();
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
      };
      const favouriteData = await axiosPost("/CartMaster/SaveCartDetails", obj);
      if (favouriteData.resp == true) {
        if (!cartId) {
          Cookies.set('cartId', response.respObj.cart_id);
          sessionStorage.setItem("cartId", favouriteData.respObj.cart_id);
        }
        window
          .Toastify({
            text: "Your Product added to Favourite!",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#47cf73",
            stopOnFocus: true,
            progressBar: true, // Enable progress bar
            onClick: function () {},
          })
          .showToast();
      }
    } catch (error) {
      console.log("error while adding product to favourites", error);
    }
  };
  return (
    <>
    <Head>
    <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/js/bootstrap.bundle.min.js"></script>
    </Head>
      <div className={styles.addToFavButton} onClick={addToFavourite}>
      
        <i className={`${styles.HeartIcon} fa-solid fa-heart favBtn-heart`}></i>
      </div>
      </>
  );
}
