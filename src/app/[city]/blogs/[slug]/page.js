import React from "react";
import AppConfig from "@/AppConfig";

async function getBlogBySlug(slug) {
  try {
    const blogData = await fetch(
      process.env.API_URL + "BlogMaster/GetBlogBySlug?slug=" + slug
    );
    if (blogData) {
      const data = blogData.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
}
const page = async ({ params }) => {
  const slug = params.slug.replaceAll("-", " ");
  const data = await getBlogBySlug(slug);
  console.log("data", data);
  return (
    <div className="container">
      {data && (
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
              <img src={AppConfig.cdn + data.image} alt="" />

              </div>
              <div className="col-lg-6">
                <h4>details</h4>
                <div>
                  <h4>title</h4>
                  <h6>{data.title}</h6>
                  <span>{data.description}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default page;
