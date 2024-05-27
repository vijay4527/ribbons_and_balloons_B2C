import React from "react";
import Banner from "@/components/banner";
import Testimonials from "@/components/testimonial";
import InstaPosts from "@/components/InstaPosts";
import NewLaunches from "@/components/newLaunched";
import MediaCollaborators from "@/components/mediaCollaborators";
import EnquiryModal from "@/components/EnquiryModal";
import { axiosGet, axiosPost } from "@/api";
import { redirect } from "next/navigation";
import SetCookies from "@/components/setCookies";
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

async function getCities() {
  try {
    const cities = await axiosGet("RNBCity/GetAllRNBCity");
    if (cities) {
      return cities;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      data: null,
    };
  }
}

async function fetchMedia(city) {
  try {
    const obj = {
      city: city,
    };
    const bannerData = await axiosPost("media/getAllMedia", obj);
    if (bannerData.resp == true) {
      return;
    }
  } catch (err) {
    console.log(err);
  }
}

const page = async ({ params }) => {
  const media = {
    banner: [
      {
        img_url: "https://fama.b-cdn.net/RnB/bannerImage1.jpg",
        seq_no: "1",
        redirect_url: "",
      },
      {
        img_url: "https://fama.b-cdn.net/RnB/bannerImage2.png",
        seq_no: "2",
        redirect_url: "",
      },
      {
        img_url: "	https://fama.b-cdn.net/RnB/bannerImage3.jpg",
        seq_no: "3",
        redirect_url: "",
      },
      {
        img_url: "https://fama.b-cdn.net/RnB/bannerImage4.jpg",
        seq_no: "4",
        redirect_url: "",
      },
      {
        img_url: "https://fama.b-cdn.net/RnB/bannerImage5.jpg",
        seq_no: "5",
        redirect_url: "",
      },
    ],
    NewLaunches: [
      {
        img_url: "https://fama.b-cdn.net/RnB/Ln1.jpg",
        seq_no: "1",
        redirect_url: "",
      },
      {
        img_url: "https://fama.b-cdn.net/RnB/Ln2.jpg",
        seq_no: "2",
        redirect_url: "",
      },
      {
        img_url: "https://fama.b-cdn.net/RnB/Ln3.jpg",
        seq_no: "3",
        redirect_url: "",
      },
      {
        img_url: "https://fama.b-cdn.net/RnB/Ln4.jpg",
        seq_no: "4",
        redirect_url: "",
      }
    ],
    mediaCollaborators: [
      {
        img_url: "https://fama.b-cdn.net/RnB/media2.png",
        seq_no: "1",
        redirect_url: "",
      },
      {
        img_url: "https://fama.b-cdn.net/RnB/media1.png",
        seq_no: "2",
        redirect_url: "",
      },
      {
        img_url: "https://fama.b-cdn.net/RnB/media3.png",
        seq_no: "3",
        redirect_url: "",
      },
      {
        img_url: "https://fama.b-cdn.net/RnB/media4.pngs",
        seq_no: "4",
        redirect_url: "",
      },
    ],
    cakeOfTheMonth: [
      {
        img_url: "https://fama.b-cdn.net/RnB/combg.png",
        seq_no: "4",
        redirect_url: "",
      },
    ],
  };
  const city = params.city;
  const cities = await getCities();
  if (!Array.isArray(cities)) {
    console.error("Cities data is not an array.");
  }
  const isValidCity = cities.some(
    (c) => c.city_name.toLowerCase() === city.toLowerCase()
  );
  if (!isValidCity) {
    redirect("/mumbai");
  }

  // const media = await fetchMedia(city)
  return (
    <>
      <Banner city={city} data={media?.banner} />
      <Testimonials />
      <InstaPosts city={city} data={media} />
      <NewLaunches city={city} data={media?.NewLaunches} />
      <div className="cakeOfMonthWrap">
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
            {/* <video
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
            </video> */}
            <div className="backdrop"></div>
            <div className="stage_floor"></div>
            <div className="stage_highlight"></div>
            <div className="spotlight_swivel">
              <div className="lamp"></div>
              <div className="spotlight"></div>
            </div>
          </div>
        </div>
      </div>
      <MediaCollaborators city={city} data={media?.mediaCollaborators}/>
      <div className="enquiryWrapper">
        <EnquiryModal />
      </div>
      <SetCookies city={city} />
    </>
  );
};

export default page;
