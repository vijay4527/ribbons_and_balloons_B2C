import React from "react";
import Head from "next/head";
import styles from "@/app/[city]/orders/[orderDetails]/page.module.css";
import homeStyles from "@/app/home.module.css";

async function fetchOrderDetails(orderId) {
  try {
    if (orderId) {
      const apiUrl = process.env.API_URL;
      const responseData = await fetch(
        apiUrl + "Order/GetOrderByOrderId/" + orderId
      );
      const response = await responseData.json();
      if (response) {
        return response;
      } else {
        return null;
      }
    }
  } catch (err) {
    console.error(err);
  }
}

const page = async ({ params }) => {
  const orderId = params.orderDetails;
  const orderInfo = await fetchOrderDetails(orderId);
  return (
    <>
      <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBpti7QuC_QXwWE90MT0RkfMPlET1KbhS4&libraries=places`}
        ></script>
      </Head>

      <section className={styles.CheckOutQct}>
        <div className="container">
          <div className={styles.checkoutQctTitle}>
          Order Details
          </div>
        </div>
        <div
          className={`${homeStyles["container"]} ${styles["home-container"]}`}
        >
          {orderInfo && orderInfo?.orderProducts ? (
            <>
              <div className={styles.checkOutQctWrap}>
                {orderInfo?.orderProducts &&
                  orderInfo.orderProducts.map((product, index) => (
                    <div className={styles.checkoutQctBody} key={index}>
                      <div className={styles.checkoutQctShipping}>
                        <div className={styles.checkoutQctShippingMethod}>
                          <div className={styles.checkoutQctShippingHeader}>
                            <h4>Order ID</h4>
                            {orderInfo && <p>{orderInfo.order_id}</p>}
                          </div>
                          <div className={styles.orderHistoryWrap}>
                            <div className={styles.cartBoxItems}>
                              <div className={styles.cartBoxItem}>
                                <div className={styles.cartBoxContent}>
                                  <div className={styles.cartBoxImg}>
                                    <img
                                      src={
                                        product.product_image
                                          ? "https://fama.b-cdn.net/RnB/Dev/products/" +
                                            product.product_image.split(",")[0]
                                          : ""
                                      }
                                      alt={product.product_name}
                                    />
                                  </div>
                                  <div className={styles.cartBoxInfo}>
                                    <h4>
                                      {product.product_name
                                        ? product.product_name
                                        : ""}
                                    </h4>
                                    <h4>
                                      <span className={styles.cartBoxMsg}>
                                        {product.unit === "PCS" ? (
                                          <span>Piece : {product.value}</span>
                                        ) : (
                                          <span>
                                            Message on Cake : {product.msg_cake}
                                          </span>
                                        )}{" "}
                                      </span>
                                    </h4>
                                    <h5>
                                      <span className={styles.cartBoxPrice}>
                                        ₹ {product.price}
                                      </span>
                                    </h5>
                                    <h4>{product.size}</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.checkoutQctOrderSummary}></div>
                    </div>
                  ))}
              </div>
              <div className={styles.cartShippingWrap}>
                <div className={styles.cartShippingPriceDetail}>
                  <div className={styles.cartShippingTitleDetail}>
                    Price details of your order
                  </div>
                  <div className={styles.cartShippingPriceWrap}>
                    <ul>
                      <li>
                        <h4>Total MRP</h4>
                        <h5>₹{orderInfo.total_price}</h5>
                      </li>
                      {orderInfo.discount !==0  && (
                        <li>
                          <h4>Offer Discount</h4>
                          <h5 className={styles.discountAmt}>
                            ₹{orderInfo?.discount}
                          </h5>
                        </li>
                      )}
                    </ul>
                    <div className={styles.cartShippingPriceAmt}>
                      <h4>Total Amount</h4>
                      <h5>₹{orderInfo.total_price}</h5>
                    </div>
                  </div>
                </div>
                <div className={styles.cartShippingDetail}>
                  <div className={styles.cartShippingTitleDetail}>
                    {orderInfo.order_type == "delivery"
                      ? "Shipping details"
                      : "Pick Up Details"}
                  </div>
                  <div className={styles.cartShippingInfo}>
                    {orderInfo && (
                      <h4 className={styles.cartShippingTitleName}>
                        {orderInfo.full_name}
                      </h4>
                    )}
                    {orderInfo && (
                      <>
                        <p className={styles.cartShippingTitleAddress}>
                          {orderInfo.shipping_address}
                        </p>
                        {orderInfo.created_on &&
                          typeof orderInfo.created_on === "string" && (
                            <p className={styles.cartShippingTitleAddress}>
                              {orderInfo.created_on.split("T")[0]}
                            </p>
                          )}
                      </>
                    )}
                  </div>
                  <div className={styles.cartShippingNoDetail}>
                    <h4>Mobile Number</h4>
                    {orderInfo.mobile_number && (
                      <p>{orderInfo.mobile_number}</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>No Order found with {orderId}.</div>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
