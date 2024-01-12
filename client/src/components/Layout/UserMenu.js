import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const UserMenu = () => {
  return (
    <Wrapper className="text-center">
      <div className="list-group">
        <h4>Dashboard Pannel</h4>
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item "
          activeclassname="active"
          aria-current="true"
        >
          Profile
        </NavLink>

        <NavLink
          to="/dashboard/user/orders"
          className="list-group-item "
          activeclassname="active"
        >
          Orders
        </NavLink>

        <NavLink
          to="/dashboard/user/wishlist"
          className="list-group-item"
          activeclassname="active"
        >
          Wishlist
        </NavLink>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .list-group {
    width: 100%;
    font-size: 2rem;
    max-width: 300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    text-decoration: none;
    padding: 2rem;

    &:hover {
      color: ${({ theme }) => theme.colors.first};
      transition: color 0.3s ease;
    }

    &.active {
      text-align: center;
      width: 100%;
      background-color: red;
      color: white;
      border-radius: 0.5rem;
      transition: background-color 0.3s ease;
    }
  }
`;
export default UserMenu;
