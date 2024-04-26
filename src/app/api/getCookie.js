import { parseCookies } from "nookies";

export default async function handler(req, res) {
    const cookies = parseCookies(req);
    const cartId = cookies.cartID;

    if (cartId) {
        console.log("Found cart ID:", cartId);
        res.status(200).json({ cartId }); // Send cart ID in response
    } else {
        console.log("No cart ID found.");
        res.status(404).json({ message: "No cart ID found" }); // Handle missing cookie
    }
}
