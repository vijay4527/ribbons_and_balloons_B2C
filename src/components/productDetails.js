"use client"
import React from "react";
import axios from "axios";
import AddToCart from "@/components/addToCartButton";
import { useState, useEffect } from "react";
import styles from "@/app/[city]/p/[productbyname]/page.module.css";
import https from "https";
import useSharedStore from "@/components/calculatedPrice";
import ServingInfo from "@/components/ServingInfo";
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
axios.defaults.httpsAgent = httpsAgent;
function getProductDetails({ data }) {
  const {
    Variable,
    Variety,
    Unit,
    Value,
    Message,
    updateVariable,
    updateVariety,
    updateUnit,
    updateValue,
    updateMessage,
  } = useSharedStore();
  const placeholder = "Enter message on cake";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [product, setProduct] = useState({});
  const [selectedProductType, setSelectedProductType] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [messageOnCake, setMessageOnCake] = useState("");
  const [unit, setUnit] = useState("");
  const [values, setValues] = useState("");
  const [variety, setVariety] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [activeFlavour, setActiveFlavour] = useState("");
  const [activeWeight, setActiveWeight] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < placeholder.length) {
        setText((prevText) => prevText + placeholder[index]);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setText("");
          setIndex(0);
        }, 1000);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [index]);

  useEffect(() => {
    if (data) {
      const productData = data;
      setProduct(productData);
      if (
        productData.productTypeData &&
        productData.productTypeData.length > 0
      ) {
        const initialProductType = productData.productTypeData[0];
        setSelectedProductType(initialProductType.variety_id);
        setProductPrice(initialProductType.cost);
        updateVariable(initialProductType.cost);
        setVariety(productData.productTypeData[0].variety_id);
        updateVariety(productData.productTypeData[0].variety_id);
        setQuantity(productData.min);

        switch (productData.type_id) {
          case 1:
            if (productData.type_id == 1) {
              setUnit("KG");
              updateUnit("KG");
              setValues("0.5");
              updateValue("0.5");
              setActiveWeight("0.5");
            }
            break;
          case 2:
            if (productData.type_id == 2) {
              updateUnit("KG");
              updateValue(productData.min);
              updateVariable(initialProductType.cost * 2 * productData.min);
              setActiveWeight(productData.min.toString());
            }
            break;
          case 3:
            if (productData.type_id == 3) {
              updateUnit(productData.productTypeData[0].variety_type);
              updateValue(productData.productTypeData[0].variety_name);
              setActiveWeight(productData.productTypeData[0].variety_name);
            }
            break;
          case 4:
            if (productData.type_id == 4) {
              updateUnit("KG");
              updateValue(productData.min);
              setSelectedProduct(productData.productTypeData[0]);
              updateVariable(initialProductType.cost * 2 * productData.min);
              setSelectedProduct(productData.productTypeData[0]);
              setActiveWeight(productData.min);
              setActiveFlavour(productData.productTypeData[0].variety_id);
            }
          case 5:
            if (productData.type_id == 5) {
              // setUnit("PCS");
              updateUnit("PCS");
              setValues("1");
              updateValue("1");
              setQuantity(1);
            }
          case 6:
            if (productData.type_id == 6) {
              // setUnit("PCS");
              updateUnit("PCS");
              setValues("1");
              updateValue("1");
              setQuantity("1");
              setSelectedProduct(productData.productTypeData[0]);
              setActiveFlavour(productData.productTypeData[0].variety_id);
            }
          default:
            break;
        }
      }
    }
  }, [data]);

  const [isLoading, setLoading] = useState(false);

  const handleClick = () => {
    if (!isLoading) {
      setLoading(true);
      setTimeout(() => setLoading(false), 3700);
    }
  };
  const handleProductTypeChange = (event) => {
    const selectedType = event;
    // setVariety(selectedType);
    updateVariety(selectedType);
    setSelectedProductType(selectedType);
    const selectProduct = product.productTypeData.find(
      (productType) => productType.variety_id === selectedType
    );
    setSelectedProduct(selectProduct);
    setActiveFlavour(event);

    if (selectProduct) {
      if (product.type_id == 3) {
        // setProductPrice(selectProduct.cost);
        updateVariable(selectProduct.cost);

        setActiveWeight(selectProduct.variety_name);
        if (selectProduct.variety_name == "Small") {
          // setUnit("S");
          updateUnit("S");
          // setValues(selectProduct.variety_name);
          updateValue(selectProduct.variety_name);
        } else {
          // setUnit("L");
          updateUnit("L");
          // setValues(selectProduct.variety_name);
          updateValue(selectProduct.variety_name);
        }
      } else if (product.type_id == 6) {
        // setProductPrice(selectProduct.cost * quantity);
        updateVariable(selectProduct.cost * quantity);
      } else {
        // setProductPrice(selectProduct.cost * 2 * quantity);
        updateVariable(selectProduct.cost * 2 * quantity);
      }
    }
  };
  const handleWeight = (weight, tab) => {
    setActiveWeight(weight);
    setQuantity(weight);
    if (product.type_id == 1) {
      if (weight == "0.5") {
        setValues("0.5");
        updateValue("0.5");
        setUnit("gram");
        updateUnit("gram");
        // setProductPrice(product.productTypeData[0].cost);
        updateVariable(product.productTypeData[0].cost);
      } else {
        setValues("1");
        updateValue("1");
        setUnit("KG");
        updateUnit("KG");
        setProductPrice(product.productTypeData[0].cost * 2 - 10);
        updateVariable(product.productTypeData[0].cost * 2 - 10);
      }
    }
    if (product.type_id == 2) {
      setValues(weight);
      updateValue(weight);
      setProductPrice(product.productTypeData[0].cost * 2 * weight);
      updateVariable(product.productTypeData[0].cost * 2 * weight);
    }
    if (product.type_id == 3) {
      setValues(weight);
      updateValue(weight);
      setProductPrice(product.productTypeData[0].cost * weight - 10);
      updateVariable(product.productTypeData[0].cost * 2 * weight - 10);
    }
    if (product.type_id == 4) {
      setValues(weight);
      updateValue(weight);
      updateVariable(selectedProduct.cost * 2 * weight);
    }
    if (product.type_id == 5) {
      setValues(weight);
      updateValue(weight);
      updateVariable(product.productTypeData[0].cost * weight);
    }
    if (product.type_id == 6) {
      setValues(weight);
      updateValue(weight);
      updateVariable(selectedProduct.cost * weight);
    }
  };
  const generateWeightOptions = (min, max, step = 0.5) => {
    const weightOptions = [];
    for (let weight = min; weight <= max; weight += step) {
      weightOptions.push(
        <li
          className={activeWeight == weight ? styles.active : ""}
          role="presentation"
          key={weight}
          onClick={() => handleWeight(weight)}
        >
          {`${weight} KG`}
        </li>
      );
    }

    return weightOptions;
  };
  const handleIncrementQuantity = () => {
    const newQuantity = parseInt(quantity) + 1;
    if (newQuantity <= 20) {
      setQuantity(newQuantity);
      handleWeight(newQuantity);
    }
  };

  const handleDecrementQuantity = () => {
    const newQuantity = parseInt(quantity) - 1;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      handleWeight(newQuantity);
    }
  };
  const userObject =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("userData"))
      : "";
  const cartId =
    typeof window !== "undefined" ? sessionStorage.getItem("cartId") : "";

  const handleAddToCartOrWishlist = () => {
    const cartItem = {
      user_id: userObject ? userObject?.user_id : "",
      cart_id: cartId ? cartId : "",
      product_id: product.product_id,
      variety_id: variety,
      city: city,
      unit: unit,
      value: values.toString(),
      msg_cake: messageOnCake,
    };

    axios
      .post(`${api_url}/CartMaster/SaveCartDetails`, cartItem)
      .then((response) => {
        if (response.data.resp === true) {
          try {
            if (!cartId) {
              sessionStorage.setItem("cartId", response.data.respObj.cart_id);
            }
            toastr.options = {
              positionClass: "toast-top-right",
              timeOut: 3000,
              closeButton: true,
            };
            toastr.success("Product added to cart successfully :");
          } catch (error) {
            console.error("Error storing cartId in session storage:", error);
          }
        }
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };
  const handleMessage = (e) => {
    updateMessage(e);
    setMessageOnCake(e);
  };
  if (product && Object.keys(product).length > 0) {
    return (
      <div className={styles.pdp_DetailAction}>
        {product.type_id == 1 && (
          <>
            <div className={styles.pdp_SelectInfo}>
              <div className={styles.pdp_shortInfo}>
                <h4 className={styles.pdp_DetailInfoTitle}>Select Weight</h4>
                <ServingInfo/>
              </div>
              <div className={styles.pdp_SelectFlavour}>
                <ul>
                  <li
                    className={activeWeight == "0.5" ? styles.active : ""}
                    onClick={() => handleWeight("0.5", "Half Kg")}
                  >
                    0.5 Kg
                  </li>
                  <li
                    className={activeWeight === "1" ? styles.active : ""}
                    onClick={() => handleWeight("1", "1 Kg")}
                  >
                    1 Kg
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.pdp_SelectInfo}>
              <div className={styles.pdp_shortInfo}>
                <h4 className={styles.pdp_DetailInfoTitle}>Select Flavour</h4>
              </div>
              <div className={styles.pdp_SelectFlavour}>
                <ul>
                  <li className={styles.active}>
                    {product.productTypeData[0].variety_name}
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
        {product.type_id == 2 && (
          <>
            <div className={styles.pdp_SelectInfo}>
            <div className={styles.pdp_shortInfo}>
                <h4 className={styles.pdp_DetailInfoTitle}>Select Weight</h4>
                <ServingInfo/>
              </div>
              <div className={styles.pdp_SelectFlavour}>
                <ul>
                  {generateWeightOptions(
                    parseFloat(product.min),
                    parseInt(product.max)
                  )}
                </ul>
              </div>
            </div>

            <div className={styles.pdp_SelectInfo}>
              <div className={styles.pdp_shortInfo}>
                <h4 className={styles.pdp_DetailInfoTitle}>Select Flavour</h4>
              </div>
              <div className={styles.pdp_SelectFlavour}>
                <ul>
                  <li className={styles.active}>
                    {product.productTypeData[0].variety_name}
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
        {product.type_id == 3 && (
          <>
            <div className={styles.pdp_SelectInfo}>
            <div className={styles.pdp_shortInfo}>
                <h4 className={styles.pdp_DetailInfoTitle}>Select Weight</h4>
                <ServingInfo/>
                {/* <div className={styles.pdp_shortInfo_Box}>
                  <h5 className={styles.pdp_shortInfo_Icon}>
                    Serving info
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><g stroke="#888" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" clipPath="url(#clip0_4555_10382)"><path d="M8 14.667A6.667 6.667 0 1 0 8 1.334a6.667 6.667 0 0 0 0 13.333ZM8 10.667V8M8 5.333h.006"/></g><defs><clipPath id="clip0_4555_10382"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
                    </span>
                  </h5>
              
                  <div className={styles.pdp_shortInfo_BoxItem}>
                    <h5>Serving Information</h5>
                    <ul>
                      <li><h4>0.5Kg</h4><p>4 - 6 Persons</p></li>
                      <li><h4>1Kg</h4><p>10 - 12 Persons</p></li>
                      <li><h4>1.5Kg</h4><p>14 - 16 Persons</p></li>
                      <li><h4>2Kg</h4><p>20 - 22 Persons</p></li>
                    </ul>
                  </div>
                </div> */}
              </div>
              <div className={styles.pdp_SelectFlavour}>
                <ul>
                  {product.productTypeData ? (
                    product.productTypeData.map((ele) => (
                      <li
                        className={
                          activeWeight == ele.variety_name ? styles.active : ""
                        }
                        key={ele.variety_id}
                        onClick={() => handleProductTypeChange(ele.variety_id)}
                      >
                        {`${ele.variety_name}`}
                      </li>
                    ))
                  ) : (
                    <li>No types available</li>
                  )}
                </ul>
              </div>
            </div>
          </>
        )}
        {product.type_id == 4 && (
          <>
            <div className={styles.pdp_SelectInfo}>
            <div className={styles.pdp_shortInfo}>
                <h4 className={styles.pdp_DetailInfoTitle}>Select Weight</h4>
                <div className={styles.pdp_shortInfo_Box}>
                  <h5 className={styles.pdp_shortInfo_Icon}>
                    Serving info
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><g stroke="#888" stroke-linecap="round" strokeLinejoin="round" strokeWidth="1.2" clipPath="url(#clip0_4555_10382)"><path d="M8 14.667A6.667 6.667 0 1 0 8 1.334a6.667 6.667 0 0 0 0 13.333ZM8 10.667V8M8 5.333h.006"/></g><defs><clipPath id="clip0_4555_10382"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
                    </span>
                  </h5>
                  {/* <div className={styles.pdp_shortInfo_BoxItem}>
                    <h5>Serving Information</h5>
                    <ul>
                      <li><h4>0.5Kg</h4><p>4 - 6 Persons</p></li>
                      <li><h4>1Kg</h4><p>10 - 12 Persons</p></li>
                      <li><h4>1.5Kg</h4><p>14 - 16 Persons</p></li>
                      <li><h4>2Kg</h4><p>20 - 22 Persons</p></li>
                    </ul>
                  </div> */}
                </div>
              </div>
              <div className={styles.pdp_SelectFlavour}>
                <ul>
                  {generateWeightOptions(
                    parseFloat(product.min),
                    parseInt(product.max)
                  )}
                </ul>
              </div>
            </div>

            <div className={styles.pdp_SelectInfo}>
              <div className={styles.pdp_shortInfo}>
                <h4 className={styles.pdp_DetailInfoTitle}>Select Flavour</h4>
              </div>
              <div className={styles.pdp_SelectFlavour}>
                <ul>
                  {product.productTypeData ? (
                    product.productTypeData.map((ele) => (
                      <li
                        className={
                          activeFlavour == ele.variety_id ? styles.active : ""
                        }
                        key={ele.variety_id}
                        value={ele.variety_id}
                        onClick={() => handleProductTypeChange(ele.variety_id)}
                      >
                        {ele.variety_name}
                      </li>
                    ))
                  ) : (
                    <li value="">No types available</li>
                  )}
                </ul>
              </div>
            </div>
          </>
        )}
        {product.type_id == 5 && (
          <>
            <div className={styles.pdp_SelectInfo}>
              <div className={styles.pdp_shortInfo}>
                <h4 className={styles.pdp_DetailInfoTitle}>Select Pieces</h4>
              </div>
              <div className={styles.pdp_SelectFlavour}>
                <div className="input-group">
                  <span
                    className="input-group-text"
                    style={{
                      padding: "4px 10px 4px 10px",
                      backgroundColor: "#51171d",
                      borderRadius: "4px 0px 0px 4px",
                      cursor: "pointer",
                      color: "white",
                    }}
                    onClick={handleIncrementQuantity}
                  >
                    +
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    max={20}
                    min={1}
                    value={values}
                  />{" "}
                  <span
                    className="input-group-text decrement"
                    style={{
                      padding: "4px 10px 4px 10px",
                      backgroundColor: "#51171d",
                      borderRadius: "0px 4px 4px 0px",
                      cursor: "pointer",
                      color: "white",
                    }}
                    onClick={handleDecrementQuantity}
                  >
                    -
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
        {product.type_id == 6 && (
          <>
            <div className={styles.pdp_SelectInfo}>
              <div className={styles.pdp_shortInfo}>
                <h4 className={styles.pdp_DetailInfoTitle}>Select Pieces</h4>
              </div>
              <div className={styles.pdp_SelectFlavour}>
                <div className="input-group">
                  <span
                    className="input-group-text"
                    style={{
                      padding: "4px 10px 4px 10px",
                      backgroundColor: "#51171d",
                      borderRadius: "4px 0px 0px 4px",
                      cursor: "pointer",
                      color: "white",
                    }}
                    onClick={handleIncrementQuantity}
                  >
                    +
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    max={20}
                    min={1}
                    value={values}
                  />{" "}
                  <span
                    className="input-group-text decrement"
                    style={{
                      padding: "4px 10px 4px 10px",
                      backgroundColor: "#51171d",
                      borderRadius: "0px 4px 4px 0px",
                      cursor: "pointer",
                      color: "white",
                    }}
                    onClick={handleDecrementQuantity}
                  >
                    -
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.pdp_SelectInfo}>
              <div className={styles.pdp_shortInfo}>
                <h4 className={styles.pdp_DetailInfoTitle}>Select Flavour</h4>
              </div>
              <div className={styles.pdp_SelectFlavour}>
                <ul>
                  {product.productTypeData ? (
                    product.productTypeData.map((ele) => (
                      <li
                        className={
                          activeFlavour == ele.variety_id ? styles.active : ""
                        }
                        key={ele.variety_id}
                        value={ele.variety_id}
                        onClick={() => handleProductTypeChange(ele.variety_id)}
                      >
                        {ele.variety_name}
                      </li>
                    ))
                  ) : (
                    <li value="">No types available</li>
                  )}
                </ul>
              </div>
            </div>
          </>
        )}

        <div className={styles.pdp_SelectInfo}>
          <div className={styles.pdp_shortInfo}>
                <h4 className={styles.pdp_DetailInfoTitle}>Upload Image*</h4>
          </div>
          <div className={styles.pdp_SelectUploadImage}>
            <label
              htmlFor="FileUpload"
              className={styles.pdp_SelectUploadLabel}
            >
              <input
                type="file"
                id="FileUpload"
                className={styles.pdp_SelectUploadInput}
              />
              <div className={styles.image_uploading_content}>
                <div className={styles.choose_file_circle}>
                  <span></span>
                  Choose file
                </div>
                <div className={styles.image_uploading_Icon}>
                  <img
                    src="https://bkmedia.bakingo.com/images/common/upload.svg"
                    alt="upload"
                  />
                </div>
              </div>
            </label>
            <div className={styles.photo_uploaded}>
              <div className={styles.Photo_UploadedImg}>
                <img src="https://media.bakingo.com/bk/photo-cake/1693661314.423.jpeg" 
                                alt="No image found"/>
              </div>
              <div className={styles.Photo_UploadedAction}>
                <div className={styles.Photo_UploadedText}>Photo Uploaded</div>
                <label htmlFor="FileUpload" className={styles.reUploadImg}>
                  Change Photo
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.pdp_SelectInfo}>
          <div className={styles.pdp_shortInfo}>
              <h4 className={styles.pdp_DetailInfoTitle} htmlFor="messageoncake">Message</h4>
              <p className={styles.pdp_msgCount}>0/25</p>
          </div>
          <div className={styles.pdp_SelectMessage}>
            <textarea
              type="text"
              placeholder={text}
              maxLength="25"
              value={messageOnCake}
              onChange={(e) => handleMessage(e.target.value)}
              id="messageoncake"
            ></textarea>
          </div>
        </div>

        <div className={styles.underLineSeperator}></div>
        
        <div className={styles.pdp_SelectInfo}>
          <div className={styles.pdp_shortInfo}>
              <h4 className={styles.pdp_DetailInfoTitle} >Product Description</h4>
          </div>
          <div className={styles.pdp_SelectMessage}>
            <ul className={styles.pdp_ProductDesc}>
              <li>
                <span>{product.description}</span>
              </li>
              {/* <li>
                <span>Filling: </span>Layered with white ganache,
                coconut crunchy & french vanilla custard.
              </li>
              <li>
                <span>Topping: </span>Coated with rich cream mixed with
                french vanilla custard & Garnished with french vanilla
                custard glaze and rich dark ganache.
              </li> */}
            </ul>
          </div>
        </div>
        
        <div className={styles.fassalDiv}>
          <img src="https://media.bakingo.com/bakingo-ssr/static/media/Info-1.aa9d95cd.png" alt="logo"></img>
        </div>
      </div>
    );
  }
}

export default getProductDetails;
