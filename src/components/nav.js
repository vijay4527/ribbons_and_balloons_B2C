import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
const NavComponent = dynamic(() => import("@/components/navComponent"), {
  ssr: false,
  loading: () => <></>,
});
import { cookies } from "next/headers";
import { headers } from "next/headers";

async function getCities() {
  try {
    const responseData = await fetch(
      process.env.API_URL + "RNBCity/GetAllRNBCity",
      { next: { revalidate: 180 } }
    );
    const response = await responseData.json();
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

const getCategories = async (api, city) => {
  try {
    const responseData = await fetch(api + "Category/GetAllCategories", {
      next: { revalidate: 180 },
    });

    const data = await responseData.json();
    if (data) {
      return { data, city };
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const Nav = async () => {
  // const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  // const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

  const apiUrl = process.env.API_URL;
  const nextCookies = cookies();
  const cityObj = await nextCookies.get("city");
  const cookiecity = cityObj?.value;
  const categoryData = await getCategories(apiUrl, cookiecity);
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
    <div className="navbarDiv">
      <Container>
        <div className="navbar_body">
          <div className="navbar_logo">
            <Navbar href="/">
              <div className="flip-container">
                <div className="flipper">
                  <div className="front">
                    <Link href={`/${city}`}>
                      <Image
                        rel="preload"
                        src="https://fama.b-cdn.net/RnB/logo%20rnb.webp"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                        height={78}
                        width={141}
                      />
                    </Link>
                  </div>
                  <div className="back">
                    <Link href={`/${city}`}>
                      <Image
                        rel="preload"
                        src="https://fama.b-cdn.net/RnB/golden_logo.webp"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                        height={88}
                        width={150}
                      />
                    </Link>
                  </div>
                  <div className="clear"></div>
                </div>
              </div>
              <NavComponent />
            </Navbar>
          </div>
          <nav className="subNavbar_wrapper navbar navbar-expand-lg navbar-light mt-2">
            <div className="container">
              <button
                className="navbar-toggler toggleButton"
                type="button"
                aria-label="button"
                // onClick={toggleNavbar}
              >
                <span className="navbar-toggler-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" fill="none" viewBox="0 0 20 18"><path fill="#1C2120" d="M1.389 0h12.778c.767 0 1.389.603 1.389 1.347s-.622 1.347-1.39 1.347H1.39C.622 2.694 0 2.09 0 1.347S.622 0 1.389 0M1.389 7.542H18.61c.767 0 1.389.603 1.389 1.347s-.622 1.347-1.389 1.347H1.39C.622 10.236 0 9.633 0 8.889s.622-1.347 1.389-1.347M1.389 15.084h12.778c.767 0 1.389.603 1.389 1.347s-.622 1.347-1.39 1.347H1.39C.622 17.778 0 17.175 0 16.43s.622-1.347 1.389-1.347"/></svg>
                </span>
              </button>
              <div
                className={`Navbar_content navbar-collapse collapse`}
              >
                {/* className={`Navbar_content navbar-collapse collapse ${
                  isNavbarOpen ? "show" : ""
                }`} */}
                <div className="navbar_MobileClose">
                  <span>Close</span>
                  <button
                    className="navbar-toggler toggleButton"
                    type="button"
                    aria-label="closeButton"
                    // onClick={toggleNavbar}
                  >
                    <span className="navbar-toggler-icon"></span>{" "}
                  </button>
                </div>
                <div className="Brands_navbody">
                  <div className="subNavbar_body">
                    {categories &&
                      categories.length > 0 &&
                      categories.slice(0, 12).map((category, index) =>
                        category.json_sub_category &&
                        category.json_sub_category.length > 0 ? (
                          <div className={`sub_nav`} key={index}>
                            <div className="sub_navbtn">
                              <Link
                                href={`/${city}/l/${category.category_name.replaceAll(
                                  " ",
                                  "-"
                                )}`}
                                prefetch={true}
                              >
                                <h4 className="category-title">
                                  {category.category_name}{" "}
                                </h4>
                              </Link>
                            </div>
                            <div className="MobileSub_navbtn sub_navbtn">
                              <Link
                                href={`/${city}/l/${category.category_name.replaceAll(
                                  " ",
                                  "-"
                                )}`}
                                prefetch={true}
                              >
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
                              <div className="subnav-Body">
                                <ul className="submenu-list">
                                  {category.json_sub_category.map(
                                    (subcategory, subIndex) => (
                                      <li
                                        key={subIndex}
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
                          </div>
                        ) : null
                      )}
                    <div className={`sub_nav`}>
                      <div className={"sub_navbtn"}>
                        <Link href={`/${city}/blogs`} prefetch={true}>
                          <h4 className="category-title">Blogs</h4>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </Container>
    </div>
  );
};

export default Nav;
