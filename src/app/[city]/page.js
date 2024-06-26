import React from "react";
import Banner from "@/components/banner";
import { redirect } from "next/navigation";
import SetCookies from "@/components/setCookies";
import dynamic from "next/dynamic";
import { Agent } from "https";
const Testimonials = dynamic(() => import("@/components/testimonial"), {
  ssr: true,
  loading: () => <p>loading</p>,
});
const InstaPosts = dynamic(() => import("@/components/InstaPosts"), {
  ssr: true,
  loading: () => <p>loading</p>,
});
const NewLaunches = dynamic(() => import("@/components/newLaunched"), {
  ssr: true,
  loading: () => <p>loading</p>,
});
const MediaCollaborators = dynamic(
  () => import("@/components/mediaCollaborators"),
  {
    ssr: true,
    loading: () => <p>loading</p>,
  }
);
const CakeOfTheMonth = dynamic(() => import("@/components/CakeOfTheMonth"), {
  ssr: true,
  loading: () => <p>loading</p>,
});
import { getCities } from "@/utils/commoncity";
const EnquiryModal = dynamic(() => import("@/components/EnquiryModal"), {
  ssr: false,
});
const ClientScrollEffect = dynamic(
  () => import("@/components/ScrollComponent"),
  { ssr: false }
);




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

async function fetchMedia(apiUrl, city) {
  try {
    if (process.env.NODE_ENV === "development") {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }

    const agent = new Agent({
      rejectUnauthorized: process.env.NODE_ENV !== "development",
    });

    const bannerInfo = await fetch(apiUrl + "BannerMaster/GetBannerByCityName?city_name=" + city, {
      agent,
      next: { revalidate: 180 },
    });

    const bannerData = await bannerInfo.json();
    if (bannerData) {
      return bannerData;
    }
  } catch (err) {
    console.log(err);
  }
}

const page = async ({ params }) => {
  const apiUrl = process.env.API_URL;
  const city = params.city;
  const cities = await getCities();
  const isValidCity = cities.some(
    (c) => c.city_name.toLowerCase() == city.toLowerCase()
  );
  if (!isValidCity) {
    redirect("/mumbai");
  }

  const media = await fetchMedia(apiUrl, city);
  return (
    <>
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
            <video
              muted
              autoPlay
              loop
              className="backdrop"
              style={{ width: "100%" }}
            >
              <source
                src="https://fama.b-cdn.net/PalmExpo/palmExpo.mp4"
                type="video/mp4"
              />
            </video>
            <div className="backdrop"></div>
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
