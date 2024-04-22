"use client";
import React from "react";
import { axiosPost } from "@/api";
import homeStyles from "@/app/home.module.css";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import styles from "@/app/[city]/l/[category]/page.module.css";
import Link from "next/link";
import AppConfig from "@/AppConfig";
const productFilterModal = ({ isOpen, onRequestClose, closeModal,city,searchTerm, data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setModalIsOpen(true);
    }
  }, [isOpen]);
  return (
    <Modal
      show={modalIsOpen}
      onHide={closeModal}
      className={homeStyles["loginModal"]}
      centered
    >
      <div className={styles.plpTiles}>
        {data && data.length > 0 ? (
          data.map((item) => {
            const productName = item.product_name.split(" ").join("-");
            var image = item.product_image.split(",");
            return (
              <div className={styles.item} key={item.product_id}>
                <div className={styles.itemInfo}>
                  <Link
                    key={item.product_id}
                    href={`/${city}/p/${productName}`}
                    className={styles.itemCard}
                    prefetch={true}
                  >
                    <div className={`${styles.imgHvr}`}>
                      <img
                        className={styles.plpProdctImg}
                        src={`${AppConfig.cdn}products/${image[0]}`}
                        alt="No image found"
                      />
                    </div>
                  </Link>

                  <div className={`${styles["itemDesc"]}`}>
                    <h1>{item.product_name}</h1>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <div className="display-flex-center">
              <span className="text-center">No Products Found for {searchTerm}</span>
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/006/549/647/small/404-landing-page-free-vector.jpg"
                alt="No image found"
              />
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default productFilterModal;
