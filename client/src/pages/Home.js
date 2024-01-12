import React, { useState } from "react";
import { useAuth } from "../context/Auth.js";
import Layout from "./../components/Layout";
import { styled } from "styled-components";

const Home = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  return (
    <Layout>
      <Wrapper className="grid grid-two-columns">
        <div className="filter">
          <h1>filters</h1>
        </div>
        <div className="products">
          <h1>all products</h1>
        </div>
      </Wrapper>
    </Layout>
  );
};
const Wrapper = styled.section``;

export default Home;
