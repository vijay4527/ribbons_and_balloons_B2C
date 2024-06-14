import React, { useState, useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Link from "next/link";
import AppConfig from "@/AppConfig";
import homeStyles from "@/app/home.module.css";
import { AuthOtpContext } from "@/components/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const AddOnModal = ({ isOpen, onRequestClose, closeModal, city, data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);
  const [addOns, setAddOns] = useState([]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const { isLogged } = useContext(AuthOtpContext);
  const [user, setUser] = useState(null);
  const [showCartButton, setShowCartbutton] = useState(false);
  const router = useRouter();
  const apiUrl = process.env.API_URL;

  const cartId =
    typeof window !== "undefined" ? sessionStorage.getItem("cartId") : "";
  useEffect(() => {
    const userObject =
      typeof window !== "undefined"
        ? JSON.parse(sessionStorage.getItem("userData"))
        : "";
    setUser(userObject);
  }, [isLogged]);
  useEffect(() => {
    setModalIsOpen(true);
    getAddOns();
  }, [isOpen]);

  const getAddOns = async () => {
    var obj = {
      city_name: city,
    };
    const respData = await fetch(apiUrl + "AddonMaster/GetAddonByCityName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const data = await respData.json();
    if (data) {
      setAddOns(data);
      setQuantities(new Array(data.length).fill(1));
    }
  };

  const toggleSelection = (index) => {
    setShowCartbutton(true);
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
      3;
      newQuantities[index] += 1;
      setQuantities(newQuantities);
    }
  };

  const CreateAddOns = async (item, index) => {
    const obj = {
      user_id: user ? user?.user_id : "",
      cart_id: cartId ? cartId : "",
      product_id: item.addon_id,
      variety_id: "",
      city: city,
      unit: "PCS",
      value: quantities[index].toString(),
      msg_cake: "",
      type: "AC",
      product_type: "A",
    };
    const responseData = await fetch(apiUrl + `CartMaster/SaveCartDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const response = await responseData.json();
    if (response.resp == true) {
      toast("Your product added to the cart", {
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  const handleProductModal = () => {
    setQuantities([]);
    setModalIsOpen(false);
    router.push(`/${city}/cart`);
  };
  return (
    <>
      <Modal
        id="login-modal-dialog"
        show={modalIsOpen}
        onHide={closeModal}
        className={homeStyles["loginModal"]}
        size="lg"
        centered
      >
        <div className="container addon-container">
          <div className="celebration">Add More Fun To Celebration.....</div>
          <div className="addon-details">
            <div className="addon-description">
              {addOns && addOns.length > 0
                ? addOns.map((item, index) => (
                    <div className="addon-card" key={index}>
                      <div className="addon-image">
                        {selectedIndexes.includes(index) && (
                          <span
                            className="SvgIcons addOnCartIcon"
                            onClick={() => CreateAddOns(item, index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-cart"
                              viewBox="0 0 16 16"
                            >
                              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                          </span>
                        )}

                        <img
                          src={AppConfig.cdn + "products/" + item.addon_image}
                          alt="Magic Candles Set"
                          className="img-fluid v-align-bottom ls-is-cached lazyloaded addOnCardImage"
                          title="Magic Candles Set"
                        />
                      </div>
                      <div className="addon-overlap">
                        <span className="addon-title" title={item.addon_name}>
                          {item.addon_name}
                        </span>
                        <div className="title-price-icon mt-2">
                          <div className="title-price">
                            <span className="addon-price">
                              <img
                                src="https://media.bakingo.com/bakingo-ssr/static/media/rupees.ac282a46.svg"
                                width="0"
                                height="0"
                              />{" "}
                              ₹{item.cost}{" "}
                            </span>
                          </div>
                          {!selectedIndexes.includes(index) && (
                            <div className="add_icon_image">
                              <img
                                src="https://media.bakingo.com/bakingo-ssr/static/media/add_icon.1b323ad6.svg"
                                alt="add"
                                onClick={() => toggleSelection(index)}
                              />
                            </div>
                          )}
                          {selectedIndexes.includes(index) && (
                            <div className="addon-quantity-show">
                              <span
                                className="addon-sub"
                                onClick={() => decrementQuantity(index)}
                              >
                                -{" "}
                              </span>
                              <span className="addon-add-sub">
                                {quantities[index]}
                              </span>
                              <span
                                className="addon-add"
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
        <div className="text-center addon-bottom-btn-div">
          <Link href={`/${city}/cart`}>
            <div className="btn btn-secondary mb-4 addon-bottom-btn">Skip</div>
          </Link>{" "}
          <div
            className="btn btn-primary mb-4 continue-btn addon-bottom-btn"
            onClick={handleProductModal}
          >
            Continue
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default AddOnModal;
