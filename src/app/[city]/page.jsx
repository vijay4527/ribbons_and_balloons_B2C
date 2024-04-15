import React from "react";
import Banner from "@/components/banner";
import Testimonials from "@/components/testimonial";
import InstaPosts from "@/components/InstaPosts";
import NewLaunches from "@/components/newLaunched";
import MediaCollaborators from "@/components/mediaCollaborators";
const page = () => {
  return (
    <>
      <Banner />
      <Testimonials />
      <InstaPosts />
      <NewLaunches />
      <div className="cakeOfMonthWrap">
        <div className="headerTitle">
          <h2>Cake of the month</h2>
          <div className="testimonialUnderLine">
            <div className="testimonialUnder">
              <div className="underLine"></div>
              <div className="shapLine"></div>
            </div>
          </div>
        </div>
        <div className="cakeOfMonthBody">
          <div className="wrapper">
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
      <MediaCollaborators />
    </>
  );
};

export default page;
