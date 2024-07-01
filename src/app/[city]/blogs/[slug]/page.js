import React from "react";
import AppConfig from "@/AppConfig";

async function getBlogBySlug(slug) {
  try {
    const response = await fetch(
      process.env.API_URL + "BlogMaster/GetBlogBySlug?slug=" + slug
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data) {
      return data;
    } else {
      throw new Error('No data found');
    }
  } catch (err) {
    console.log(err);
    return null; 
  }
}

const page = async ({ params }) => {
  const slug = params.slug.replaceAll("-", " ");
  const data = await getBlogBySlug(slug);
  return (
    <div className="container">
      {data ? (
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <img src={AppConfig.cdn + data.image} alt="" />
              </div>
              <div className="col-lg-6">
                <h4>Details</h4>
                <div>
                  <h4>Title</h4>
                  <h6>{data.title}</h6>
                  <span>{data.description}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-danger" role="alert">
          Blog not found
        </div>
      )}
    </div>
  );
};

export default page;