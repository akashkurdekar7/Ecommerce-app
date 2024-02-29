import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { Button } from "../styles/Button";

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(`/api/v1/product/get-product/${slug}`);
        setProduct(data?.product);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (slug) {
      getProducts();
    }
  }, [slug]);

  useEffect(() => {
    const getSimilarProducts = async () => {
      try {
        if (product._id && product.category._id) {
          const { data } = await axios.get(
            `/api/v1/product/related-product/${product._id}/${product.category._id}`
          );
          setRelatedProducts(data?.products);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getSimilarProducts();
  }, [product]);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <Layout>
      <Wrapper>
        <div className="container">
          <div className="product_image">
            <div className="image-con">
              <img
                className="product-card-img"
                src={`/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
              />
            </div>
          </div>
          <hr className="divider" />
          <div className="info_product">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Category: {product.category?.name}</p>
            <p>Price: {product.price}Rs</p>
            <div className="quantity-controls">
              <button className="quantity-btn" onClick={decrementQuantity}>
                -
              </button>
              <span className="quantity">{quantity}</span>
              <button className="quantity-btn" onClick={incrementQuantity}>
                +
              </button>
            </div>
            <Button className="add-to-cart-btn">Add to Cart</Button>
          </div>
        </div>
        <hr />
        <div className="similar_products_container">
          <h6>Similar Products</h6>
          {relatedProducts.length < 1 && <p>No Similar Product to Show...</p>}
          {/* {JSON.stringify(relatedProducts, null, 4)} */}
          <div className="similar-products">
            {relatedProducts.map((relatedProd) => (
              <div className="similar-product" key={relatedProd._id}>
                <img
                  className="similar-product-img"
                  src={`/api/v1/product/product-photo/${relatedProd._id}`}
                  alt={relatedProd.name}
                />
                <div className="similar-product-details">
                  <h3>{relatedProd.name}</h3>
                  <p>{relatedProd.description.substring(0, 15)}...</p>
                  <p>Price: {relatedProd.price}</p>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    padding: 20px;
    gap: 2rem;
  }

  .product_image {
    height: max-content;
    flex: 1;
  }

  .image-con {
    .product-card-img {
      width: 100%;
      border-radius: 8px;
      height: 200px;
      object-fit: cover;
    }
  }

  .divider {
    height: 100% !important;
  }

  .info_product {
    flex: 2;
    height: max-content;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  }

  .quantity-btn {
    background-color: #f0f0f0;
    border: none;
    padding: 5px 10px;
    font-size: 2rem;
    cursor: pointer;
  }

  .quantity {
    font-size: 2rem;
  }

  .add-to-cart-btn {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }

  .similar_products_container {
    margin: 20px;
    h6 {
      text-align: center;
      font-size: 24px;
      margin-bottom: 10px;
    }
  }

  .similar-products {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
  }

  .similar-product {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    width: 200px;
  }

  .similar-product-img {
    width: 100%;
    border-radius: 8px;
    height: 200px;
    object-fit: cover;
  }

  .similar-product-details {
    margin-top: 10px;
  }

  .similar-product-details h3 {
    font-size: 1.2rem;
    margin-bottom: 5px;
  }

  .similar-product-details p {
    margin-bottom: 5px;
  }

  .similar-product-details .add-to-cart-btn {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }
`;

export default ProductDetails;
