import React from "react";
import styles from "@/app/[city]/stores/page.module.css";
async function getAllStores(city) {
  try {
    const apiUrl = process.env.API_URL;
    const apiRequestData = {
      city_name: city,
      param: "",
    };
    const storesData = await fetch(apiUrl + "StoreMaster/GetPickupDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestData),
    });
    const data = await storesData.json();
    if (data.length > 0) {
      return data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
  }
}
const page = async ({ params }) => {
  const city = params.city;
  const fetchData = await getAllStores(city);
  console.log("data", fetchData);
  return (
    <>
      <div className="container">
        <div className="row">
          {fetchData && fetchData.length > 0 ? (
            fetchData.map((e) => (
              <div className="col-lg-4 mt-4" key={e.store_id}>
                <div className={`card ${styles.storeCard}`}>
                  <div className="card-body">
                    <div className={`${styles.storeDetails}`}>
                      <p className={styles.storeName}>{e.store_name}</p>
                      <p className={styles.storeName}>{e.store_address}</p>
                      <p className={styles.storeName}>{e.mobile_number}</p>
                    </div>
                    <iframe
                      style={{ width: "100%" }}
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.7826270340724!2d72.87744067472063!3d19.07329255205852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8926326089d%3A0xd2042611c24811ca!2s3VFJ%2B826%2C%20Ambedkar%20Nagar%2C%20Kurla%20West%2C%20Kurla%2C%20Mumbai%2C%20Maharashtra%20400070!5e0!3m2!1sen!2sin!4v1724406336933!5m2!1sen!2sin"
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No data found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
