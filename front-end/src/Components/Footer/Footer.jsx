import React from "react";
import './Footer.css'
import instagram_icon from '../Assets/instagram_icon.png'
import pinterest_icon from '../Assets/pintester_icon.png'
import whatsApp_icon from '../Assets/whatsapp_icon.png'
import logo from '../Assets/logo.png'

const Footer = () => {
  return(
    <div className="footer">
        <div className="footer-logo">
            <img src={logo} alt="logo" />
            <h1>shopper</h1>
        </div>
        <ul className="footer-links">
            <li>company</li>
            <li>products</li>
            <li>offices</li>
            <li>about</li>
            <li>contacts</li>
        </ul>
        <div className="footer-social-icons">
            <img src={instagram_icon} alt="instagram-icon" />
            <img src={pinterest_icon} alt="pinterest-icon" />
            <img src={whatsApp_icon} alt="whatsApp-icon" />
        </div>
        <div className="footer-copyright">
            <hr />
            <p>copyright @ 2023 - all right reserved</p>
        </div>
    </div>
  );
};

export default Footer;
