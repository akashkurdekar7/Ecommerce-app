import React, { useState } from "react";
import { CgMenu } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const AdminMenu = () => {
  const [open, setOpen] = useState();
  const handleMenu = () => {
    setOpen(!open);
  };
  return (
    <Wrapper>
      <CgMenu className="icon" onClick={handleMenu} />
      <div className={open ? "dashboard-menu bgc active" : "dashboard-menu"}>
        <h4>Admin Pannel</h4>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item"
          activeclassname="active"
        >
          Create Category
        </NavLink>

        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item"
          activeclassname="active"
        >
          Create Product
        </NavLink>

        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item"
          activeclassname="active"
        >
          Products
        </NavLink>

        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item"
          activeclassname="active"
        >
          Users
        </NavLink>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .dashboard-menu {
    width: 100%;
    font-size: 2rem;
    max-width: 300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.4s;
  }
  .icon {
    display: none;
  }

  h4 {
    width: 100%;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.first};
    color: ${({ theme }) => theme.colors.black};
    border-radius: 0.5rem;
    padding: 2rem;
    margin-bottom: 0;
  }

  .list-group-item {
    margin-top: 1rem;
    text-decoration: none;
    text-align: center;
    padding: 2rem;
    color: ${({ theme }) => theme.colors.black};
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.first};
    }

    &.active {
      text-align: center;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.first};
      color: ${({ theme }) => theme.colors.white};
      border-radius: 0.5rem;
      transition: background-color 0.3s ease;
    }
  }

  @media (max-width: 390px) {
    width: 100vw;
    height: 100vh;
    position: absolute;
    
    .icon {
      display: block;
      font-size: 5rem;
    }
    .dashboard-menu {
      transform: translate(-108%);
      visibility: hidden;
    }
    .dashboard-menu.active {
      width: 100%;
      font-size: 2rem;
      max-width: 300px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: 0.4s;
      transform: translate(0%);
      visibility: visible;
    }
    .dashboard-menu.bgc.active {
      background-color: #fff;
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      z-index: 999;
    }
  }
`;

export default AdminMenu;
