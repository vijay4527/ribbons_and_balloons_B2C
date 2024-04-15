// import { useRouter } from "next/router";
// import { useState,useEffect } from "react";
// import { axiosGet,axiosPost } from "@/api";
// const cartLenght =async (setHitApi)=>{
//     const router = useRouter()
//     const {city} = router.query
//     const [cartLength,setCartLength] = useState(0)
//     const userObject = typeof window !== "undefined" ? sessionStorage.getItem("userData") :""
//     const cartId = typeof window !== "undefined" ? sessionStorage.getItem("cartId") :""
//     if (city && setHitApi) {
//         var obj = {
//           cart_id: cartId ? cartId : "",
//           user_id: userObject ? userObject.user_id : "",
//           city_name: city ? city : "",
//           type:"AC"
//         };
//         const response = await axiosPost("/CartMaster/GetCartDetails", obj);
//         if (response) {
//             setCartLength(reponse.length)
//         }
        
//       }
//       return cartLength;
// }