import React from 'react'
import {Link} from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({product}) => {
  
  return (
    <div className='productCard' >
      <img src={product.images[0]} alt={product.title} />
      <p>{product.title}</p>
      <span>{`₹${product.price}`}</span>
    </div>
  )
}

export default ProductCard
