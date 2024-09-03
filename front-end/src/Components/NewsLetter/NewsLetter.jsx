import React from "react";
import './NewsLetter.css'

const NewsLetter = () => {
  return(
    <div className="news-letter">
        <h1>get exclusive offers on your email</h1>
        <p>subscribe to our new-letter and stay updated</p>
        <div>
            <input type="email" placeholder="Your Email Id" />
            <button>Subscribe</button>
        </div>
    </div>
  );
};

export default NewsLetter;
