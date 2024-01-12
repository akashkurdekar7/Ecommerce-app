import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { styled } from "styled-components";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // get all product
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      // console.log("data:", data);
      if (data?.success) {
        setProducts(data?.product);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Dashboard - Product's"}>
      <Wrapper className="container">
        <div className="pannel grid grid-two-column">
          <div className="pannel-items">
            <AdminMenu />
          </div>
          <div className="pannel-content">
            <h1 className="title">All Products</h1>
            {loading && <h2 className="loading-text">Loading...</h2>}
            {!loading && products.length === 0 && (
              <h2 className="no-products-text">
                No products found. Create or upload products.
              </h2>
            )}
            <div className="product-list">
              {products?.map((p) => (
                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
                  <div className="product-card" style={{ width: "18rem" }}>
                    <div className="image-con">
                      <img
                        className="product-card-img"
                        src={`/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="p-name">{p.name}</h5>
                      <p className="p-description">{p.description}</p>
                      <p className="p-price">{p.price}</p>
                      <p className="p-quantity">{p.quantity}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  /* width: 100%; */
  margin: 1.5rem 3rem;
  justify-content: center;
  display: flex;
  padding: 0;
  align-items: center;
  .title {
    font-size: 5rem;
    text-transform: capitalize;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .pannel {
    width: 100vw;
    display: flex;
    gap: 1rem;

    .pannel-items {
      width: 20%;
    }
  }
  .pannel-content {
    width: 70%;
    flex-grow: 1;
  }

  .product-list {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: space-around;

    .product-card {
      width: 18rem;
      padding: 0.5rem;
      border: 1px solid black;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }
    }
    .image-con {
      border-bottom: 1px solid black;
      .product-card-img {
        width: 100%;
        border-radius: 8px;
        height: 200px;
        object-fit: cover;
      }
    }
    .card-body {
      padding: 0.8rem;

      .p-name {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
      }
      .p-description {
        font-size: 1rem;
        color: #555;
      }
      .p-price {
        font-size: 1.25rem;
        color: #007bff;
        font-weight: bold;
        margin-top: 0.5rem;
      }
      .p-quantity {
        font-size: 1rem;
        color: #555;
        margin-top: 0.5rem;
      }
    }
  }
  .loading-text {
    text-align: center;
    margin-top: 2rem;
  }
  .no-products-text {
    text-align: center;
    margin-top: 2rem;
    color: #555;
  }
`;

export default Products;
