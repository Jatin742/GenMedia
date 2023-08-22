import React, { Fragment, useEffect, useState } from 'react'
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from '../ProductCard/ProductCard.js';
import Slider from '@material-ui/core/Slider'
import { getProduct } from '../../Actions/productAction';
import Typography from "@material-ui/core/Typography";

const Products = () => {
  const dispatch = useDispatch();


  const [price, setPrice] = useState([0, 2500]);
  const priceHandler = (event, newPrice) => {

    setPrice(newPrice);
  }
  const { products , loading } = useSelector(state => state.products);

  const categories = ["smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting"];

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const sortFields= ["name","price"];
  const filteredProducts = products.filter(product => {
    const productPrice = parseFloat(product.price);
    return productPrice >= price[0] && productPrice <= price[1];
  });
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "name") {
      return a.title.localeCompare(b.title);
    } else if (sort === "price") {
      return parseFloat(a.price) - parseFloat(b.price);
    }
    return 0;
  });
  useEffect(() => {

    dispatch(getProduct(category))

  }, [dispatch, category])

  return (
    // { 
        <Fragment>
          <div className="product-page">
            <div className="product-box">

              <h2 className="productsHeading">Products</h2>
              <div className="products">
                {sortedProducts &&
                  sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </div>

            <div className="filterBox">
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="continuous-slider"
                min={0}
                max={2500}
              />
              <Typography>Categories</Typography>
              <ul className='categoryBox'>
                {
                  categories.map((category) => (
                    <li
                      className='category-link'
                      key={category}
                      onClick={() => setCategory(category)}
                    >{category}</li>
                  ))
                }
                </ul>
              <Typography>Sort By</Typography>
              <ul className='sortBox'>
                {
                  sortFields.map((sort) => (
                    <li
                      className='sort-link'
                      key={sort}
                      onClick={() => setSort(sort)}
                    >{sort}</li>
                  ))
                }
              </ul>


            </div>

          </div>
        </Fragment>
      // }
  )
}

export default Products
