import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const UserMenu = () => {
  return (
    <Wrapper>
      <div className="dashboard-menu">
        <h4>User Dashboard Panel</h4>
        <NavList>
          <NavLink
            to="/dashboard/user/profile"
            className="list-item"
            activeClassName="active"
            aria-current="true"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-item"
            activeClassName="active"
          >
            Orders
          </NavLink>
          <NavLink
            to="/dashboard/user/wishlist"
            className="list-item"
            activeClassName="active"
          >
            Wishlist
          </NavLink>
        </NavList>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  .dashboard-menu {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.colors.firstLight};
    border-radius: 0.5rem;
    padding: 1rem;
    z-index: 10;
    width: 100%;
    height: fit-content;

    h4 {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 1rem;
      text-align: center;
      color: ${({ theme }) => theme.colors.black};
    }
  }

  .list-item {
    font-size: 1.5rem;
    display: block;
    text-align: center;
    padding: 1rem 0;
    color: ${({ theme }) => theme.colors.black};
    text-decoration: none;
    transition: color 0.3s ease;
    line-height: 1.5;

    &:hover {
      color: ${({ theme }) => theme.colors.first};
    }

    &.active {
      background-color: ${({ theme }) => theme.colors.first};
      color: ${({ theme }) => theme.colors.white};
      border-radius: 0.5rem;
    }
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default UserMenu;
