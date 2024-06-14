import React from "react";
import Banner from "@/components/banner";
// import Testimonials from "@/components/testimonial";
// import InstaPosts from "@/components/InstaPosts";
// import NewLaunches from "@/components/newLaunched";
// import MediaCollaborators from "@/components/mediaCollaborators";
// import CakeOfTheMonth from "@/components/CakeOfTheMonth";
import { redirect } from "next/navigation";
import SetCookies from "@/components/setCookies";
import dynamic from "next/dynamic";

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
    const obj = {
      city_name: city,
    };
    // const bannerData = await fetch(apiUrl + "BannerMaster/GetBannerByCityName", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(obj),
    // },{ next: { revalidate: 180 }});
    const bannerData = {
      Banner: [
        {
          img_url: "media/20240530131957734.webp",
          seq_no: 1,
          redirect_url: "",
        },
        {
          img_url: "media/20240530132023274.webp",
          seq_no: 2,
          redirect_url: "",
        },
        {
          img_url: "media/20240530132036970.webp",
          seq_no: 3,
          redirect_url: "",
        },
        {
          img_url: "media/20240530132053894.webp",
          seq_no: 4,
          redirect_url: "",
        },
        {
          img_url: "media/20240530132111776.webp",
          seq_no: 5,
          redirect_url: "",
        },
      ],
      Cake_Of_The_Month: [
        {
          img_url: "media/20240531065241337.webp",
          seq_no: 1,
          redirect_url: "",
        },
      ],
      Media_Collaborator: [
        {
          img_url: "media/20240528130236823.png",
          seq_no: 1,
          redirect_url: "",
        },
        {
          img_url: "media/20240528130411451.png",
          seq_no: 4,
          redirect_url: "",
        },
        {
          img_url: "media/20240528130348815.png",
          seq_no: 3,
          redirect_url: "https://www.localsamosa.com",
        },
        {
          img_url: "media/20240528130310225.png",
          seq_no: 2,
          redirect_url: "https://www.livemint.com/",
        },
      ],
      New_Launches: [
        {
          img_url: "media/20240614060710991.webp",
          seq_no: 1,
          redirect_url: "/mumbai/l/Cakes",
        },
        {
          img_url: "media/20240614060738049.webp",
          seq_no: 2,
          redirect_url: "",
        },
        {
          img_url: "media/20240614060753335.webp",
          seq_no: 3,
          redirect_url: "",
        },
        {
          img_url: "media/20240614060806862.webp",
          seq_no: 4,
          redirect_url: "",
        },
      ],
    };

    if (bannerData) {

      return bannerData;

      // return bannerData.json();
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
    (c) => c.city_name.toLowerCase() === city.toLowerCase()
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
