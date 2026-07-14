import React from "react";
import { Link } from "react-router-dom";
import "../styles/productCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-card__image"
      />
      <div className="product-card__content">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <p className="product-card__price">₹{Number(product.price).toFixed(2)}</p>
        <Link to={`/products/${product._id}`} className="product-card__button">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
