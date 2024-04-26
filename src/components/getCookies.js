// @/app/api/getCookie.js

import { parseCookies } from "nookies";

export async function getCookie() {
  try {
    const cookies = parseCookies();
    const cartId = cookies.cartID;
    return { cartId };
  } catch (error) {
    console.error("Error retrieving cookie:", error);
    throw error;
  }
}
