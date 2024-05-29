import React from 'react'
import AppConfig from "@/AppConfig";
import Link from 'next/link';
const CakeOfTheMonth = ({city,data}) => {
    console.log("data of cake",data)
    console.log("city",city)

  return (
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
    <Link href={`/${data[0]?.redirect_url}`}>
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
     
        <div className="backdrop" style={{ backgroundImage: `url(${AppConfig.cdn}${data[0].img_url})` }}></div>

     
        <div className="stage_floor"></div>
        <div className="stage_highlight"></div>
        <div className="spotlight_swivel">
          <div className="lamp"></div>
          <div className="spotlight"></div>
        </div>
      </div>
    </div>
    </Link>
  </div>
  )
}

export default CakeOfTheMonth