import React from "react";
import Layout from "./../components/Layout";
import { styled } from "styled-components";
import { useSearch } from "../context/Search";
import { Link } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"search results"}>
      <Wrapper>
        <div>
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "no product to show"
              : `Found ${values?.results}`}
          </h6>
          <div className="product-list">
            {values?.results?.map((p) => (
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
        </div>
      </Wrapper>
    </Layout>
  );
};
const Wrapper = styled.div`
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
export default Search;
