"use client";
import React from "react";
import { axiosPost, axiosGet } from "@/api";
import homeStyles from "@/app/home.module.css";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import styles from "@/app/[city]/l/[category]/search.module.css";
import Link from "next/link";
import AppConfig from "@/AppConfig";
const AddOnModal = ({ isOpen, onRequestClose, closeModal, city }) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);
  const [isSelected, setIsSelected] = useState(false);
  const [addOns, setAddOns] = useState([]);
  const [quantity,setQuantity] = useState(1)
  useEffect(() => {
    setModalIsOpen(true);
    getAddOns();
  }, [isOpen]);

  const getAddOns = async () => {
    var obj = {
      city_name: city,
    };
    const data = await axiosPost("AddonMaster/GetAddonByCityName", obj);
    if (data) {
      setAddOns(data);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    
    }
    if (quantity < 1) {
        setIsSelected(false);
      }
  };
  
  
  
  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };
  return (
    <Modal
      id="login-modal-dialog"
      show={modalIsOpen}
      onHide={closeModal}
      className={homeStyles["loginModal"]}
      size="lg"
      centered
    >
      <div className="container">
        <div class="celebration">Add More Fun To Celebration.....</div>
        <div class="addon-details">
          <div class="addon-description">
            {addOns && addOns.length > 0
              ? addOns.map((item) => (
                  <div class="addon-card">
                    <div class="addon-image">
                      <img
                        src={AppConfig.cdn + "products/" + item.addon_image}
                        alt="Magic Candles Set"
                        class="img-fluid v-align-bottom ls-is-cached lazyloaded"
                        title="Magic Candles Set"
                      />
                    </div>
                    <div class="title-price-icon mt-2">
                      <div class="title-price">
                        <span class="addon-title" title={item.addon_name}>{item.addon_name}</span>
                        <span class="addon-price">
                          <img
                            src="https://media.bakingo.com/bakingo-ssr/static/media/rupees.ac282a46.svg"
                            width="0"
                            height="0"
                          />
                          {" "}
                          {item.cost}
                          {" "}
                        </span>
                      </div>
                      {!isSelected && (
                        <div class="add_icon_image">
                          <img
                            src="https://media.bakingo.com/bakingo-ssr/static/media/add_icon.1b323ad6.svg"
                            alt="add"
                            onClick={()=>setIsSelected(true)}
                          />
                        </div>
                      )}
                      {isSelected && (
                        <div class="addon-quantity-show">
                          <span class="addon-sub" onClick={decrementQuantity}>- </span>
                          <span class="addon-add-sub">{quantity}</span>
                          <span class="addon-add" onClick={incrementQuantity}>+ </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>

      </div>
      <div class="text-center">
        <Link href={`/${city}/cart`}> <div class="btn btn-secondary mb-4">Skip</div></Link>
       
        {" "}{" "}<div class="btn btn-primary mb-4">Continue</div></div>

    </Modal>
  );
};

export default AddOnModal;
