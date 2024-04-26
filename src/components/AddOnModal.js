import React, { useState, useEffect } from "react";
import { axiosPost } from "@/api";
import Modal from "react-bootstrap/Modal";
import Link from "next/link";
import AppConfig from "@/AppConfig";
import homeStyles from "@/app/home.module.css";

const AddOnModal = ({ isOpen, onRequestClose, closeModal, city }) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);
  const [addOns, setAddOns] = useState([]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [quantities, setQuantities] = useState([]);

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
      setQuantities(new Array(data.length).fill(1));
    }
  };

  const toggleSelection = (index) => {
    const updatedIndexes = [...selectedIndexes];
    if (updatedIndexes.includes(index)) {
      updatedIndexes.splice(updatedIndexes.indexOf(index), 1);
    } else {
      updatedIndexes.push(index);
    }
    setSelectedIndexes(updatedIndexes);

    if (quantities[index] < 1) {
      setQuantities((prevQuantities) => {
        const newQuantities = [...prevQuantities];
        newQuantities[index] = 1;
        return newQuantities;
      });
    }
  };


  const decrementQuantity = (index) => {
    if (quantities[index] > 0) {
      const newQuantities = [...quantities];
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
      if (newQuantities[index] < 1) {
        const updatedIndexes = [...selectedIndexes];
        updatedIndexes.splice(updatedIndexes.indexOf(index), 1);
        setSelectedIndexes(updatedIndexes);
      }
    }
  };


  const incrementQuantity = (index) => {
    if (quantities[index] < 10) {
      const newQuantities = [...quantities];
      newQuantities[index] += 1;
      setQuantities(newQuantities);
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
      <div className="container addon-container">
        <div class="celebration">Add More Fun To Celebration.....</div>
        <div class="addon-details">
          <div class="addon-description">
            {addOns && addOns.length > 0
              ? addOns.map((item, index) => (
                <div class="addon-card" key={index}>
                  <div class="addon-image">
                    <img
                      src={AppConfig.cdn + "products/" + item.addon_image}
                      alt="Magic Candles Set"
                      class="img-fluid v-align-bottom ls-is-cached lazyloaded"
                      title="Magic Candles Set"
                    />
                  </div>
                  <div className="addon-overlap">
                    <span class="addon-title" title={item.addon_name}>
                      {item.addon_name}
                    </span>
                    <div class="title-price-icon mt-2">
                      <div class="title-price">
                        <span class="addon-price">
                          <img
                            src="https://media.bakingo.com/bakingo-ssr/static/media/rupees.ac282a46.svg"
                            width="0"
                            height="0"
                          />{" "}
                          ₹{item.cost}{" "}
                        </span>
                      </div>
                      {!selectedIndexes.includes(index) && (
                        <div class="add_icon_image">
                          <img
                            src="https://media.bakingo.com/bakingo-ssr/static/media/add_icon.1b323ad6.svg"
                            alt="add"
                            onClick={() => toggleSelection(index)}
                          />
                        </div>
                      )}
                      {selectedIndexes.includes(index) && (
                        <div class="addon-quantity-show">
                          <span
                            class="addon-sub"
                            onClick={() => decrementQuantity(index)}
                          >
                            -{" "}
                          </span>
                          <span class="addon-add-sub">{quantities[index]}</span>
                          <span
                            class="addon-add"
                            onClick={() => incrementQuantity(index)}
                          >
                            +{" "}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
              : ""}
          </div>
        </div>
      </div>
      <div class="text-center addon-bottom-btn-div">
        <Link href={`/${city}/cart`}>
          <div class="btn btn-secondary mb-4 addon-bottom-btn">Skip</div>
        </Link>{" "}
        <div class="btn btn-primary mb-4 continue-btn addon-bottom-btn">Continue</div>
      </div>
    </Modal>
  );
};

export default AddOnModal;
