import React from "react";
import Link from "next/link";
import AppConfig from "@/AppConfig";
import styles from "@/app/[city]/blogs/page.module.css"
async function getBlog(city) {
  try {
    const response = await fetch(
      `${process.env.API_URL}BlogMaster/GetAllBlogByCity?city=${city}`,
      { next: {revalidate:180} } 
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const blogs = await response.json();
    return blogs;
  } catch (err) {
    console.error(err);
    return [];
  }
}

const Page = async ({ params }) => {
  const { city } = params;
  const data = await getBlog(city);
  return (
    <div className="container">
      <h2>Blogs</h2>
      <div className="row">
        {data && data.length > 0 ? (
          data.map((ele, index) => (
            <div className={`col-lg-4 ${styles.blogCardDiv}`} key={index}>
              <Link
                href={`/${city}/blogs/${ele?.seo_slug.split(" ").join("-")}`}
                className="categoryLink"
                prefetch={true}
              >
                <div className={`card ${styles.blogCard}`}>
                  <img
                    src={AppConfig.cdn+ele.image}
                    className="card-img-top"
                    alt={ele.title}
                  />
                  <div className="card-body">
                    <h5 className={`${styles["card-title"]}`}>{ele.title}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No blogs available for this city.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
