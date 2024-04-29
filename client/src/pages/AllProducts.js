import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout";
import { styled } from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Checkbox, Radio, Badge } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/Cart";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(1);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [quantity, setQuantity] = useState(1);

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
          <h1 className="heading">All Products</h1>
          <div className="product-list">
            {products?.map((p) => (
              <div className="product-card">
                <div className="image-con">
                  <img
                    className="product-card-img"
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                </div>
                <div className="card-body">
                  <h5 className="p-name">{p.name.substring(0, 50)}...</h5>
                  <p className="p-description">
                    {p.description.substring(0, 25)}...
                  </p>
                  <p className="p-price">₹ {p.price}</p>
                  <p className="p-quantity">{p.quantity}</p>
                  <div className="button-container">
                    <button
                      onClick={() => navigate(`/product/${p.slug}`)}
                      className="details-button"
                    >
                      More Details
                    </button>
                    <button
                      className="add-to-cart-button"
                      onClick={() => {
                        const newCartItem = { ...p, quantity }; // Create a new object with the specified quantity
                        setCart([...cart, newCartItem]); // Add the newCartItem to the cart
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, newCartItem])
                        );
                        toast.success("Item added successfully");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="page">
            {products && products.length < total && (
              <button
                className="load-btn"
                role="button"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More..."}
              </button>
            )}
          </div>
          {/* <h1>{total}</h1> */}
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
  .heading {
    font-size: 1.5rem;
    margin-bottom: 1.2rem;
  }
  .filter_box {
    background-color: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .filter_by_category {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: baseline;
    margin-bottom: 1rem;
  }
  .filter_by_price {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: baseline;
    margin-bottom: 1rem;
  }

  .all_products {
    display: flex;
    flex-direction: column;
  }
  .heading {
    font-size: 1.5rem;
  }

  .loading-text,
  .no-products-text {
    margin-top: 1rem;
    font-size: 2rem;
    color: #555;
  }

  .product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(19rem, 1fr));
    gap: 2rem;
    justify-content: space-around;
  }
  .product-card {
    width: 20rem;
    height: 40rem;
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
  }
  .load-btn {
    margin-top: 2rem;
    margin-bottom: 2rem;
    background-color: #c2fbd7;
    border-radius: 100px;
    box-shadow: rgba(44, 187, 99, 0.2) 0 -25px 18px -14px inset,
      rgba(44, 187, 99, 0.15) 0 1px 2px, rgba(44, 187, 99, 0.15) 0 2px 4px,
      rgba(44, 187, 99, 0.15) 0 4px 8px, rgba(44, 187, 99, 0.15) 0 8px 16px,
      rgba(44, 187, 99, 0.15) 0 16px 32px;
    color: green;
    cursor: pointer;
    display: inline-block;
    font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto,
      sans-serif;
    padding: 7px 20px;
    text-align: center;
    text-decoration: none;
    transition: all 250ms;
    border: 0;
    font-size: 16px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  .load-btn:hover {
    box-shadow: rgba(44, 187, 99, 0.35) 0 -25px 18px -14px inset,
      rgba(44, 187, 99, 0.25) 0 1px 2px, rgba(44, 187, 99, 0.25) 0 2px 4px,
      rgba(44, 187, 99, 0.25) 0 4px 8px, rgba(44, 187, 99, 0.25) 0 8px 16px,
      rgba(44, 187, 99, 0.25) 0 16px 32px;
    transform: scale(1.05) rotate(-1deg);
  }
  .reset_btn {
    align-items: center;
    background-color: #fff;
    border: 2px solid #000;
    box-sizing: border-box;
    color: #000;
    cursor: pointer;
    display: inline-flex;
    fill: #000;
    font-family: Inter, sans-serif;
    font-size: 16px;
    font-weight: 600;
    height: 48px;
    justify-content: center;
    letter-spacing: -0.8px;
    line-height: 24px;
    min-width: 140px;
    outline: 0;
    padding: 0 17px;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  .reset_btn:focus {
    color: #171e29;
  }

  .reset_btn:hover {
    border-color: ${({ theme }) => theme.colors.first};
    color: ${({ theme }) => theme.colors.black};
  }

  .reset_btn:active {
    border-color: ${({ theme }) => theme.colors.first};
    color: ${({ theme }) => theme.colors.black};
  }

  @media (min-width: 768px) {
    .reset_btn {
      min-width: 170px;
    }
  }
  .details-button,
  .add-to-cart-button {
    /* gap: 1rem; */
    align-items: center;
    background-color: #fff;
    border: 2px solid #000;
    box-sizing: border-box;
    color: #000;
    cursor: pointer;
    display: inline-flex;
    fill: #000;
    font-family: Inter, sans-serif;
    font-size: 15px;
    font-weight: 600;
    height: 48px;
    justify-content: center;
    letter-spacing: -0.8px;
    line-height: 20px;
    /* min-width: 140px; */
    outline: 0;
    padding: 0 12px;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }
  .details-button:focus,
  .add-to-cart-button:focus {
    color: ${({ theme }) => theme.colors.firstLight};
  }
  .details-button:hover,
  .add-to-cart-button:hover {
    border-color: ${({ theme }) => theme.colors.first};
    color: ${({ theme }) => theme.colors.black};
  }
  .details-button:active,
  .add-to-cart-button:active {
    border-color: ${({ theme }) => theme.colors.first};
    color: ${({ theme }) => theme.colors.black};
  }
`;

export default AllProducts;
