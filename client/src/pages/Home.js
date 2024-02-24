import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout";
import { styled } from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(1);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  //to get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      console.log("API Response:", data);
      if (data?.success) {
        setCategories(data?.category);
      } else {
        toast.error(data.message); // Display error only when there is an issue
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  // get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      // console.log("data:", data);
      if (data?.success) {
        setProducts(data?.products || []);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting products");
    } finally {
      setLoading(false);
    }
  };

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load More
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filter", {
        checked,
        radio,
      });
      setProducts(data?.products || []);
    } catch (error) {}
  };
  return (
    <Layout title={"All Products - Best Offers"}>
      <Wrapper className="grid grid-two-columns">
        <div className="filter_box">
          <h1 className="heading">Filter by Category</h1>
          <div className="filter_by_category">
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h1 className="heading">Filter by Price</h1>
          <div className="filter_by_price">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id} className="">
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="filter_reset">
            <button
              className="reset_btn"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="all_products">
          {/* {JSON.stringify(checked, null, 4)} */}
          {/* {JSON.stringify(radio, null, 4)} */}
          <h1 className="heading">All Products</h1>
          {/* {loading && <h2 className="loading-text">Loading...</h2>}
          {!loading && products.length === 0 && (
            <h2 className="no-products-text">
              No products found. Create or upload products.
            </h2>
          )} */}
          <div className="product-list">
            {products?.map((p) => (
              // <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
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
                  <p className="p-description">
                    {p.description.substring(0, 25)}...
                  </p>
                  <p className="p-price">₹ {p.price}</p>
                  <p className="p-quantity">{p.quantity}</p>
                  <div className="button-container">
                    <Link
                      to={`/dashboard/admin/product/${p.slug}`}
                      className="details-button"
                    >
                      More Details
                    </Link>
                    <button className="add-to-cart-button">Add to Cart</button>
                  </div>
                </div>
              </div>
              // </Link>
            ))}
          </div>
          <div className="page">
            {products && products.length < total && (
              <button
                className="load-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More..."}
              </button>
            )}
          </div>
          <h1>{total}</h1>
        </div>
      </Wrapper>
    </Layout>
  );
};
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-top: 3rem;

  .filter_box {
    /* border: 3px solid red; */
    background-color: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* padding: 1rem; */
    /* display: flex;
    flex-direction: column;
    align-items: center; */

    .heading {
      font-size: 1.5rem;
    }
    .filter_by_category {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: baseline;
    }
    .filter_by_price {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: baseline;
    }
  }

  .all_products {
    
    /* border: 3px solid red; */
    display: flex;
    flex-direction: column;

    .heading {
      font-size: 1.5rem;
    }

    .loading-text,
    .no-products-text {
      margin-top: 1rem;
      font-size: 1rem;
      color: #555;
    }
  }

  .product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
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

    .button-container {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;

      .details-button,
      .add-to-cart-button {
        padding: 0.5rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #007bff;
          color: white;
        }
      }

      .details-button {
        background-color: #eee;
        color: #333;
      }

      .add-to-cart-button {
        background-color: #28a745;
        color: white;
      }
    }
  }
`;

export default Home;
