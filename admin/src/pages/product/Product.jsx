import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../redux/apiCalls";
import "./product.css";
import { Publish } from "@material-ui/icons";

export default function Product() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const productId = Number(location.pathname.split("/")[2]);

  const [product, setProduct] = useState({
    img: "",
    title: "",
    desc: "",
    price: "",
    inStock: true,
  });

  const currentProduct = useSelector((state) =>
    state.product.products.find((product) => product.id === productId)
  );

  useEffect(() => {
    if (currentProduct) {
      setProduct({
        img: currentProduct.img,
        title: currentProduct.title,
        desc: currentProduct.desc,
        price: currentProduct.price,
        inStock: currentProduct.inStock,
      });
    }
  }, [currentProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(productId, product, dispatch);
    history.push("/products"); // Navigate back to products or show a success message
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{productId}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">
                {product.inStock ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleSubmit}>
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
            />
            <label>Product Description</label>
            <input
              type="text"
              name="desc"
              value={product.desc}
              onChange={handleChange}
            />
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
            <label>In Stock</label>
            <select
              name="inStock"
              id="idStock"
              value={product.inStock}
              onChange={(e) =>
                setProduct({ ...product, inStock: e.target.value === "true" })
              }
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
