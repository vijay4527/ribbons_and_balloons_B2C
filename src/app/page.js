import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Suspense } from 'react'

export default async function Profile() {
  const cityObj = cookies().get("city");
  const city = cityObj?.value
  if (city) {
    redirect(`/${city}`);
  } else {
    redirect("/mumbai");
  }
}
