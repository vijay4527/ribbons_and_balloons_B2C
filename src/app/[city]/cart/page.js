"use client";
import React from "react";
import { useEffect, useState, useContext } from "react";
import styles from "@/app/[city]/cart/page.module.css";
import homeStyles from "@/app/home.module.css";
import { useRouter } from "next/navigation";
import LoginModal from "@/components/loginModal";
import { useSession} from "next-auth/react";
import { axiosGet, axiosPost} from "@/api";
import AppConfig from "@/AppConfig";
import Head from "next/head";
import ServingInfo from "@/components/ServingInfo";
import OrderSummary from "@/components/OrderSummary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthOtpContext } from "@/components/authContext";
import Cookies from "js-cookie";

const page = ({ params }) => {
  const { data: session } = useSession();
  const [cart, setCart] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isCityModalOpen, setCityModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { isLogged } = useContext(AuthOtpContext);
  const city =  Cookies.get("city");
  var userInfo =
  typeof window !== "undefined"
    ? JSON.parse(sessionStorage.getItem("userData"))
    : "";
  useEffect(() => {
    if (userInfo) {
      setIsUserLoggedIn(true);
      setUser(userInfo);
    }
  }, [session,isLogged,userInfo?.user_id]);
  let cartId = "";
  if (typeof window !== "undefined") {
    cartId = sessionStorage.getItem("cartId") || Cookies.get("cartId") || "";
  }
  useEffect(() => {
    GetAllCart();
  }, [city, cartId, user?.user_id]);

  const GetAllCart = async () => {
    try {
      if (city && cartId) {
        var obj = {
          cart_id: cartId ? cartId : "",
          user_id: user ? user.user_id : "",
          city_name: city ? city : "",
          type: "AC",
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

  const removeFromCart = async (cpId, itemCost) => {
    const response = await axiosGet(`/CartMaster/RemoveCart/${cpId}`);
    if (response?.resp == true) {
      var newPrice = grandTotal - itemCost;
      setGrandTotal(newPrice);
      if (cart.length == 1) {
        try {
          Cookies.remove("cartId")
          sessionStorage.removeItem("cartId");
          cartId = "";
        } catch (error) {
          console.error("Error removing cartId from session storage:", error);
        }
      }
      GetAllCart();
    }
  };

  // useEffect(() => {
  //   if (cart.length > 0) {
  //     const total = cart.reduce((accumulator, item) => {
  //       return accumulator + item.cost;
  //     }, 0);
  //     setGrandTotal(total);
  //   }
  // }, [cart]);

  const handleProducts = () => {
    if (!isUserLoggedIn || !user) {
      setCityModalOpen(true);
    } else if (user && cart.length > 0) {
      router.push(`/${city}/checkout`);
    } else if (cart.length === 0) {
      toast(
        "You have no products in your cart! Please select products before checkout",
        { autoClose: 2000, closeButton: true }
      );
    }
  };

  const closeCityModal = () => {
    console.log("Closing modal");
    setCityModalOpen(false);
  };


  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        ></meta>
        <link
          rel="icon"
          href="https://ribbonsandballoons.com/frontassets/images/fav.png"
          type="image/x-icon"
        />
      </Head>
      <div className={styles.cartMainWrap} id={styles.title}>
        <div className={homeStyles["container_fluid"]}>
          <div>
            <div className={styles.cartHeading}>Your Shopping Cart</div>
            <hr className={styles.cartHrDivider}></hr>
            <div className={styles.cartTotalCount}>{cart.length} Products</div>
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
                            <div className="card-div-flex">
                              <div className={styles.cartBoxInfo}>
                                <div className="cart-title">
                                  <h4 className="h4-title">
                                    {item.product_name}
                                  </h4>
                                  <div className="price-flex">
                                    <p>₹{item.cost}</p>
                                  </div>
                                </div>
                                <div className="cart-msg-info">
                                  <h4 className="msg-on-cake">
                                    Message on Cake : {item.msg_cake}
                                  </h4>
                                  <h5></h5>
                                  <div className="trash-flex">
                                    <h4>
                                      {item.product_type == 3 ? (
                                        <>{item.value}</>
                                      ) : (
                                        <>{item.value + " " + item.unit}</>
                                      )}
                                    </h4>
                                    <div className="trash-icon-div">
                                      <img className="" src="https://fama.b-cdn.net/RnB/gold-trash%20(2).png" onClick={()=>removeFromCart(item.cp_id, item.cost)} alt="icon"/>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <h1>Your Cart is Empty!</h1>
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
                    onClick={handleProducts}
                  >
                    <span className={styles.cartPriceBoxSpan}>Checkout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!isUserLoggedIn && (
          <LoginModal
            isOpen={isCityModalOpen}
            onRequestClose={closeCityModal}
            closeLoginModal={closeCityModal}
          />
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default page;
