import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export default async function Profile() {
  const cityObj = await cookies().get("city");
  const city = cityObj?.value
  if (city) {
    redirect(`/${city}`);
  } else {
    redirect("/mumbai");
  }
}
