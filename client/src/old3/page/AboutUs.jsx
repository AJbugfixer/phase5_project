import React from "react";
import "../App.css";
import AllProducts from "../component/AllProducts";

const AboutUs = () => {
  return (
    <>
      <div className="home">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12 mb-3 mx-auto">
              <h1>
                <span>Our Story</span>
              </h1>
              <p>
                This is where you tell the story of your brand. Iconic brands
                such as Disney and Coca-Cola have long realized the power of
                their brand story to build a connection with their audience.
                Companies like Apple possess brand stories that are legendary in
                their status. What's in a story, though? How does the story
                develop authenticity? More to the point, how does such a story
                create that trusting feeling that customers crave? Dev
                e-commerce hub
              </p>
            </div>
            <div className="col-md-6 col-12 mb-3 mx-auto">
              <img
                src="../img/one.svg"
                alt="home "
                className="img-fluid main-img"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="desc">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-12 mx-auto mb-3 ">
              <img
                src="../img/envv.svg"
                alt="ok"
                className="img-fluid side-img"
              />
            </div>
            <div className=" col-md-6 col-12 mx-auto mb-3 d-flex justify-content-center align-items-center flex-column">
              <h1>
                <span>Our Mission</span>
              </h1>
              <p>
                This is where you tell your story as a founder. It's the story
                of you, your mission, and how your brand brings your mission to
                life. Overlook it and you risk having a forgettable brand in a
                sea of products. Craft it carefully, and you can create a
                powerful narrative that touches and inspires people.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
