import React from "react";
import './Hero.css'
import hand_icon from "../Assets/hand_icon.png";
import arrow from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>new arrivals only</h2>
        <div className="hero-hand-icon">
          <p>New </p>
          <img src={hand_icon} alt="hand-icon" />
        </div>
          <p>Collections </p> 
          <p>For everyone</p>
        <div className="hero-latest-button">
          <div>latest collections</div>
          <img src={arrow} alt="arrow" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="hero_image" />
      </div>
    </div>
  );
};

export default Hero;
