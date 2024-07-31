"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/[city]/address/page.module.css";
import Link from "next/link";
const tab = ({ url, city }) => {
  const [activeTab, setActiveTab] = useState(url);

  return (
    <div className={styles.displaySection}>
      <Link href={`/${city}/orders`}>
        <div
          className={`${styles["shadow-md"]} ${
            activeTab == "orders" ? "activeTab" : ""
          }`}
          onClick={() => setActiveTab("orders")}
        >
          My Orders
        </div>
      </Link>
      <Link href={`/${city}/address`}>
        <div
          className={`${styles["shadow-md"]} ${
            activeTab === "address" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("address")}
        >
          Address Book
        </div>
      </Link>
      <Link href={`/${city}/profile`}>
        <div
          className={`${styles["shadow-md"]} ${
            activeTab === "profile" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("profile")}
        >
          My Profile
        </div>
      </Link>
    </div>
  );
};

export default tab;
