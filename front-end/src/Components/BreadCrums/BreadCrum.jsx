import React from "react";
import "./BreadCrum.css";
import breadcrum_arrow from "../Assets/breadcrum_arrow.png";

const BreadCrum = (props) => {
  const {product} = props;
  return (
    <div className="BreadCrum">
      Home <img src={breadcrum_arrow} alt="arrow-icon" />
      Shop <img src={breadcrum_arrow} alt="arrow-icon" />
      {product.category} <img src={breadcrum_arrow} alt="arrow-icon" />
      {product.name}
    </div>
  );
};

export default BreadCrum;