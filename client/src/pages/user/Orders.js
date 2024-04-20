import React from "react";
import Layout from "../../components/Layout";
import { styled } from "styled-components";
import { useAuth } from "../../context/Auth";
import UserMenu from "./../../components/Layout/UserMenu";

const Orders = () => {
  const { auth } = useAuth();
  return (
    <Layout title={`Dashboard - ${auth?.user?.name} Profile`}>
      <Wrapper className="container">
        <div className="pannel grid grid-two-column">
          <div className="pannel-items">
            <UserMenu />
          </div>
          <div className="pannel-content">
            <h1>Orders</h1>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  margin: 1.5rem 3rem;
  padding: 0;

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

    .card {
      width: 100%;
      padding: 3rem;
    }
  }
`;

export default Orders;
