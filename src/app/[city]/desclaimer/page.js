import React from "react";
import styles from "@/app/[city]/terms-and-condition/page.module.css";
const page = () => {
  return (
    <div>
      <div className="container">
        <div className={styles.quote}>Disclaimer</div>
        <p>
          Beware of the fraud images posted on the internet with numbers
          displayed in the image for ordering.
        </p>
        <p>
          Do not share your payment information with anyone via call. Our
          official representatives do not ask for that information, you can make
          payment only on website or if you are in contact with our personnel we
          will guide you to our payment gateway without the need of sharing your
          payment details with us. Currently you can only buy our products Via
          our website or by going in a Ribbons and Balloons shop near you.
        </p>
       
      </div>
    </div>
  );
};

export default page;
