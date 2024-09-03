import { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allProudcts, setAllProducts] = useState([]);
  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  const removeProduct = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
    });
    await fetchInfo();
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  return (
    <div className="listProduct">
      <h1>all product list</h1>
      <div className="listProduct-format-main">
        <p>products</p>
        <p>title</p>
        <p>old price</p>
        <p>new price</p>
        <p>category</p>
        <p>remove</p>
      </div>
      <div className="listProduct-allProducts">
        <hr />
        {allProudcts.map((prod, i) => {
          return (
            <>
              <div
                className="listProduct-format-main listProduct-format"
                key={i}
              >
                <img
                  src={prod.image}
                  alt="product-image"
                  className="listProduct-product-icon"
                />
                <p>{prod.name}</p>
                <p>${prod.old_price}</p>
                <p>${prod.new_price}</p>
                <p>{prod.category}</p>
                <img
                  onClick={() => {
                    removeProduct(prod.id);
                  }}
                  src={cross_icon}
                  alt="remove-icon"
                  className="listProduct-remove-icon"
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
