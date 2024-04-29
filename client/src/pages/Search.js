import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { styled } from "styled-components";
import { useSearch } from "../context/Search";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";

const Search = () => {
  const { slug } = useParams();
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
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

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <Layout title={"search results"}>
      <Wrapper>
        <div>
          <h3>Search Results</h3>
          <h6>
            {values?.results.length < 1
              ? "no product to show"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="product-list">
            {values?.results?.map((p) => (
              <div key={p._id} className="product-card">
                <div className="image-container">
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
                      onClick={() => navigate(`/product/${p.slug}`)}
                      className="details-button"
                    >
                      More Details
                    </Link>

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
        </div>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  .product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(19rem, 1fr));
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

      .image-container {
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
  }
`;

export default Search;
