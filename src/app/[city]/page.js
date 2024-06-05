import React from "react";
import Banner from "@/components/banner";
import Testimonials from "@/components/testimonial";
import InstaPosts from "@/components/InstaPosts";
import NewLaunches from "@/components/newLaunched";
import MediaCollaborators from "@/components/mediaCollaborators";
import EnquiryModal from "@/components/EnquiryModal";
import CakeOfTheMonth from "@/components/CakeOfTheMonth";
import { axiosGet, axiosPost } from "@/api";
import { redirect } from "next/navigation";
import SetCookies from "@/components/setCookies";
import dynamic from "next/dynamic";
import {getCities} from "@/utils/commoncity"
const ClientScrollEffect = dynamic(
  () => import("@/components/ScrollComponent"),
  { ssr: false }
);
import Head from "next/head";
export async function generateMetadata({ params }) {
  return {
    title: "Home | Ribbons and Balloons",
    description:
      "Buy & Order Cakes Online and Send Cakes anywhere in Mumbai. Ribbons & Balloons is an Online Cakes Shop in Mumbai, we make your Occasions special for your friends, family and you. Order Best Quality cakes online and we deliver it on your doorsteps.",
    openGraph: {
      images: [
        {
          // url: "https://ribbonsandballoons.com/frontassets/images/fav.png",
          height: 1200,
          width: 600,
          alt: "Alt",
        },
      ],
      // icons: {
      //   icon: ["https://ribbonsandballoons.com/frontassets/images/fav.png"],
      //   shortcut: ["https://ribbonsandballoons.com/frontassets/images/fav.png"],
      // },
    },
  };
}

async function fetchMedia(city) {
  try {
    const obj = {
      city_name: city,
    };
    const bannerData = await axiosPost("BannerMaster/GetBannerByCityName", obj);
    if (bannerData) {
      return bannerData;
    }
  } catch (err) {
    console.log(err);
  }
}




const page = async ({ params }) => {
  const city = params.city;
  const cities = await getCities();

  const isValidCity = cities.some(
    (c) => c.city_name.toLowerCase() === city.toLowerCase()
  );
  if (!isValidCity) {
    redirect("/mumbai");
  }

  const media = await fetchMedia(city);
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="https://fama.b-cdn.net/RnB/Stripes.webp"
          as="image"
        />
      </Head>
      <Banner city={city} data={media?.Banner} />
      <ClientScrollEffect />
      <Testimonials />
      <InstaPosts city={city} data={media} />
      <NewLaunches city={city} data={media?.New_Launches} />
      {/* <div className="cakeOfMonthWrap">
        <div className="headerTitle">
          <h2>Cake of the month</h2>
          <div className="testimonialUnderLine">
            <div className="testimonialUnder">
              <div className="ux`nderLine"></div>
              <div className="shapLine"></div>
            </div>
          </div>
        </div>
        <div className="cakeOfMonthBody">
          <div className="wrapper">
           
            <div className="backdrop" style={{ backgroundImage: `url(${AppConfig.cdn}${media?.Cake_Of_The_Month[0].img_url})` }}></div>
            <div className="stage_floor"></div>
            <div className="stage_highlight"></div>
            <div className="spotlight_swivel">
              <div className="lamp"></div>
              <div className="spotlight"></div>
            </div>
          </div>
        </div>
      </div> */}
      <CakeOfTheMonth city={city} data={media?.Cake_Of_The_Month} />
      <MediaCollaborators city={city} data={media?.Media_Collaborator} />
      <div className="enquiryWrapper">
        <EnquiryModal />
      </div>
      <SetCookies city={city} />
    </>
  );
};

export default page;
