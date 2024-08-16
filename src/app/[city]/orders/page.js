"use client";
import React from "react";
import Head from "next/head";
import styles from "@/app/[city]/orders/page.module.css";
import homeStyles from "@/app/home.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
const page = ({ params }) => {
  const city = params.city;
  const [orders, setOrders] = useState([]);
  const apiUrl = process.env.API_URL;

  var userInfo =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userData"))
      : "";
  useEffect(() => {
    if (userInfo) {
      getAllOrders();
    }
  }, [userInfo?.user_id]);

  const getAllOrders = async () => {
    try {
      const data = await fetch(
        apiUrl + `Order/GetOrderByUserId/${userInfo.user_id}`,
        { next: { revalidate: 180 } }
      );
      const Orders = await data.json();
      if (Orders) {
        const sortedOrders = Orders.sort((a, b) => {
          return new Date(b.created_on) - new Date(a.created_on);
        });
        setOrders(sortedOrders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBpti7QuC_QXwWE90MT0RkfMPlET1KbhS4&libraries=places`}
        ></script>
      </Head>
      <section className={styles.CheckOutQct}>
        <div className={homeStyles["container"]}>
          <div className={styles.checkOutQctWrap}>
            <div className={styles.checkoutQctTitle}>Order History</div>
            <div className={styles.orderHistoryWrap}>
              <div className={styles.orderHistoryFilter}>
                <div className={styles.orderHistoryTitle}>Filters</div>
                <div className={styles.orderHistoryTitle}>Type of order</div>
              </div>
              <div className={styles.orderHistoryBody}>
                <div className={styles.orderHistoryTitle}>All Orders</div>
                {orders && orders.length > 0
                  ? orders
                      .filter((orderDetail) => orderDetail.total_price > 0)
                      .map((orderDetail) => (
                        <div
                          className={styles.orderHistoryItems}
                          key={orderDetail.order_id}
                        >
                          <div className={styles.orderHistoryItem}>
                            <div className={styles.orderHistoryNo}>
                              <h4>Order ID</h4>
                              <h5>{orderDetail.order_id}</h5>
                            </div>
                            <Link
                              href={`/${city}/orders/${orderDetail.order_id}`}
                              className="orderDetails"
                            >
                              <div className={styles.orderHistoryCard}>
                                {orderDetail?.orderProducts?.[0]
                                  ?.product_image &&
                                  (orderDetail?.orderProducts?.[0]?.product_image.split(
                                    ","
                                  ).length > 0 ? (
                                    <img
                                      src={`https://fama.b-cdn.net/RnB/Dev/products/${
                                        orderDetail.orderProducts[0].product_image.split(
                                          ","
                                        )[0]
                                      }`}
                                      alt={`Product Image`}
                                    />
                                  ) : (
                                    <img
                                      src={`https://fama.b-cdn.net/RnB/Dev/products/${orderDetail.orderProducts[0].product_image}`}
                                      alt={`Product Image`}
                                    />
                                  ))}
                                <div className={styles.orderHistoryCardInfo}>
                                  <h5>
                                    Total Price : ₹ {orderDetail.total_price}
                                  </h5>
                                  <h4>
                                    <span className={styles.cartBoxMsg}>
                                      Order Type :
                                    </span>{" "}
                                    {orderDetail.order_type}
                                  </h4>
                                  <div className={styles.orderStatus}>
                                    {orderDetail.order_status === "Initiated" ||
                                    "Success" ? (
                                      <>
                                        <span className={styles.cartBoxMsg}>
                                          Order Status :
                                        </span>
                                        <span>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="#46b275"
                                            className="bi bi-check-circle-fill"
                                            viewBox="0 0 16 16"
                                          >
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                          </svg>
                                        </span>
                                        <span>{orderDetail.order_status}</span>
                                      </>
                                    ) : orderDetail.order_status ===
                                      "Failed" ? (
                                      <>
                                        <span>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="#ff4d4f"
                                            className="bi bi-x-circle-fill"
                                            viewBox="0 0 16 16"
                                          >
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.646-2.646a.5.5 0 0 0-.708 0L8 8.293 5.354 5.646a.5.5 0 1 0-.708.708L7.293 9l-2.647 2.646a.5.5 0 0 0 .708.708L8 9.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 9l2.647-2.646a.5.5 0 0 0 0-.708z" />
                                          </svg>
                                        </span>
                                        <span>{orderDetail.order_status}</span>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <h5>
                                    Order Date :{" "}
                                    {orderDetail.created_on.split("T")[0]}
                                  </h5>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      ))
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
