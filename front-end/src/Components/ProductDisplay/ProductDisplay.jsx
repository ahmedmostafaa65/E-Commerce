import React, { useContext } from "react";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import "./ProductDisplay.css";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const {addToCart} = useContext(ShopContext)
  return (
    <div className="productDisplay">
      <div className="productDisplay-left">
        <div className="productDisplay-img-list">
          <img src={product.image} alt="product-image" />
          <img src={product.image} alt="product-image" />
          <img src={product.image} alt="product-image" />
          <img src={product.image} alt="product-image" />
        </div>
        <img className="product-main-img" src={product.image} alt="main-img" />
      </div>
      <div className="productDisplay-right">
        <h1>{product.name}</h1>
        <div className="productDisplay-right-star">
          <img src={star_icon} alt="star-icon" />
          <img src={star_icon} alt="star-icon" />
          <img src={star_icon} alt="star-icon" />
          <img src={star_icon} alt="star-icon" />
          <img src={star_dull_icon} alt="star-icon" />
          <p>(122)</p>
        </div>
        <div className="productDisplay-right-prices">
          <div className="productDisplay-right-old-price">
            ${product.old_price}
          </div>
          <div className="productDisplay-right-new-price">
            ${product.new_price}
          </div>
        </div>
        <div className="productDisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting and with
          a round neckline and short sleeves, worn as an undershirt or outer
          garment.
        </div>
        <div className="productDisplay-right-size">
          <h3>select size</h3>
          <div className="productDisplay-right-select-size">
            <p>S</p>
            <p>M</p>
            <p>L</p>
            <p>XL</p>
            <p>XXL</p>
          </div>
        </div>
        <button onClick={()=>{addToCart(product.id)}}>add to cart</button>
        <div className="productDisplay-category">
          <p>
            <span>Category:</span> {product.category}, T-shirt, Crop-Top
          </p>
          <p>
            <span>Tags:</span> Modern, Latest
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
