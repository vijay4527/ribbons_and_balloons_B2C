"use client";
import React from "react";
import styles from "@/app/[city]/l/[category]/page.module.css";
import useSharedStore from "@/components/calculatedPrice";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

export default function AddToFavoritesButton({ productData, city }) {
  const { Variable, Variety, Unit, Value, Message } = useSharedStore();

  const apiUrl = process.env.API_URL;
  const notify = () =>
    toast(
      (t) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>Product added to favourites.</span>
          <button
            onClick={() => {
              toast.dismiss(t.id);
            }}
            style={{
              marginLeft: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <i className="fa fa-x" />
          </button>
        </div>
      ),
      {
        duration: 3000,
        style: {
          marginRight: "20px",
        },
        icon: "✅",
        position: "top-right",
        progressBar: {
          style: {
            height: "4px",
            backgroundColor: "#4caf50",
          },
        },
      }
    );
  const addToFavourite = async (data) => {
    const cartId =
      typeof window !== "undefined" ? localStorage.getItem("cartId") : "";
    const userObject =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("userData"))
        : ""
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
          localStorage.setItem("cartId", favouriteData.respObj.cart_id);
        }
        notify();
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
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
