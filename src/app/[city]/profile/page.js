"use client"
import React from "react";
import { useState, useEffect,useContext } from "react";
import { useSession } from "next-auth/react";
import { axiosGet, axiosGetAll, axiosPost } from "@/api";
import { useRouter } from "next/navigation"; // Import useRouter hook
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthOtpContext } from "@/components/authContext";

const page = () => {
  const router = useRouter()
  
  const { isLogged } = useContext(AuthOtpContext);

  const { data } = useSession();
  const [user, setUser] = useState({});
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [email,setEmail] = useState("")
  const [contact,setContact] = useState("")
  const [pinCode,setPinCode] = useState("")
  const [country,setCountry] = useState("")
  const [state,setState] = useState("")
  const [userCity,setUserCity] = useState()
  
  useEffect(() => {
    const fetchUser = async () => {
      const userObject =
        typeof window !== "undefined"
          ? JSON.parse(sessionStorage.getItem("userData"))
          : "";
      if (userObject) {
        setUser(userObject);
        setContact(userObject.mobile_number)
      }
    };
    fetchUser();
    const city = window.location.pathname.split("/")[1];
    if (city) {
      setUserCity(city);
    }
  }, []);

  const saveUserProfile = async()=>{
  var obj =  {
      "user_id": user ? user.user_id : "",
      "first_name": firstName,
      "last_name": lastName,
      "user_email": email,
      "contact_details": contact,
      "city": userCity,
      "state": state,
      "address_1": address1,
      "address_2": address2,
      "pincode": pinCode,
      "country": country,
      "is_active": true,
      "created_on": "2024-04-25T07:03:52.248Z",
      "created_by": "",
      "updated_on": "2024-04-25T07:03:52.248Z",
      "updated_by": ""
    }

    try{
     const data = await axiosPost("UserProfile/SaveUserProfile",obj)
     if(data){
      toast("Your Profile has been updated", {
        autoClose: 3000,
        closeButton: true,
       
      });
     }
    }catch(error){
       console.log(error)
    }
  }
  return (
    <>
      <div className="container ">
        <div className="m-4">
            <div className="row">
              <div className="col-lg-6">
                <label>First Name</label>
                <input type="text" className="form-control" value={firstName}  onChange={(e)=>setFirstName(e.target.value)}/>
              </div>
              <div className="col-lg-6">
                <label>Last Name</label>
                <input type="text" className="form-control" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label>Email</label>
                <input type="Email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div className="col-lg-6">
                <label>Contact</label>
                <input type="text" className="form-control" value={contact} onChange={(e)=>setContact(e.target.value)}  disabled={true}/>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label>City</label>
                <input type="Email" className="form-control" value={userCity} onChange={(e)=>setUserCity(e.target.value)}/>
              </div>
              <div className="col-lg-6">
                <label>State</label>
                <input type="text" className="form-control" value={state} onChange={(e)=>setState(e.target.value)}/>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label>Address 1</label>
                <input type="Email" className="form-control" value={address1} onChange={(e)=>setAddress1(e.target.value)}/>
              </div>
              <div className="col-lg-6">
                <label>Address 2</label>
                <input type="text" className="form-control" value={address2} onChange={(e)=>setAddress2(e.target.value)}/>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label>Pin Code</label>
                <input type="Email" className="form-control" value={pinCode} onChange={(e)=>setPinCode(e.target.value)}/>
              </div>
              <div className="col-lg-6">
                <label>Country</label>
                <input type="text" className="form-control" value={country} onChange={(e)=>setCountry(e.target.value)}/>
              </div>
              <div className="text-center mt-4"><button className="btn btn-primary" onClick={saveUserProfile}>Submit</button></div>
            </div>
        </div>
      </div>
      <ToastContainer />

    </>
  );
};

export default page;
