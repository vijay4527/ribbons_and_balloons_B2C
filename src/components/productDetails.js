"use client";
import React from "react";
import { useState, useEffect } from "react";
import styles from "@/app/[city]/p/[productbyname]/page.module.css";
import useSharedStore from "@/components/calculatedPrice";
import ServingInfo from "@/components/ServingInfo";

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
  const [varietyDescription, setvarietyDescription] = useState("");
  const [displayMore, setDisplayMore] = useState(false);
  const [messageOnCake, setMessageOnCake] = useState("");
  const [values, setValues] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [activeFlavour, setActiveFlavour] = useState("");
  const [activeWeight, setActiveWeight] = useState("");
  const [FlavourName, setFlavourName] = useState("");

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
        updateVariable(initialProductType.cost);
        updateVariety(productData.productTypeData[0].variety_id);
        setQuantity(productData.min);

        switch (productData.type_id) {
          case 1:
            if (productData.type_id == 1) {
              updateUnit("KG");
              setValues("0.5");
              updateValue("0.5");
              setActiveWeight("0.5");
              setvarietyDescription(productData.productTypeData[0].description);
              setFlavourName(productData.productTypeData[0].variety_name);
              setvarietyDescription(productData.productTypeData[0].description);
            }
            break;
          case 2:
            if (productData.type_id == 2) {
              updateUnit("KG");
              updateValue(productData.min);
              updateVariable(initialProductType.cost * 2 * productData.min);
              setActiveWeight(productData.min.toString());
              setFlavourName(productData.productTypeData[0].variety_name);
              setvarietyDescription(productData.productTypeData[0].description);
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
              setvarietyDescription(productData.productTypeData[0].description);
              setFlavourName(productData.productTypeData[0].variety_name);
            }
          case 5:
            if (productData.type_id == 5) {
              updateUnit("PCS");
              setValues("1");
              updateValue("1");
              setQuantity(1);
            }
          case 6:
            if (productData.type_id == 6) {
              updateUnit("PCS");
              setValues("1");
              updateValue("1");
              setQuantity("1");
              setSelectedProduct(productData.productTypeData[0]);
              setActiveFlavour(productData.productTypeData[0].variety_id);
              setvarietyDescription(productData.productTypeData[0].description);
              setFlavourName(productData.productTypeData[0].variety_name);
            }
          default:
            break;
        }
      }
    }
  }, [data]);

  const handleProductTypeChange = (event) => {
    const selectedType = event.variety_id;
    setFlavourName(event.variety_name);

    setvarietyDescription(event.description);
    updateVariety(selectedType);
    const selectProduct = product.productTypeData.find(
      (productType) => productType.variety_id === selectedType
    );
    setSelectedProduct(selectProduct);
    setActiveFlavour(event);
    if (selectProduct) {
      if (product.type_id == 3) {
        updateVariable(selectProduct.cost);
        setActiveWeight(selectProduct.variety_name);
        if (selectProduct.variety_name == "Small") {
          updateUnit("S");
          updateValue(selectProduct.variety_name);
        } else {
          updateUnit("L");
          updateValue(selectProduct.variety_name);
        }
      } else if (product.type_id == 6) {
        updateVariable(selectProduct.cost * quantity);
      } else {
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
        updateUnit("gram");
        updateVariable(product.productTypeData[0].cost);
      } else {
        setValues("1");
        updateValue("1");
        updateUnit("KG");
        updateVariable(product.productTypeData[0].cost * 2);
      }
    }
    if (product.type_id == 2) {
      setValues(weight);
      updateValue(weight);
      updateVariable(product.productTypeData[0].cost * 2 * weight);
    }
    if (product.type_id == 3) {
      setValues(weight);
      updateValue(weight);
      updateVariable(product.productTypeData[0].cost * 2 * weight);
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
          key={weight}
          className={`category-sub-title `}
          onClick={() => handleWeight(weight)}
        >
          {`${weight == "0.5" ? "Half" : weight} KG`}
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

  const handleMessage = (e) => {
    updateMessage(e);
    setMessageOnCake(e);
  };

  const toggleDisplayMore = () => {
    setDisplayMore((prev) => !prev);
  };

  const getTruncatedDescription = (description) => {
    if (description) {
      const maxLength = 150;
      if (description.length <= maxLength) return description;
      return description.slice(0, maxLength) + "...";
    }
  };

  if (product && Object.keys(product).length > 0) {
    return (
      <div className={styles.pdp_DetailAction}>
        <div className={styles.pdp_SelectInfo}>
          <div className={styles.pdp_shortInfo}>
            <h4 className={styles.pdp_DetailInfoTitle}>Product Description</h4>
          </div>
          <div className={styles.pdp_SelectMessage}>
            <ul className={styles.pdp_ProductDesc}>
              <li>
                <span>{product.description}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.pdp_SelectInfo}>
          <div className={styles.pdp_SelectMessage}>
            <ul className={styles.pdp_ProductDesc}>
              <li>
                <span
                  className={
                    displayMore
                      ? styles.varietyDescription
                      : styles.varietyDescriptionShort
                  }
                >
                  {displayMore
                    ? varietyDescription
                    : getTruncatedDescription(varietyDescription)}
                </span>{" "}
              </li>
            </ul>
            {varietyDescription && (
              <button
                className="btn btn-primary show-more-btn"
                onClick={toggleDisplayMore}
              >
                {displayMore ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        </div>
        {product.type_id == 1 && (
          <>
            <div className={styles.pdp_SelectInfo}>
              <div className={styles.pdp_shortInfo}>
                <div className={styles.WeightFlex}>
                  <h4 className={styles.pdp_DetailInfoTitle}>Weight :</h4>
                  <div className={styles["active-weight-show"]}>
                    <ul>
                      <li className={styles.showWeigthLi}>
                        {activeWeight == "0.5"
                          ? "half kg  "
                          : activeWeight + "" + "Kg"}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={styles.ChangeWeightHover}>
                  <div className={styles.ArrowTextWrap}>
                    <h4 className={styles.pdp_DetailInfoTitle}>
                      Change Weight
                    </h4>
                    <div className={styles.goldArrowWrap}>
                      <img src="/downGoldArrow.png"></img>
                    </div>
                  </div>
                  <div className={styles.flavourUlDivWrap}>
                    <ul className={styles.flavourUlDiv}>
                      <div className={styles.selectWeightBorder}>
                        <li
                          className={activeWeight == "0.5" ? styles.active : ""}
                          onClick={() => handleWeight("0.5", "Half Kg")}
                        >
                          half Kg
                        </li>
                        <li
                          className={activeWeight === "1" ? styles.active : ""}
                          onClick={() => handleWeight("1", "1 Kg")}
                        >
                          1 Kg
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
                <ServingInfo />
              </div>
              <div
                className={`${styles.pdp_shortInfo} ${styles.pdp_shortInfo2}`}
              >
                <div className={styles.WeightFlex}>
                  <h4 className={styles.pdp_DetailInfoTitle}>Flavour :</h4>
                  <div className={styles["active-weight-show"]}>
                    <ul>
                      <li className={styles.showWeigthLi}>{FlavourName}</li>
                    </ul>
                  </div>
                </div>
                {product.productTypeData.length > 1 && (
                  <div className={styles.ChangeWeightHover}>
                    <div className={styles.ArrowTextWrap}>
                      <h4 className={styles.pdp_DetailInfoTitle}>
                        Change Flavour
                      </h4>
                      <div className={styles.goldArrowWrap}>
                        <img src="/downGoldArrow.png"></img>
                      </div>
                    </div>
                    <div className={styles.flavourUlDivWrap}>
                      <ul className={styles.flavourUlDiv}>
                        <div className={styles.selectWeightBorder}>
                          {product.productTypeData ? (
                            product.productTypeData.map((ele) => (
                              <li
                                className={
                                  activeFlavour == ele.variety_id
                                    ? styles.active
                                    : ""
                                }
                                key={ele.variety_id}
                                value={ele.variety_id}
                                onClick={() => handleProductTypeChange(ele)}
                              >
                                {ele.variety_name}
                              </li>
                            ))
                          ) : (
                            <li value="">No types available</li>
                          )}
                        </div>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        {product.type_id == 2 && (
          <>
            <div className={styles.pdp_SelectInfo}>
              <div className={styles.pdp_shortInfo}>
                <div className={styles.WeightFlex}>
                  <h4 className={styles.pdp_DetailInfoTitle}>Weight :</h4>
                  <div className={styles["active-weight-show"]}>
                    <ul>
                      <li className={styles.showWeigthLi}>
                        {activeWeight == "0.5"
                          ? "half kg"
                          : activeWeight + "" + "Kg"}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={styles.ChangeWeightHover}>
                  <div className={styles.ArrowTextWrap}>
                    <h4 className={styles.pdp_DetailInfoTitle}>
                      Change Weight
                    </h4>
                    <div className={styles.goldArrowWrap}>
                      <img src="/downGoldArrow.png"></img>
                    </div>
                  </div>
                  <div className={styles.flavourUlDivWrap}>
                    <ul className={styles.flavourUlDiv}>
                      <div className={styles.selectWeightBorder}>
                        {generateWeightOptions(
                          parseFloat(product.min),
                          parseInt(product.max)
                        )}
                      </div>
                    </ul>
                  </div>
                </div>
                <div className={styles.pdp_shortInfo_Box}>
                  <ServingInfo />
                </div>
              </div>
            </div>
            <div className={`${styles.pdp_shortInfo} ${styles.pdp_shortInfo2}`}>
              <div className={styles.WeightFlex}>
                <h4 className={styles.pdp_DetailInfoTitle}>Flavour :</h4>
                <div className={styles["active-weight-show"]}>
                  <ul>
                    {" "}
                    <li className={styles.showWeigthLi}>{FlavourName}</li>
                  </ul>
                </div>
              </div>
              {product.productTypeData &&
                product.productTypeData.length > 1 && (
                  <div className={styles.ChangeWeightHover}>
                    <div className={styles.ArrowTextWrap}>
                      <h4 className={styles.pdp_DetailInfoTitle}>
                        Change Flavour
                      </h4>
                      <div className={styles.goldArrowWrap}>
                        <img src="/downGoldArrow.png"></img>
                      </div>
                    </div>
                    <div className={styles.flavourUlDivWrap}>
                      <ul className={styles.flavourUlDiv}>
                        <div className={styles.selectWeightBorder}>
                          {product.productTypeData ? (
                            product.productTypeData.map((ele) => (
                              <li
                                className={
                                  activeFlavour == ele.variety_id
                                    ? styles.active
                                    : ""
                                }
                                key={ele.variety_id}
                                value={ele.variety_id}
                                onClick={() => handleProductTypeChange(ele)}
                              >
                                {ele.variety_name}
                              </li>
                            ))
                          ) : (
                            <li value="">No types available</li>
                          )}
                        </div>
                      </ul>
                    </div>
                  </div>
                )}
            </div>
          </>
        )}
        {product.type_id == 3 && (
          <>
            <div className={styles.pdp_SelectInfo}>
              <div className={styles.pdp_shortInfo}>
                <div className={styles.ArrowTextWrap}>
                  <h4 className={styles.pdp_DetailInfoTitle}>Weight :</h4>
                  <div className={styles["active-weight-show"]}>
                    <ul>
                      <li className={styles.showWeigthLi}>{activeWeight}</li>
                    </ul>
                  </div>
                </div>
                <div className={styles.ChangeWeightHover}>
                  <div className={styles.ArrowTextWrap}>
                    <h4 className={styles.pdp_DetailInfoTitle}>
                      Change Weight
                    </h4>
                    <div className={styles.goldArrowWrap}>
                      <img src="/downGoldArrow.png"></img>
                    </div>
                  </div>
                  <div className={styles.flavourUlDivWrap}>
                    <ul className={styles.flavourUlDiv}>
                      <div className={styles.selectWeightBorder}>
                        {product.productTypeData ? (
                          product.productTypeData.map((ele) => (
                            <li
                              className={
                                activeWeight == ele.variety_name
                                  ? styles.active
                                  : ""
                              }
                              key={ele.variety_id}
                              onClick={() => handleProductTypeChange(ele)}
                            >
                              {`${ele.variety_name}`}
                            </li>
                          ))
                        ) : (
                          <li>No types available</li>
                        )}
                      </div>
                    </ul>
                  </div>
                </div>
                <ServingInfo />
              </div>
              <div className={styles.pdp_SelectFlavour}>
                <ul></ul>
              </div>
            </div>
          </>
        )}
        {product.type_id == 4 && (
          <>
            <div className={styles.pdp_SelectInfo}>
              <div className={styles.pdp_shortInfo}>
                <div className={styles.WeightFlex}>
                  <h4 className={styles.pdp_DetailInfoTitle}>Weight :</h4>
                  <div className={styles["active-weight-show"]}>
                    <ul>
                      <li className={styles.showWeigthLi}>
                        {activeWeight == "0.5"
                          ? "half kg"
                          : activeWeight + "" + "Kg"}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={styles.ChangeWeightHover}>
                  <div className={styles.ArrowTextWrap}>
                    <h4 className={styles.pdp_DetailInfoTitle}>
                      Change Weight
                    </h4>
                    <div className={styles.goldArrowWrap}>
                      <img src="/downGoldArrow.png"></img>
                    </div>
                  </div>
                  <div className={styles.flavourUlDivWrap}>
                    <ul className={styles.flavourUlDiv}>
                      <div className={styles.selectWeightBorder}>
                        {generateWeightOptions(
                          parseFloat(product.min),
                          parseInt(product.max)
                        )}{" "}
                      </div>
                    </ul>
                  </div>
                </div>
                <div className={styles.pdp_shortInfo_Box}>
                  <ServingInfo />
                </div>
              </div>
              <div
                className={`${styles.pdp_shortInfo} ${styles.pdp_shortInfo2}`}
              >
                <div className={styles.WeightFlex}>
                  <h4 className={styles.pdp_DetailInfoTitle}>Flavour :</h4>
                  <div className={styles["active-weight-show"]}>
                    <ul>
                      <li className={styles.showWeigthLi}>{FlavourName}</li>
                    </ul>
                  </div>
                </div>
                {product.productTypeData &&
                  product.productTypeData.length > 1 && (
                    <div className={styles.ChangeWeightHover}>
                      <div className={styles.ArrowTextWrap}>
                        <h4 className={styles.pdp_DetailInfoTitle}>
                          {" "}
                          Change Flavour{" "}
                        </h4>
                        <div className={styles.goldArrowWrap}>
                          <img src="/downGoldArrow.png"></img>
                        </div>
                      </div>
                      <div className={styles.flavourUlDivWrap}>
                        <ul className={styles.flavourUlDiv}>
                          <div className={styles.selectWeightBorder}>
                            {product.productTypeData ? (
                              product.productTypeData.map((ele) => (
                                <li
                                  className={
                                    activeFlavour == ele.variety_id
                                      ? styles.active
                                      : ""
                                  }
                                  key={ele.variety_id}
                                  value={ele.variety_id}
                                  onClick={() => handleProductTypeChange(ele)}
                                >
                                  {ele.variety_name}
                                </li>
                              ))
                            ) : (
                              <li value="">No types available</li>
                            )}
                          </div>
                        </ul>
                      </div>
                    </div>
                  )}
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
                  <input
                    type="text"
                    className="form-control"
                    max={20}
                    min={1}
                    value={values}
                  />{" "}
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
                </div>
              </div>
            </div>
          </>
        )}
        {product.type_id == 6 && (
          <>
            <div className={styles.pdp_SelectInfo}>
              <div
                className={`${styles.pdp_shortInfo} ${styles.pdp_shortInfo3}`}
              >
                <div>
                  <div className={styles.pdp_shortInfo}>
                    <h4 className={styles.pdp_DetailInfoTitle}>
                      Select Pieces
                    </h4>
                  </div>
                  <div className={styles.pdp_SelectFlavour}>
                    <div className="input-group">
                      <span
                        className="input-group-text decrement"
                        style={{
                          padding: "4px 10px 4px 10px",
                          backgroundColor: "#51171d",
                          borderRadius: "4px 0px 0px 4px",
                          cursor: "pointer",
                          color: "white",
                        }}
                        onClick={handleDecrementQuantity}
                      >
                        -
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        max={20}
                        min={1}
                        style={{
                          Width: "100px !important",
                          textAlign: "center",
                        }}
                        value={values}
                      />{" "}
                      <span
                        className="input-group-text"
                        style={{
                          padding: "4px 10px 4px 10px",
                          backgroundColor: "#51171d",
                          borderRadius: "0px 4px 4px 0px",
                          cursor: "pointer",
                          color: "white",
                        }}
                        onClick={handleIncrementQuantity}
                      >
                        +
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.pdp_shortInfo} ${styles.pdp_shortInfo2}`}
                >
                  <div className={styles.WeightFlex}>
                    <h4 className={styles.pdp_DetailInfoTitle}>
                      {product.productTypeData[0].variety_type == "Weight"
                        ? "Weight"
                        : "Flavour"}{" "}
                    </h4>
                    <div className={styles["active-weight-show"]}>
                      <ul>
                        <li className={styles.showWeigthLi}>{FlavourName}</li>
                      </ul>
                    </div>
                  </div>
                  {product.productTypeData &&
                    product.productTypeData.length > 1 && (
                      <div className={styles.ChangeWeightHover}>
                        <div className={styles.ArrowTextWrap}>
                          <h4 className={styles.pdp_DetailInfoTitle}>
                            {product.productTypeData[0].variety_type == "Weight"
                              ? "Change Weight"
                              : "Change Flavour"}
                          </h4>
                          <div className={styles.goldArrowWrap}>
                            <img src="/downGoldArrow.png"></img>
                          </div>
                        </div>
                        <div className={styles.flavourUlDivWrap}>
                          <ul className={styles.flavourUlDiv}>
                            <div className={styles.selectWeightBorder}>
                              {product.productTypeData ? (
                                product.productTypeData.map((ele) => (
                                  <li
                                    className={
                                      activeFlavour == ele.variety_id
                                        ? styles.active
                                        : ""
                                    }
                                    key={ele.variety_id}
                                    value={ele.variety_id}
                                    onClick={() => handleProductTypeChange(ele)}
                                  >
                                    {ele.variety_name}
                                  </li>
                                ))
                              ) : (
                                <li value="">No types available</li>
                              )}
                            </div>
                          </ul>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </>
        )}

        {product.type_id !== 5 && product.type_id !== 6 && (
          <>
            {product?.isUploadImage && (
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
                      <img
                        src="https://media.bakingo.com/bk/photo-cake/1693661314.423.jpeg"
                        alt="No image found"
                      />
                    </div>
                    <div className={styles.Photo_UploadedAction}>
                      <div className={styles.Photo_UploadedText}>
                        Photo Uploaded
                      </div>
                      <label
                        htmlFor="FileUpload"
                        className={styles.reUploadImg}
                      >
                        Change Photo
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className={styles.pdp_SelectInfo}>
              <div className={styles.pdp_shortInfo}>
                <h4
                  className={styles.pdp_DetailInfoTitle}
                  htmlFor="messageoncake"
                >
                  Message
                </h4>
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
          </>
        )}
        <div className={styles.underLineSeperator}></div>
        <div className={styles.fassalDiv}>
          <img
            src="https://media.bakingo.com/bakingo-ssr/static/media/Info-1.aa9d95cd.png"
            alt="logo"
          ></img>
        </div>
      </div>
    );
  } else {
    <div className="display-flex-center">
      <span className="text-center">No Products Found</span>
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/006/549/647/small/404-landing-page-free-vector.jpg"
        alt="No image found"
      />
    </div>;
  }
}

export default getProductDetails;
