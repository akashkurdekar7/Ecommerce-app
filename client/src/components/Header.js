import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";
import { GiShoppingBag } from "react-icons/gi";


const Header = () => {
  
  return (
    <MainHeader>
      <NavLink className="logo" to="/">
        <Logo>
          <GiShoppingBag className="icon" />
          <h1 className="heading">Ecommerce app</h1>
        </Logo>
      </NavLink>
      <Nav />
    </MainHeader>
  );
};

const MainHeader = styled.header`
  height: 7rem;
  background-color: ${({ theme }) => theme.colors.container};
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* position: fixed; */
  width: 100%;
  box-shadow: 0 8px 6px -6px grey;
  /* box-shadow: ${({ theme }) => theme.shadow.boxShadow}; */
  z-index: ${({ theme }) => theme.zIndex.zFixed};

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    // flex-direction: column; /* Stack items vertically */
    // justify-content: center; /* Center horizontally */
  }
`;

const Logo = styled.div`
  width: max-content;
  height: 100%;
  display: flex;
  margin-left: 2rem;
  font-size: 1rem;
  align-items: center;
  height: 5rem;

  .icon {
    font-size: 4rem;
  }
  .heading {
    font-size: 2.5rem;
    text-transform: uppercase !important;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    margin: 0; /* Remove top margin */
  }
`;

export default Header;
