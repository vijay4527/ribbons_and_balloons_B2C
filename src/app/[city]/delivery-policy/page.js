import React from "react";
import styles from "@/app/[city]/terms-and-condition/page.module.css";
const page = () => {
  return (
    <div>
      <div className="container">
        <div className={styles.quote}>Delivery Policies</div>
        <p>
          We deliver all 365 days of the year (including Sundays and public
          holidays)
        </p>
        <p>
          We only deliver to customers located in Mumbai City to Virar, Thane,
          Navi Mumbai up to Panvel*, Pune
        </p>
        <p>
          Please use a regular street address with nearby land mark for faster
          delivery of cake.
        </p>
        <p>Extra shipping charges</p>
        <p>All deliveries will be executed between 12Noon to 6PM.</p>
      </div>
    </div>
  );
};

export default page;
