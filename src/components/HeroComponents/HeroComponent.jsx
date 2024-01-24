import React from "react";
import "./HeroComponent.css";

const HeroComponent = () => {
  return (
    <section className="hero-section">
      <div className="container grid grid-two-column">
        <div className="section-hero-data">
          <p className="hero-top-data">THIS IS ME</p>
          <h1 className="hero-heading">All dataset and Your File</h1>
          <p className="hero-para text-info">
          Welcome to "FireFiles", where the seamless integration of React, Redux, and Firebase transforms file management into an intuitive experience. Unleash the power of dynamic organization with our user-friendly interface, enhanced by Redux's responsive functionality. With fortified security measures courtesy of Firebase, your files are protected while offering anytime, anywhere access. Elevate collaboration to new heights as you effortlessly share and collaborate on documents, images, and more in real-time. FireFiles isn't just a file management system; it's a dynamic ecosystem designed to redefine the way you interact with and organize your digital assets. Embrace the future of productivity with FireFiles – where innovation meets efficiency.
          </p>
        </div>
        <div className="section-hero-image">
          <picture>
            <img src="./HeroImg3.jpg" alt="Hero image" className="hero-img" />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
