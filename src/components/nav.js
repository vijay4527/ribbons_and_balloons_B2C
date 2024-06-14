import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
// import NavComponent from "./navComponent";
import dynamic from "next/dynamic";
const NavComponent = dynamic(() => import("@/components/navComponent"), {
  ssr: false,
  loading: () => <></>,
});
import { cookies } from "next/headers";
import { headers } from "next/headers";
import { getCities } from "@/utils/commoncity";
const getCategories = async (api, city) => {
  try {
    const categoryObj = { city_name: city };
    // const responseData = await fetch(
    //   api + "Category/GetAllCategories",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(categoryObj),
    //   },
    //   { cache: "force-cache", next: { revalidate: 180 } }
    // );
    const responseData = [
      {
        category_id: "2310201149089346187",
        category_name: "Puff",
        is_active: true,
        sub_category: "",
        json_sub_category: [
          {
            sub_category_id: "2310201226295767688",
            category_id: "2310201149089346187",
            sub_category_name: "Cream Puffs",
          },
          {
            sub_category_id: "2403190526461722394",
            category_id: "2310201149089346187",
            sub_category_name: "Paneer Puffs",
          },
        ],
      },
      {
        category_id: "2310201148507145625",
        category_name: "Cakes",
        is_active: true,
        sub_category: "",
        json_sub_category: [
          {
            sub_category_id: "2310201150278818607",
            category_id: "2310201148507145625",
            sub_category_name: "Sponge Cakes",
          },
          {
            sub_category_id: "2310201151008038128",
            category_id: "2310201148507145625",
            sub_category_name: "Fruit Cakes",
          },
          {
            sub_category_id: "2310201151205755377",
            category_id: "2310201148507145625",
            sub_category_name: "Ice Cream Cakes",
          },
          {
            sub_category_id: "2310201150454427153",
            category_id: "2310201148507145625",
            sub_category_name: "Chocolate Cakes",
          },
          {
            sub_category_id: "2403121130294740086",
            category_id: "2310201148507145625",
            sub_category_name: "Caramel",
          },
        ],
      },
      {
        category_id: "2310201149221893525",
        category_name: "Savoury",
        is_active: true,
        sub_category: "",
        json_sub_category: [
          {
            sub_category_id: "2310201230426341538",
            category_id: "2310201149221893525",
            sub_category_name: "Savoury Bites",
          },
        ],
      },
      {
        category_id: "2405300629551869725",
        category_name: "Event Cakes",
        is_active: true,
        sub_category: "",
        json_sub_category: [
          {
            sub_category_id: "2405300631423943391",
            category_id: "2405300629551869725",
            sub_category_name: "Anniversary Celebration",
          },
        ],
      },
      {
        category_id: "2404231340572772071",
        category_name: "Biscuits",
        is_active: true,
        sub_category: "",
        json_sub_category: [
          {
            sub_category_id: "2406050811536878579",
            category_id: "2404231340572772071",
            sub_category_name: "Chocolate",
          },
        ],
      },
      {
        category_id: "2404231344007111935",
        category_name: "Ready Regulars",
        is_active: true,
        sub_category: "",
        json_sub_category: [
          {
            sub_category_id: "2404231344541267834",
            category_id: "2404231344007111935",
            sub_category_name: "Black Forest Cakes",
          },
        ],
      },
      {
        category_id: "2403181503488745928",
        category_name: "Pastry",
        is_active: true,
        sub_category: "",
        json_sub_category: [
          {
            sub_category_id: "2403181504231036054",
            category_id: "2403181503488745928",
            sub_category_name: "Strawberry Pastry",
          },
          {
            sub_category_id: "2403181547256082468",
            category_id: "2403181503488745928",
            sub_category_name: "Chocolate Pastry",
          },
        ],
      },
    ];
    const data = await responseData;
    if (data) {
      return { data, city };
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const Nav = async () => {
  const apiUrl = process.env.API_URL;
  // const nextCookies = cookies();
  // const cityObj = nextCookies.get("city");
  // const cookiecity = cityObj?.value;
  // const categoryData = await getCategories(apiUrl, cookiecity);
  // const categories = categoryData?.data;
  // const headerList = headers();
  // const pathname = headerList.get("x-current-path");
  // const Cityname = pathname ? pathname.split("/")[1] : "";
  // let isCity = false;
  // const cities = await getCities();
  // if (cities.length > 0) {
  //   if (cities.includes(Cityname)) {
  //     isCity = true;
  //   }
  // }

  // const city = isCity ? Cityname : cookiecity;
  const nextCookies = cookies();
  const cityObj = await nextCookies.get("city");
  const cookiecity = cityObj?.value;
  const categoryData = await getCategories(apiUrl,cookiecity);
  const categories = categoryData?.data;
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const Cityname = pathname ? pathname.split("/")[1] : "";
  let isCity = false;
  const cities = await getCities();
  if (cities.length > 0) {
    if (cities.includes(Cityname)) {
      isCity = true;
    }
  }

  const city = isCity ? cookiecity : Cityname;
  return (
    <div>
      <Container>
        <div className="navbar_body">
          <div className="navbar_logo">
            <Navbar href="/">
              <div className="flip-container">
                <div className="flipper">
                  <div className="front">
                    <img
                      rel="preload"
                      src="https://fama.b-cdn.net/RnB/logo3.webp"
                      className="d-inline-block align-top"
                      alt="React Bootstrap logo"
                    />
                  </div>
                  <div className="back">
                    <img
                      rel="preload"
                      src="https://fama.b-cdn.net/RnB/Logo-Golden.webp"
                      className="d-inline-block align-top"
                      alt="React Bootstrap logo"
                    />
                  </div>
                  <div className="clear"></div>
                </div>
              </div>
            </Navbar>
          </div>
          <nav className="subNavbar_wrapper navbar navbar-expand-lg navbar-light mt-2">
            <div className="container">
              <button
                className="navbar-toggler toggleButton"
                type="button"
                aria-label="button"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className={`Navbar_content navbar-collapse collapse `}>
                <div className="navbar_MobileClose">
                  <span>Close</span>
                  <button
                    className="navbar-toggler toggleButton"
                    type="button"
                    aria-label="closeButton"
                  >
                    <span className="navbar-toggler-icon"></span>{" "}
                  </button>
                </div>
                <div className="Brands_navbody">
                  <div className="subNavbar_body">
                    <div className={`sub_nav`}>
                      <div className={"sub_navbtn"}>
                        <Link href={`/${city}`} prefetch={true}>
                          <h4 className="category-title">Home</h4>
                        </Link>
                      </div>
                    </div>
                    <div className={`sub_nav`}>
                      <div className={"sub_navbtn"}>
                        <Link href={`/${city}/about-us`} prefetch={true}>
                          <h4 className="category-title">About Us</h4>
                        </Link>
                      </div>
                    </div>
                    {categories &&
                      categories.length > 0 &&
                      categories.map((category, index) => (
                        <div className={`sub_nav `} key={index}>
                          <div className="sub_navbtn">
                            <Link
                              href={`/${city}/l/${category.category_name.replaceAll(
                                " ",
                                "-"
                              )}`}
                              // onClick={toggleClass}
                              prefetch={true}
                            >
                              <h4 className="category-title">
                                {category.category_name}{" "}
                              </h4>
                            </Link>
                            <span className="category-dropIcon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="9"
                                height="7"
                                fill="none"
                                viewBox="0 0 9 7"
                              >
                                <path
                                  stroke="#000"
                                  d="M8.177 1.25 4.355 5.663a.1.1 0 0 1-.15 0L.382 1.25"
                                />
                              </svg>
                            </span>
                          </div>
                          <div className="MobileSub_navbtn sub_navbtn">
                            <Link
                              href={`/${city}/l/${category.category_name.replaceAll(
                                " ",
                                "-"
                              )}`}
                              prefetch={true}
                            >
                              {" "}
                              <h4 className="category-title">
                                {category.category_name}{" "}
                              </h4>
                            </Link>
                            <span className="category-dropIcon">
                              <i className="plus_Icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-plus"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                              </i>
                              <i className="mins_Icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-dash"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                </svg>
                              </i>
                            </span>
                          </div>

                          <div className="subnav-content">
                            <ul className="submenu-list">
                              {category.json_sub_category &&
                                category.json_sub_category.length > 0 &&
                                category.json_sub_category.map(
                                  (subcategory, index) => (
                                    <li
                                      key={index}
                                      className="category-sub-title"
                                    >
                                      <Link
                                        href={`/${city}/l/${category.category_name.replaceAll(
                                          " ",
                                          "-"
                                        )}/${
                                          subcategory.sub_category_name
                                            ? subcategory.sub_category_name.replaceAll(
                                                " ",
                                                "-"
                                              )
                                            : ""
                                        }`}
                                        prefetch={true}
                                      >
                                        {subcategory.sub_category_name}
                                      </Link>
                                    </li>
                                  )
                                )}
                            </ul>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <NavComponent />
            </div>
          </nav>
        </div>
      </Container>
    </div>
  );
};

export default Nav;
