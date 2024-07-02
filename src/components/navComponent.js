"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthOtpContext } from "@/components/authContext";
import LoginModal from "@/components/loginModal";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import AppConfig from "@/AppConfig";
const navComponent = () => {
  const router = useRouter();
  const path = usePathname();
  const pathname = path;
  const pathSegments = pathname.split("/");
  const Cityname = pathSegments[1];
  const [isLoactionActive, setIsLoactionActive] = useState(false);
  const [isSearchActive, setSearchActive] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { data: session } = useSession();
  const [cities, setCities] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const { isLogged } = useContext(AuthOtpContext);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [isPopularSearchVisible, setIsPopularSearchVisible] = useState(true);
  const cookiecity = Cookies.get("city");
  const inputRef = useRef(null);
  const apiUrl = process.env.API_URL;
  const [hoveredCity, setHoveredCity] = useState(cookiecity);

  const isValidCity = (cityName) => {
    return cities.some(
      (city) => city.city_name.toLowerCase() === cityName.toLowerCase()
    );
  };

  const city = isValidCity(Cityname) ? Cityname : cookiecity;

  const loactionToggle = () => {
    if (!(pathname.includes("checkout") || pathname.includes("cart"))) {
      setIsLoactionActive(!isLoactionActive);
    }
  };
  const toggleSearchActive = () => {
    setSearchActive(!isSearchActive);
  };

  useEffect(() => {
    getCities();

    if (city) {
      setSelectedCity(city);
    }
  }, [city]);

  const userObject =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("userData"))
      : null;

  useEffect(() => {
    if (session?.userData?.isLogin === false) {
      setIsLoginModalOpen(true);
    } else if (
      typeof window !== "undefined" &&
      session?.userData?.isLogin == true
    ) {
      sessionStorage.setItem("userData", JSON.stringify(session.userData));
      if (
        !sessionStorage.getItem("cartId") &&
        session.userData.cart_id !== null
      ) {
        sessionStorage.setItem("cartId", session.userData.cart_id);
        Cookies.set("cartId", session.userData.cart_id);
      }

      sessionStorage.setItem("isLoggedIn", true);
    }
  }, [session, isLoggedIn]);

  const loggedIn =
    typeof window !== "undefined" ? sessionStorage.getItem("isLoggedIn") : "";

  useEffect(() => {
    if (loggedIn || session?.userData?.isLogin || isLogged) {
      setIsLoggedIn(true);
    }
  }, [session, userObject?.user_id, isLogged]);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUserObject = JSON.parse(sessionStorage.getItem("userData"));
      const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
      if (storedUserObject || storedIsLoggedIn == true) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const getCities = async () => {
    try {
      const data = await fetch(apiUrl + "RNBCity/GetAllRNBCity", {
        next: { revalidate: 180 },
      });
      const cityResponse = await data.json();
      if (cityResponse) {
        setCities(cityResponse);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (isSearchActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchActive]);

  const Logout = () => {
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("cartId");
    Cookies.remove("cartId");
    signOut();
    // router.push("/"+ city)
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      role="button"
      className="profileButton"
      aria-label="profilebutton"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <span className="SvgIcons">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
          />
        </svg>
      </span>
    </a>
  ));

  const handleKeyPress = async (event) => {
    setSearchValue(event);
    setIsPopularSearchVisible(false)
    try {
      if (event.length > 0) {
        var searchedTerm = event.split("/").join("");
        const respData = await fetch(
          apiUrl + `ProductMaster/GetAllProductByName/${searchedTerm}/${city}`
        );
        const data = await respData.json();
        if (data.length > 0) {
          setFilteredProduct(data);
        } else {
          setFilteredProduct([]);
        }
      } else {
        setIsPopularSearchVisible(true)
        setFilteredProduct([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCityChange = async (cityName) => {
    if (cityName) {
      setSelectedCity(cityName);
      const lowercaseCityName = cityName.toLowerCase();
      Cookies.remove("city");
      Cookies.set("city", lowercaseCityName);
      loactionToggle();
      router.push(`/${lowercaseCityName}`);
      router.refresh();
    }
  };

  const handleProductClick = (productName) => {
    setFilteredProduct([]);
    setSearchValue("");
  };

  const hoveredOnCity = (cityName) => {
    let newCity = cityName.toLowerCase();
    setHoveredCity(newCity);
  };

  return (
    <div className="navAction">
      <ul>
        <li>
          <div className="selectLocation" onClick={loactionToggle}>
            <h4>{selectedCity}</h4>
            <img
              src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_26,q_auto:eco,dpr_2,f_auto,fl_progressive/image/test/header/location.png"
              alt="No image found"
            />
          </div>
          <div
            className={`selectLocationWrap ${
              isLoactionActive ? "activeClass" : ""
            }`}
          >
            <div className="selectLocationBody">
              <div className="selectLocationImg">
                {hoveredCity == "pune" && (
                  <img
                    src="https://ribbonsandballoons.com/frontassets/images/pune1.png"
                    alt="No image found"
                  />
                )}
                {hoveredCity == "mumbai" && (
                  <img
                    src="https://cdn-images.cure.fit/www-curefit-com/image/upload/e_replace_color:black,o_60//image/cities/mumbai_selected.png"
                    alt="No image found"
                  />
                )}
                {hoveredCity == "mangaluru" && (
                  <img
                    src="https://ribbonsandballoons.com/frontassets/images/manglore1.png"
                    alt="No image found"
                  />
                )}
                {hoveredCity == "patna" && (
                  <img
                    src="	https://ribbonsandballoons.com/frontassets/images/Patna.png"
                    alt="No image found"
                  />
                )}
              </div>
              <h3>Select location preference</h3>
              <p>Membership prices vary across these areas</p>
              <ul className="selectLocationOption">
                {cities &&
                  cities.length > 0 &&
                  cities.map((e) => (
                    <li
                      key={e.rnb_city_id}
                      onClick={() => handleCityChange(e.city_name)}
                      onMouseEnter={() => hoveredOnCity(e.city_name)}
                    >
                      <h4 onClick={(e) => handleCityChange(e.city_name)}>
                        {e.city_name}
                      </h4>
                      <img
                        src="https://static.cure.fit/assets/images/back-arrow-white.svg"
                        alt="No image found"
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div
            className={`backdropLoaction ${
              isLoactionActive == true ? "activeClass" : ""
            }`}
            onClick={loactionToggle}
          ></div>
        </li>
        <li>
          <div className="selectSearchItem" onClick={toggleSearchActive}>
            <span className="SvgIcons">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </span>
          </div>
          <div
            className={`selectSearchItemWrap ${
              isSearchActive ? "activeClass" : ""
            }`}
          >
            <div className="selectSearchBody">
              <div
                className={`headerSearchIcon searchInput ${
                  isSearchActive ? "activeClass" : ""
                }`}
              ></div>
              <input
                ref={inputRef}
                type="search"
                id="inputSearch"
                placeholder="Search for cakes, occasion, flavor and more"
                value={searchValue}
                className="form-control"
                onChange={(e) => handleKeyPress(e.target.value)}
                // onKeyDown={handleKeyPress}
              />
            </div>
            <div className="selectSearchContent">
              <div className="selectSearchListPopular">
                <h3>Popular Searches</h3>
                {isPopularSearchVisible && (
                  <ul>
                    <li>
                      <a onClick={() => handleKeyPress("Cakes")}>
                        <span className="selectSearchListPopularIcon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="#888"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeOpacity=".7"
                              strokeWidth="1.2"
                              d="m15.75 5.25-6 6-3-3-4.5 4.5m13.5-7.5h-4.5m4.5 0v4.5"
                            />
                          </svg>
                        </span>
                        <span className="selectSearchListPopularText">
                          Cake
                        </span>
                      </a>
                    </li>
                    <li>
                      <a onClick={() => handleKeyPress("Savoury")}>
                        <span className="selectSearchListPopularIcon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="#888"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeOpacity=".7"
                              strokeWidth="1.2"
                              d="m15.75 5.25-6 6-3-3-4.5 4.5m13.5-7.5h-4.5m4.5 0v4.5"
                            />
                          </svg>
                        </span>
                        <span className="selectSearchListPopularText">
                          Savoury
                        </span>
                      </a>
                    </li>
                  </ul>
                )}
              </div>
              <div className="selectSearchList">
                {filteredProduct &&
                  filteredProduct.length > 0 &&
                  filteredProduct.map((item) => {
                    const productName = item.product_name.split(" ").join("-");
                    var image = item.product_image.split(",");
                    return (
                      <Link
                        className="searchResultContainer"
                        href={`/${city}/p/${productName}`}
                        passHref
                        key={item.id}
                        onClick={() => handleProductClick(productName)}
                      >
                        <img
                          src={`${AppConfig.cdn}products/${image[0]}`}
                          alt={productName}
                        />
                        <div className="searchItemInfo">
                          <h3>Sinful Collections</h3>
                          <h2>{item.product_name}</h2>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
          <div
            className={`backdropSearchItem ${
              isSearchActive ? "activeClass" : ""
            }`}
            onClick={toggleSearchActive}
          ></div>
        </li>
        <li className="myProfileItems">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              Dropdown Button
            </Dropdown.Toggle>
            <Dropdown.Menu align={{ lg: "end" }}>
              {isLoggedIn == true && (
                <>
                  <Dropdown.Item>
                    <Link
                      className="drpItemProfile"
                      href={`/${city}/profile`}
                      aria-label="my account"
                    >
                      My Account
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link
                      className="drpItemProfile"
                      href={`/${city}/address`}
                      aria-label="order history"
                    >
                      Your Address
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link
                      className="drpItemProfile"
                      href={`/${city}/orders`}
                      aria-label="order history"
                    >
                      Order History
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                </>
              )}
              {isLoggedIn == false ||
                (isLoggedIn == null && (
                  <Dropdown.Item onClick={() => setIsLoginModalOpen(true)}>
                    Sign In
                  </Dropdown.Item>
                ))}
              {isLoggedIn == true && (
                <Dropdown.Item onClick={Logout}>Sign Out</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </li>
        <li>
          <Link
            href={`/${city}/cart`}
            className="cartButton"
            prefetch={true}
            aria-label="cart"
          >
            <span className="SvgIcons">
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
          </Link>
        </li>
        <li>
          <Link
            href={`/${city}/favourites`}
            className="cartButton"
            prefetch={true}
            aria-label="Favourite"
          >
            <span className="SvgIcons">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-suit-heart"
                viewBox="0 0 16 16"
              >
                <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.6 7.6 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
              </svg>
            </span>
          </Link>
        </li>
      </ul>
      {!isLoggedIn && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onRequestClose={() => setIsLoginModalOpen(false)}
          closeLoginModal={() => setIsLoginModalOpen(false)}
        />
      )}
    </div>
  );
};

export default navComponent;
