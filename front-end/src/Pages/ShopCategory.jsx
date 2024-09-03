import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import dropdown from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import "./CSS/ShopCategory.css";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="shopCategory">
      <img className="shopCategory-banner" src={props.banner} alt="banner" />
        <div className="shopCategory-indexSort">
          <p>
            <span>Showing 1-12</span> out of 36 products
          </p>
        <div className="shopCategory-sort">
          Sort By <img src={dropdown} alt="dropdown" />
        </div>
        </div>
      <div className="shopCategory-products">
        {all_product.map((item, i) => {
          return (
            props.category === item.category && (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            )
          );
        })}
      </div>
      <div className="shopCategory-loadMore">
        explore more
      </div>
    </div>
  );
};

export default ShopCategory;
