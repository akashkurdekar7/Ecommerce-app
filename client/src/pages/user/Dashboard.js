import React from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/Auth";
import { styled } from "styled-components";
import UserMenu from "../../components/Layout/UserMenu";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={`${auth?.user?.name} - Dashboard`}>
      {/* <h1>Admin dashboard</h1> */}
      <Wrapper className="container">
        <div className="pannel grid grid-two-column">
          <div className="pannel-items">
            <UserMenu />
          </div>
          <div className="pannel-content">
            <div className="card">
              <h3>User name: {auth?.user?.name}</h3>
              <h3>User Email: {auth?.user?.email}</h3>
              <h3>User Phone: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};
const Wrapper = styled.div`
  width: 100%;
  margin: 1.5rem 3rem;
  justify-content: center;
  display: flex;
  align-items: center;

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

export default Dashboard;
