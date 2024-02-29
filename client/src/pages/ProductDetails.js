import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <Layout>
      <Wrapper>
        <h1>Product Details</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="container">
            <div className="image-con">
              <img
                className="product-card-img"
                src={`/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
              />
            </div>
          </div>
        )}
      </Wrapper>
    </Layout>
  );
};
const Wrapper = styled.div`
  .image-con {
    /* border-bottom: 1px solid black; */
    .product-card-img {
      width: 100%;
      border-radius: 8px;
      height: 200px;
      object-fit: cover;
    }
  }
`;
export default ProductDetails;
