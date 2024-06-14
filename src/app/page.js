import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Profile() {
  const cityCookie = cookies().get("city");
  const city = cityCookie?.value || "mumbai"; 

  redirect(`/${city}`);
}