import React, { useState } from "react";
import { useAuth } from "../context/Auth.js";
import Layout from "./../components/Layout";
import { styled } from "styled-components";

const Home = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  return (
    <Layout title={"All Products - Best Offers"}>
      <Wrapper className="grid grid-two-columns">
        <div className="filter">
          <h1 className="heading">Filter by Category</h1>
        </div>
        <div className="products">
          <h1 className="heading">All Products</h1>
        </div>
      </Wrapper>
    </Layout>
  );
};
const Wrapper = styled.div`
  display: flex;
  margin-top: 3rem;
  flex-direction: row;
  .filter {
    display: flex;
    flex-direction: column;
  }
`;

export default Home;
