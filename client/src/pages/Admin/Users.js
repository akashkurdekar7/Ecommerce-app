import React from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/Auth";
import { styled } from "styled-components";
const Users = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - All Users"}>
      <Wrapper className="container">
        <div className="pannel grid grid-two-column">
          <div className="pannel-items">
            <AdminMenu />
          </div>
          <div className="pannel-content">
            <h4 className="title">Users</h4>
            <h4>Admin name: {auth?.user?.name}</h4>
            <h4>Admin Email: {auth?.user?.email}</h4>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};
const Wrapper = styled.div`

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

    .card {
      width: 100%;
      padding: 3rem;
    }
  }
`;
export default Users;
