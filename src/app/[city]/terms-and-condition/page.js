import React from "react";
import styles from "@/app/[city]/terms-and-condition/page.module.css";
const page = () => {
  return (
    <div>
      <div className="container">
        <div className={styles.quote}>Terms &amp; Conditions</div>
        <p>
          By using this site the user has unconditionally accepted the terms and
          conditions of use as given here under and/or elsewhere in the site.
        </p>
        <p>
          All prices listed are in Indian Rupees for delivery in Mumbai City to
          Virar, Thane, Navi Mumbai up to Panvel*, Pune.
        </p>
      </div>
      <div className="container">
        <div className={styles.quote}>Ordering Policy</div>
        <p>
          Please verify the time required for each product before ordering. If
          you have ordered without giving us a sufficient notice as per the
          indicated time in the product page, we would be unable to deliver the
          product. So please ensure that you read the terms and conditions
          against each product before ordering. We ensure that all the products
          published on this site are available for ordering, however in certain
          cases, if the ordered product is unavailable another product of equal
          value would be delivered. Also be aware that the weights indicated are
          approximate and might vary.
        </p>
      </div>
      <div className="container">
        <div className={styles.quote}>Refund Policy</div>
        <p>
          Since cakes are perishable goods and are made to order, we would not
          be able to provide any refunds. No refunds for wrong addresses,
          recipient unavailable and other causes beyond the control of us would
          not be entertained.
        </p>
      </div>
      <div className="container">
        <div className={styles.quote}>Shipping Policy</div>

        <p>
          While placing an order, please provide us with the following
          information for delivery at Hotel / Residence
        </p>

        <p>Hotel</p>

        <p>Full address of the hotel.</p>

        <p>Room No</p>

        <p>Telephone number of the hotel.</p>

        <p>Residence</p>

        <p>Home address with phone number.</p>

        <p>Proper landmark</p>
      </div>

      <div className="container">
        <div className={styles.quote}>Copyright and Trademark Policy</div>
        <p>
          All content on this website including the logo, graphics, text,
          design, is the property of Ribbons& Balloons.com and protected by
          copyright. No part of the content shall be copied, downloaded,
          uploaded, published and transmitted without prior, written permission
          from ribbons& balloons.com
        </p>
      </div>
      <div className="container">
        <div className={styles.quote}>
          Modification of Terms and conditions of Service:
        </div>
        <p>
          Ribbons& Balloons.com may at any time modify the terms and conditions
          ("Terms") of the Service without any prior notification to you and the
          revised version shall be available on the site. In the event of you
          not agreeing to the revised terms, then you should stop using the
          site. By continuous usage you are agreeing to the published Terms.
        </p>
      </div>
    </div>
  );
};

export default page;
