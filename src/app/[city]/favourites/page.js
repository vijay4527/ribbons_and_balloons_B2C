"use client";
import React from "react";
import { useEffect, useState } from "react";
import styles from "@/app/[city]/cart/page.module.css";
import homeStyles from "@/app/home.module.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { axiosGet, axiosPost } from "@/api";
import AppConfig from "@/AppConfig";
import Head from "next/head";
import ServingInfo from "@/components/ServingInfo";
import OrderSummary from "@/components/OrderSummary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const page = ({ params }) => {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState([]);
  const router = useRouter();
  const city = params.city;
  const [grandTotal, setGrandTotal] = useState(0);
  const [isUserLoggedIn,setIsUserLoggedIn] =useState(null)

  var userInfo =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("userData"))
      : "";
  useEffect(() => {
    if (userInfo) {
      setIsUserLoggedIn(true);
    }
  }, [userInfo]);
  let cartId =
    typeof window !== "undefined" ? sessionStorage.getItem("cartId") : "";
  const userObject =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("userData"))
      : "";

  useEffect(() => {
    GetAllCart();
  }, [city, cartId, userObject?.user_id]);

  const GetAllCart = async () => {
    try {
      if (city) {
        var obj = {
          cart_id: cartId ? cartId : "",
          user_id: userObject ? userObject.user_id : "",
          city_name: city ? city : "",
          type: "WL",
          coupon_id:""
        };

        const response = await axiosPost("/CartMaster/GetCartDetails", obj);
        if (response) {
          setCart(response.result);
          setGrandTotal(response.final_amount)
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (item) => {
    try {
      const cartItem = {
        user_id: userObject ? userObject.user_id : "",
        cart_id: cartId ? cartId : "",
        product_id: item.product_id,
        variety_id: item.variety_id,
        city: city,
        unit: item.unit,
        value: item.value.toString(),
        msg_cake: item.msg_cake,
        type: "AC",
        product_type:"P"
      };
      const response = await axiosPost(`/CartMaster/SaveCartDetails`, cartItem);
      if (response.resp == true) {
        if (!cartId) {
          sessionStorage.setItem("cartId", response.respObj.cart_id);
        }
        toast("Product added to favourites", {
          autoClose: 3000,
          closeButton: true,
          onClose: () => {
            router.push(`/${city}/cart`);
          },
        });
      }
    } catch (error) {
      console.error("Error storing cartId in session storage:", error);
    }
  };

  const removeFromCart = async (cpId, itemCost) => {
    const response = await axiosGet(`/CartMaster/RemoveCart/${cpId}`);
    if (response.resp == true) {
      var newPrice = grandTotal - itemCost;
      setGrandTotal(newPrice);
      if (cart.length == 1) {
        try {
          sessionStorage.removeItem("cartId");
          cartId = "";
        } catch (error) {
          console.error("Error removing cartId from session storage:", error);
        }
      }
      GetAllCart();
    }
  };
  return (
    <div className={styles.cartMainWrap} id={styles.title}>
      <div className={homeStyles["container_fluid"]}>
        <div>
          <div className={styles.cartHeading}>Your Favourites</div>
          <hr className={styles.cartHrDivider}></hr>
          <div className={styles.cartTotalCount}>
            {cart.length} Products in Your Favourites List
          </div>
          <div className={styles.cartMainBody}>
            <div>
              <div className={styles.cartBoxItems}>
                {cart.length > 0 ? (
                  <>
                    {cart.map((item) => (
                      <div className={styles.cartBoxItem} key={item.cp_id}>
                        <div className={styles.cartBoxContent}>
                          <div className={styles.cartBoxImg}>
                            <img
                              src={
                                AppConfig.cdn +
                                "products/" +
                                item.image.split(",")[0]
                              }
                              alt={item.product_name}
                            />
                          </div>
                          <div className={styles.cartBoxInfo}>
                            <h4>{item.product_name}</h4>
                            <h4>Message on Cake : {item.msg_cake}</h4>
                            <h5>
                              <span className={styles.cartBoxPrice}>
                                ₹{item.cost}
                              </span>
                            </h5>
                            <h4>
                              {item.product_type == 3 ? (
                                <>{item.value}</>
                              ) : (
                                <>{item.value + " " + item.unit}</>
                              )}
                            </h4>
                          </div>
                        </div>
                        <div className={styles.cartBoxAction}>
                          <div
                            className={styles.cartBoxButtonAction}
                            onClick={() =>
                              removeFromCart(item.cp_id, item.cost)
                            }
                          >
                            Remove
                          </div>
                          <div
                            className={styles.cartBoxButtonAction}
                            onClick={() => addToCart(item)}
                          >
                            Add To Cart
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <h1>You have no Products in your Favourite</h1>
                )}
              </div>
            </div>
            <div>
              <div className={styles.cartPriceBox}>
                <div className={styles.cartOrderSummary}>
                  <h4>Order summary</h4>
                  <ServingInfo />
                </div>

                <OrderSummary data={cart} finalAmount={grandTotal}/>
                <button
                  className={`${homeStyles["btn"]} ${homeStyles["btn-primary"]}`}
                >
                  <span>Checkout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {!isUserLoggedIn && (
          <LoginModal
            isOpen={isCityModalOpen}
            onRequestClose={closeCityModal}
            closeLoginModal={closeCityModal}
          />
        )} */}
      <ToastContainer />
    </div>
  );
};

export default page;
