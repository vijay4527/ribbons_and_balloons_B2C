"use client"
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { axiosGet, axiosGetAll, axiosPost } from "@/api";

const page = () => {
  const { data } = useSession();
  const [user, setUser] = useState({});
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const userInfo =
      typeof window !== "undefined"
        ? sessionStorage.getItem("userData")
        : data
        ? data.user
        : "";
    setUser(userInfo);
  }, []);
  return (
    <>
      <div className="container ">
        <div className="m-4">
          <form>
            <div className="row">
              <div className="col-lg-6">
                <label>First Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-lg-6">
                <label>Last Name</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label>Email</label>
                <input type="Email" className="form-control" />
              </div>
              <div className="col-lg-6">
                <label>Contact</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label>City</label>
                <input type="Email" className="form-control" />
              </div>
              <div className="col-lg-6">
                <label>State</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label>Address 1</label>
                <input type="Email" className="form-control" />
              </div>
              <div className="col-lg-6">
                <label>Address 2</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label>Pin Code</label>
                <input type="Email" className="form-control" />
              </div>
              <div className="col-lg-6">
                <label>Country</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
